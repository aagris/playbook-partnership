FROM node:latest as base
RUN echo "Installing git..." && apt-get -y update && apt-get -y install git && rm -rf /var/lib/apt/lists/*
WORKDIR /app

FROM base as prepare_src
COPY . /app

FROM prepare_src as prepare_package_json
RUN find /app -type d -name "node_modules" -exec rm -rf {} + \
  && find /app -type f -a \! \( -name "package.json" -o -name "package-lock.json" \) -delete \
  && find /app -type d -empty -delete

FROM prepare_src as prepare_requirements_txt
RUN find /app -type d -name "node_modules" -exec rm -rf {} + \
  && find /app -type f -a \! \( -name "requirements.txt" -o -name "enumerate-requirements.ts" \) -delete \
  && find /app -type d -empty -delete

FROM base as prepare_npm_i
COPY --from=prepare_package_json /app /app
RUN echo "Installing NodeJS dependencies..." && npm i

FROM prepare_npm_i as prepare_requirements_txt_complete
COPY --from=prepare_requirements_txt /app /app
RUN npm run codegen:requirements \
  && mv /app/requirements.txt /tmp/requirements.txt \
  && rm -r /app \
  && mkdir /app \
  && mv /tmp/requirements.txt /app

FROM prepare_src as prepare_build
COPY --from=prepare_npm_i /app /app
RUN echo "Building app..." && LANDING_PAGE=/graph/extend npm run build

FROM base as prepare_system
RUN echo "Installing system deps..." && apt-get -y update && apt-get -y install r-base python3-dev python3-pip python3-venv && rm -rf /var/lib/apt/lists/*
ENV PYTHON_BIN="python3"

FROM prepare_system as prepare_r
COPY cli/setup.R /app/setup.R
RUN echo "Running setup.R..." && R -e "source('/app/setup.R')" && rm /app/setup.R

FROM prepare_system as prepare_python
COPY --from=prepare_requirements_txt_complete /app /app
RUN echo "Installing python dependencies..." && python3 -m pip install --break-system-packages -r /app/requirements.txt && rm /app/requirements.txt

# TARGET: dev -- development environment with dependencies to run dev tools
FROM prepare_system as dev
RUN echo "Installing dev deps..." && apt-get -y update && apt-get -y install librsvg2-bin imagemagick potrace && rm -rf /var/lib/apt/lists/*
COPY --from=amacneil/dbmate /usr/local/bin/dbmate /usr/local/bin/dbmate
ENV npm_config_cache=/app/.npm
COPY --from=prepare_r /usr/local/lib/ /usr/local/lib/
COPY --from=prepare_python /usr/local/lib/ /usr/local/lib/
CMD ["/bin/bash"]

# TARGET: app_minimal -- production server with dependencies to run just the webserver
FROM base as app_minimal
COPY --from=prepare_build /app /app
EXPOSE 3000
CMD ["npm", "run", "start"]

# TARGET: app -- production server with dependencies to run everything
FROM prepare_system as app
COPY --from=prepare_r /usr/local/lib/ /usr/local/lib/
COPY --from=prepare_python /usr/local/lib/ /usr/local/lib/
COPY --from=prepare_build /app /app
EXPOSE 3000
CMD ["npm", "run", "start"]
