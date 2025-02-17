import {
  GeneCountMatrix,
  DrugTerm,
  GeneSet,
  GeneTerm,
  PhenotypeTerm,
  ScoredTissues,
  Supervenn,
  ScoredDrugs,
  ScoredGenes,
  MetgeneMetaboliteTable,
  VariantSet,
  LINCSL1000ReverseSearchDashboard,
  MetGeneSummary,
  GlyGenResponseNode,
  MetGeneRxnTable,
  GeneSignature,
  VariantTerm,
  PlotlyPlot,
  RegulatoryElementSet,
  MetGeneStudyTable,
} from '@/components'

const playbooks = [
  {
    id: '05ad5e67-e048-d46f-be6e-058dc6d40c77',
    label: 'Use Case 1: Explain Drug-Drug Interactions',
    description: `Give two drugs and an adverse event that is known to be caused by the drug-drug interactions, I would like to know if there are overlapping genes between genes that are either up or down regulated by the drugs from LINCS and genes associated with the adverse event either based on GWAS, gene mentions in the literature, and genes associated with mouse and human phenotypes. I would like to also know if the overlap between these genes is statistically significant. I would also like to have the results visualized as a Venn diagram.`,
    gpt_summary: `To start the workflow, the search term "Inflammation" is selected. This is followed by selecting the search term "Penicillin" and then "Cortisol".

From the Enrichr database, gene sets with set labels containing "Inflammation" are queried. The identified matching terms from the GWAS Catalog 2019 library are assembled into a collection of gene sets. A GMT (gene matrix transposed) is extracted from the Enrichr results for GWAS_Catalog_2019. Then, all the identified gene sets are combined using the union set operation.

Similarly, gene sets with set labels containing "Penicillin" are queried from Enrichr. The identified matching terms from the LINCS L1000 Chem Pert Consensus Sigs library are assembled into a collection of gene sets. A GMT is extracted from the Enrichr results for LINCS_L1000_Chem_Pert_Consensus_Sigs.

Next, gene sets with set labels containing "Cortisol" are queried from Enrichr. The identified matching terms from the LINCS L1000 Chem Pert Consensus Sigs library are assembled into a collection of gene sets. A GMT is extracted from the Enrichr results for LINCS_L1000_Chem_Pert_Consensus_Sigs.

All the identified gene sets from the three search terms are combined into one gene set library. This collection of gene sets is then visualized with a Supervenn diagram.

Here are the references for the sources used:
1. Xie, Z. et al. Gene Set Knowledge Discovery with Enrichr. Current Protocols vol. 1 (2021). doi:10.1002/cpz1.90
2. Sollis, E. et al. The NHGRI-EBI GWAS Catalog: knowledgebase and deposition resource. Nucleic Acids Research vol. 51 D977–D985 (2022). doi:10.1093/nar/gkac1010
3. Blake, J. A. et al. Mouse Genome Database (MGD): Knowledgebase for mouse–human comparative biology. Nucleic Acids Research vol. 49 D981–D987 (2020). doi:10.1093/nar/gkaa1083
4. Köhler, S. et al. The Human Phenotype Ontology in 2021. Nucleic Acids Research vol. 49 D1207–D1217 (2020). doi:10.1093/nar/gkaa1043
5. Evangelista, J. E. et al. SigCom LINCS: data and metadata search engine for a million gene expression signatures. Nucleic Acids Research vol. 50 W697–W709 (2022). doi:10.1093/nar/gkac328`,
    published: 'July 26, 2023',
    version: '1.0.0',
    authors: ['CFDE Playbook Partnership'],
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
    license: 'CC-BY-NC-SA-4.0',
    dataSources: [
      'KOMP',
      'HPO',
      'GWAS Catalog',
      'Geneshot',
      'LINCS',
    ],
    inputs: [
      PhenotypeTerm,
      DrugTerm,
      DrugTerm,
    ],
    outputs: [
      Supervenn,
    ],
  },
  {
    id: 'fec7706b-eacc-aea6-e024-e0e5656d9921',
    label: 'Use Case 2: Explain MOAs of Side Effects for Approved Drugs',
    description: `For a side effect and a drug, I would like to know if there are genes from the LINCS L1000 experiments that are up or down-regulated by the drugs that are also known to be involved with the side effect based on literature co-mentions or GWAS. I would like to know if such overlap is statistically significant. I would also like the results to be visualized using a SuperVenn diagram.`,
    gpt_summary: `To start the workflow, the search term \"atrial fibrillation\" was selected. The matching terms from the MGI Mammalian Phenotype Level 4 2019 library and GWAS Catalog 2019 library were identified and assembled into gene sets. A consensus gene set was created by only keeping genes that appeared in at least two sets.

Similarly, for the search term \"Ibrutinib,\" the matching terms from the LINCS L1000 Chem Pert Consensus Sigs library were identified and assembled into gene sets. All the identified gene sets were combined into one gene set library.

Finally, a Supervenn diagram was used to visualize the collection of gene sets. The sources for the libraries used in this workflow are: 
1. Mouse Genome Database (MGD)
2. NHGRI-EBI GWAS Catalog
3. SigCom LINCS.`,
    published: 'Mar 16, 2023',
    version: '1.0.0',
    authors: ['CFDE Playbook Partnership'],
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
    license: 'CC-BY-NC-SA-4.0',
    dataSources: [
      'GWAS Catalog',
      'KOMP',
      'LINCS',
    ],
    inputs: [
      PhenotypeTerm,
      DrugTerm,
    ],
    outputs: [
      GeneSet,
      Supervenn,
    ],
  },
  {
    id: '4153d6c3-0d1f-ba10-eeb6-c7792318c042',
    label: 'Use Case 3: Compounds to Reverse Disease Signatures',
    description: `Using differential expression signatures from two independent sources, identify and rank Consensus L1000 Small Molecules capable of reversing the expression signatures. We consider a case study involving Aging signatures between GTEx and GEO, drugs proposed should be considered as potential treatments for aging.`,
    gpt_summary: `The following steps were taken:

1. The GEO Aging Signatures file was uploaded and loaded as a gene signature.
2. The GTEx Aging Signatures file was uploaded and loaded as a gene signature.
3. Significant genes were extracted from the GEO Aging Signatures.
4. Significant genes were extracted from the GTEx Aging Signatures.
5. Reversers and mimickers were identified from over 1 million signatures using SigCom LINCS [1].
6. Resolved drugs were obtained from the LINCS L1000 Chemical Perturbagens library.
7. Reversers and mimickers were identified from over 1 million signatures using SigCom LINCS [1].
8. Mean scores were computed.
9. The drugs were filtered by FDA Approved Drugs using the PubChem APIs [2].

References:
1. Evangelista, J. E. et al. SigCom LINCS: data and metadata search engine for a million gene expression signatures. Nucleic Acids Research vol. 50 W697–W709 (2022). doi:10.1093/nar/gkac328
2. Kim, S. et al. PubChem 2023 update. Nucleic Acids Research vol. 51 D1373–D1380 (2022). doi:10.1093/nar/gkac956`,
    published: 'July 26, 2023',
    version: '1.0.0',
    authors: ['CFDE Playbook Partnership'],
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
    license: 'CC-BY-NC-SA-4.0',
    dataSources: [
      'GTEx',
      'GEO',
      'LINCS',
    ],
    inputs: [
      GeneSignature,
      GeneSignature,
    ],
    outputs: [
      ScoredDrugs,
    ],
  },
  {
    id: '9cb775b8-bbee-3062-e2db-8b04125ef3d3',
    label: 'Use Case 4: Identify the Tissue Activity for a TF based on its Targets',
    description: `Given a Transcription Factor, we collect its targets by various resources and then Enrich the set of consensus targets against GTEx Tissue expression. The result is ranked tissues potentially regulated by the transcription factor.`,
    gpt_summary: 'To start the workflow, KLF4 is selected as the search term. Matching terms from three libraries are identified: ENCODE TF ChIP-seq 2015, ChEA 2022, and ARCHS4 TF Co-Expression. The matching terms are assembled into gene sets, which are then combined into one library. A consensus gene set is created by retaining genes that appear in at least two sets. The gene set is enriched against the GTEx Tissues V8 2023 library to identify statistically significant GTEx Tissue Signatures. The libraries used in this workflow are: \n1. An integrated encyclopedia of DNA elements in the human genome. Nature vol. 489 57–74 (2012). doi:10.1038/nature11247 \n2. Keenan, A. B. et al. ChEA3: transcription factor enrichment analysis by orthogonal omics integration. Nucleic Acids Research vol. 47 W212–W224 (2019). doi:10.1093/nar/gkz446 \n3. Lachmann, A. et al. Massive mining of publicly available RNA-seq data from human and mouse. Nature Communications vol. 9 (2018). doi:10.1038/s41467-018-03751-6 \n4. Lonsdale, J. et al. The Genotype-Tissue Expression (GTEx) project. Nature Genetics vol. 45 580–585 (2013). doi:10.1038/ng.2653',
    published: 'Mar 16, 2023',
    version: '1.0.0',
    authors: ['CFDE Playbook Partnership'],
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
    license: 'CC-BY-NC-SA-4.0',
    dataSources: [
      'ENCODE',
      'ChEA',
      'ARCHS4',
      'GTEx',
    ],
    inputs: [
      GeneTerm,
    ],
    outputs: [
      ScoredTissues,
    ],
  },
  {
    id: '77805f8b-978f-2ab0-3268-d40c8a06e692',
    label: 'Use Case 5: Small Molecules to Induce a Biological Process',
    description: `We identify genes associated with a biological process from human, mouse phenotypes, KEGG pathways and GO gene set libraries. We then find Consensus LINCS compounds which upregulate these genes resulting in a ranked listing of drug candidates for inducing the biological process.`,
    gpt_summary: `To start the workflow, the search term "Autophagy" was selected. Gene sets with labels containing Autophagy were obtained from Enrichr [1]. These matching terms from the MGI Mammalian Phenotype Level 4 2019 library [2] were then collected to create a collection of gene sets. A GMT file was extracted from the Enrichr results for MGI_Mammalian_Phenotype_Level_4_2019. All the identified gene sets were combined using the union set operation.

Next, reversers and mimickers from over 1 million signatures were identified using SigCom LINCS [3]. The resolved drugs from the LINCS L1000 Chemical Perturbagens library were also included. Matching terms from the KEGG 2021 Human library [4] were gathered to create another collection of gene sets. A GMT file was extracted from the Enrichr results for KEGG_2021_Human. Once again, the identified gene sets were combined using the union set operation.

Reversers and mimickers from over 1 million signatures were identified using SigCom LINCS [3]. Additionally, matching terms from the GO Biological Process 2021 library [5] were collected to create a collection of gene sets. A GMT file was extracted from the Enrichr results for GO_Biological_Process_2021. All the identified gene sets were combined using the union set operation.

Once again, reversers and mimickers from over 1 million signatures were identified using SigCom LINCS [3]. The resolved drugs from the LINCS L1000 Chemical Perturbagens library were included. Mean scores were computed. The drugs were filtered by FDA Approved Drugs with the help of PubChem APIs [6].

References:
1. Xie, Z. et al. Gene Set Knowledge Discovery with Enrichr. Current Protocols vol. 1 (2021). doi:10.1002/cpz1.90
2. Blake, J. A. et al. Mouse Genome Database (MGD): Knowledgebase for mouse–human comparative biology. Nucleic Acids Research vol. 49 D981–D987 (2020). doi:10.1093/nar/gkaa1083
3. Evangelista, J. E. et al. SigCom LINCS: data and metadata search engine for a million gene expression signatures. Nucleic Acids Research vol. 50 W697–W709 (2022). doi:10.1093/nar/gkac328
4. Kanehisa, M., Furumichi, M., Sato, Y., Kawashima, M. & Ishiguro-Watanabe, M. KEGG for taxonomy-based analysis of pathways and genomes. Nucleic Acids Research vol. 51 D587–D592 (2022). doi:10.1093/nar/gkac963
5. Ashburner, M. et al. Gene Ontology: tool for the unification of biology. Nature Genetics vol. 25 25–29 (2000). doi:10.1038/75556
6. Kim, S. et al. PubChem 2023 update. Nucleic Acids Research vol. 51 D1373–D1380 (2022). doi:10.1093/nar/gkac956`,
    published: 'July 26, 2023',
    version: '1.0.0',
    authors: ['CFDE Playbook Partnership'],
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
    license: 'CC-BY-NC-SA-4.0',
    dataSources: [
      'HPO',
      'KOMP',
      'KEGG',
      'WikiPathways',
      'GO',
      'LINCS',
    ],
    inputs: [
      PhenotypeTerm,
    ],
    outputs: [
      ScoredDrugs,
    ],
  },
  {
    id: '78db3b40-bf62-4415-ac37-032e8c089859',
    label: 'Use Case 6: CFDE Knowledge about a Variant',
    description: `We query several CFDE data sources for information about the variant provided and about the closest gene to that variant.`,
    gpt_summary: `To begin the workflow, the search term chr10:g.3823823G>A is selected. The closest gene to the variant is determined using MyVariant.info [1]. Next, RNA-seq-like LINCS L1000 Signatures [2] are used to visualize the expression of KLF6, either mimicking or reversing it. The median expression of KLF6 is obtained from the GTEx Portal [3] using the portal's API. Finally, a bar plot is created to visualize the level of expression across scored tissues.

References:
1. Lelong, S. et al. BioThings SDK: a toolkit for building high-performance data APIs in biomedical research. Bioinformatics vol. 38 2077–2079 (2022). doi:10.1093/bioinformatics/btac017
2. Evangelista, J. E. et al. SigCom LINCS: data and metadata search engine for a million gene expression signatures. Nucleic Acids Research vol. 50 W697–W709 (2022). doi:10.1093/nar/gkac328
3. Lonsdale, J. et al. The Genotype-Tissue Expression (GTEx) project. Nature Genetics vol. 45 580–585 (2013). doi:10.1038/ng.2653`,
    published: 'July 26, 2023',
    version: '1.0.0',
    authors: ['CFDE Playbook Partnership'],
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
    license: 'CC-BY-NC-SA-4.0',
    dataSources: [
      'BioThings',
      'LINCS',
      'GTEx',
    ],
    inputs: [
      VariantTerm,
    ],
    outputs: [
      LINCSL1000ReverseSearchDashboard,
      PlotlyPlot,
    ],
  },
  {
    id: '60086ff7-2a49-195a-9682-146e763e32cc',
    label: 'Use Case 6: CFDE Knowledge about a Gene',
    description: `We query several CFDE data sources for information about the gene provided.`,
    gpt_summary: `To start the workflow, the search term selected is KLF6. Next, we visualize RNA-seq-like LINCS L1000 Signatures [1] that either mimic or reverse the expression of KLF6. To obtain the median expression of KLF6, we utilize the GTEx Portal [2] and its API. To better understand the expression levels across different tissues, a bar plot is created.

1. Evangelista, J. E. et al. SigCom LINCS: data and metadata search engine for a million gene expression signatures. Nucleic Acids Research vol. 50 W697–W709 (2022). doi:10.1093/nar/gkac328
2. Lonsdale, J. et al. The Genotype-Tissue Expression (GTEx) project. Nature Genetics vol. 45 580–585 (2013). doi:10.1038/ng.2653`,
    published: 'July 26, 2023',
    version: '1.0.0',
    authors: ['CFDE Playbook Partnership'],
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
    license: 'CC-BY-NC-SA-4.0',
    dataSources: [
      'BioThings',
      'LINCS',
      'GTEx',
    ],
    inputs: [
      GeneTerm,
    ],
    outputs: [
      LINCSL1000ReverseSearchDashboard,
      PlotlyPlot,
    ],
  },
  {
    id: '7103143b-f178-7aa7-7753-9d4652ddc931',
    label: 'Use Case 7: Variant Expression in Tumor/Healthy',
    description: `We construct a joint plot showing how the variant's closest gene is expressed in tumors from KidsFirst and healthy human tissue from GTEx.`,
    gpt_summary: `The workflow begins by selecting the search term chr2:g.39417578C>G. The closest gene to the variant was found using MyVariant.info [1]. CDKL4 gene expression in tumors was queried from the Open Pediatric Cancer Atlas API [2]. The median expression of CDKL4 was obtained from the GTEx Portal [3] using the portal's API. To visualize the level of expression across tumor gene expression, a bar plot was created.

References:
1. Lelong, S. et al. BioThings SDK: A toolkit for building high-performance data APIs in biomedical research. Bioinformatics, vol. 38, 2077-2079 (2022). doi:10.1093/bioinformatics/btac017
2. Shapiro, J. A. et al. OpenPBTA: The Open Pediatric Brain Tumor Atlas. Cell Genomics 100340 (2023). doi:10.1016/j.xgen.2023.100340
3. Lonsdale, J. et al. The Genotype-Tissue Expression (GTEx) project. Nature Genetics, vol. 45, 580-585 (2013). doi:10.1038/ng.2653`,
    published: 'July 26, 2023',
    version: '1.0.0',
    authors: ['CFDE Playbook Partnership'],
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
    license: 'CC-BY-NC-SA-4.0',
    dataSources: [
      'BioThings',
      'KidsFirst',
      'GTEx',
    ],
    inputs: [
      VariantTerm,
    ],
    outputs: [
      PlotlyPlot,
    ],
  },
//   {
//     id: '703a150e-ee10-2a26-418a-89a69e1a82e7',
//     label: 'Use Case 8: Associations between 2 Variants',
//     description: `Given two variants, we find their closest genes and present combined knowledge about them including their expression in tumors & healthy tissue, interactions between the two proteins, and gene sets containing the two genes.`,
//     gpt_summary: `The workflow begins by selecting chr10:g.3823823G>A as the search term. Following that, chr2:g.39417578C>G is chosen as the search term. The closest gene to each variant is determined using MyVariant.info [1]. The specified genes are then combined into a gene set. This gene set is submitted to Enrichr [2]. Gene expression data for CDKL4 in tumors is obtained from the Open Pediatric Cancer Atlas API [3]. Median expression of CDKL4 is also obtained from the GTEx Portal [4] using the portal's API. A bar plot is created to visualize the level of expression across tumor gene expression for CDKL4. Similarly, median expression of KLF6 is obtained from the GTEx Portal [4] using the portal's API. Gene expression data for KLF6 in tumors is queried from the Open Pediatric Cancer Atlas API [3]. Another bar plot is created to visualize the level of expression across tumor gene expression for KLF6.

// References:
// 1. Lelong, S. et al. BioThings SDK: a toolkit for building high-performance data APIs in biomedical research. Bioinformatics vol. 38 2077–2079 (2022). doi:10.1093/bioinformatics/btac017
// 2. Xie, Z. et al. Gene Set Knowledge Discovery with Enrichr. Current Protocols vol. 1 (2021). doi:10.1002/cpz1.90
// 3. Shapiro, J. A. et al. OpenPBTA: The Open Pediatric Brain Tumor Atlas. Cell Genomics 100340 (2023) doi:10.1016/j.xgen.2023.100340. doi:10.1016/j.xgen.2023.100340
// 4. Lonsdale, J. et al. The Genotype-Tissue Expression (GTEx) project. Nature Genetics vol. 45 580–585 (2013). doi:10.1038/ng.2653`,
//     published: 'July 26, 2023',
//     version: '1.0.0',
//     authors: ['CFDE Playbook Partnership'],
//     licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
//     license: 'CC-BY-NC-SA-4.0',
//     dataSources: [
//       'KidsFirst',
//       'GTEx',
//       'Enrichr',
//       'BioThings',
//     ],
//     inputs: [
//       VariantTerm,
//     ],
//     outputs: [
//       PlotlyPlot,
//     ],
//   },
//   {
//     id: 'ec5a2d97-fca2-df40-578a-9c84129963bf',
//     label: 'Use Case 8: Associations between 2 Genes',
//     description: `We present combined knowledge about the two given genes including their expression in tumors & healthy tissue, interactions between the two proteins, and gene sets containing the two genes.`,
//     gpt_summary: `The workflow begins by selecting ACE2 and STAT3 as the search terms. The specified genes are then combined into a gene set. This gene set is submitted to Enrichr [1]. The median expression of ACE2 is obtained from the GTEx Portal [2] using the portal's API. The gene expression of ACE2 in tumors is queried from the Open Pediatric Cancer Atlas API [3]. A bar plot is created to visualize the level of expression across tumor gene expression for ACE2. Similarly, the median expression of STAT3 is obtained from the GTEx Portal [2] using the portal's API. The gene expression of STAT3 in tumors is queried from the Open Pediatric Cancer Atlas API [3]. Again, a bar plot is created to visualize the level of expression across tumor gene expression for STAT3.

//     References:
//     1. Xie, Z. et al. Gene Set Knowledge Discovery with Enrichr. Current Protocols vol. 1 (2021). doi:10.1002/cpz1.90
//     2. Lonsdale, J. et al. The Genotype-Tissue Expression (GTEx) project. Nature Genetics vol. 45 580–585 (2013). doi:10.1038/ng.2653
//     3. Shapiro, J. A. et al. OpenPBTA: The Open Pediatric Brain Tumor Atlas. Cell Genomics 100340 (2023) doi:10.1016/j.xgen.2023.100340. doi:10.1016/j.xgen.2023.100340.`,
//     published: 'July 26, 2023',
//     version: '1.0.0',
//     authors: ['CFDE Playbook Partnership'],
//     licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
//     license: 'CC-BY-NC-SA-4.0',
//     dataSources: [
//       'KidsFirst',
//       'GTEx',
//       'Enrichr',
//     ],
//     inputs: [
//       VariantTerm,
//     ],
//     outputs: [
//       PlotlyPlot,
//     ],
//   },
  {
    id: 'cc338d00-d22e-08b1-3b74-21710dec3847',
    label: 'Use Case 9: Identifying regulatory relationships between genes, regulatory regions, and variants',
    description: `Using exRNA APIs, we identify tissue and allele specific regulatory information to perform regulatory variant burden testing.`,
    gpt_summary: `The workflow begins by selecting CA13203640 as the search term. Additional information about the variant CA13203640 is then resolved. Regulatory elements associated with the variant CA13203640 are also resolved. Further information about the regulatory element EH38E2924876 is obtained. Genes that are linked to the regulatory element EH38E2924876 are determined. Variants that are linked to the regulatory element EH38E2924876 are also resolved. Allele specific evidences for the variant CA13203640 are then resolved. Lastly, xQTL evidence data for the variant CA13203640 is obtained.`,
    published: 'July 26, 2023',
    version: '1.0.0',
    authors: ['CFDE Playbook Partnership'],
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
    license: 'CC-BY-NC-SA-4.0',
    dataSources: [
      'ClinGen',
      'STRING',
      'KEGG',
    ],
    inputs: [
      VariantTerm,
    ],
    outputs: [
      RegulatoryElementSet,
    ],
  },
  {
    id: 'c15bf01d-59bf-273b-dede-9179366f4966',
    label: 'Use Case 10: Guilt by Association',
    description: `Given a set of genes, connect the dots (CTD) is performed against protein & pathway graphs to obtain a small subset of highly connected genes and those that are guilty by association.`,
    gpt_summary: `The workflow begins by creating a gene set from Example geneset. Then, CTD is performed on the gene set using STRING and KEGG. From the CTD output, a list of Highly Connected Genes is obtained, as well as a list of Guilty By Association Genes. This process is repeated, resulting in another list of Highly Connected Genes and another list of Guilty By Association Genes.`,
    published: 'July 26, 2023',
    version: '1.0.0',
    authors: ['CFDE Playbook Partnership'],
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
    license: 'CC-BY-NC-SA-4.0',
    dataSources: [
      'ClinGen',
      'STRING',
      'KEGG',
    ],
    inputs: [
      GeneSet,
    ],
    outputs: [
      GeneSet,
    ],
  },
  {
    id: '24f9b280-82fa-4fb3-94e9-1ad80c7b9f3e',
    label: 'Use Case 11: Related Proteins/Metabolites across DCCs',
    description: `Using directly related proteins to a gene of interest, we return a slew of related information to the gene protein network from different DCCs.`,
    gpt_summary: `To begin the workflow, the search term RPE is selected. Using the API from StringDB PPI, the gene ID (SYMBOL) is extracted [1]. This extraction generates a list of nodes (Gene Set) from the given StringDB PPI. From over 1 million signatures, reversers and mimickers are identified using SigCom LINCS [2]. The gene set is then submitted to Enrichr [3]. Next, the gene set is searched in the Metabolomics Workbench to identify relevant reactions [4]. Additionally, the gene set is searched in the Metabolomics Workbench to identify associated metabolites [REF]. Finally, the gene set is searched in the Metabolomics Workbench to identify relevant studies related to the genes [5].

Here are the references for the sources mentioned:
1. STRING api, https://string-db.org/cgi/help.pl?subpage=api%23getting-all-the-string-interaction-partners-of-the-protein-set
2. Evangelista, J. E. et al. SigCom LINCS: data and metadata search engine for a million gene expression signatures. Nucleic Acids Research vol. 50 W697–W709 (2022). doi:10.1093/nar/gkac328
3. Xie, Z. et al. Gene Set Knowledge Discovery with Enrichr. Current Protocols vol. 1 (2021). doi:10.1002/cpz1.90
4. The Metabolomics Workbench, https://www.metabolomicsworkbench.org/`,
    published: 'July 27, 2023',
    version: '1.0.0',
    authors: ['CFDE Playbook Partnership'],
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
    license: 'CC-BY-NC-SA-4.0',
    dataSources: [
      'LINCS',
      'STRING',
      'ChEA',
      'GTEx',
      'Enrichr',
      'KEGG',
      'GO',
      'MSigDB',
      'Metabolomics',
    ],
    inputs: [
      GeneTerm,
    ],
    outputs: [
      MetGeneRxnTable,
      MetgeneMetaboliteTable,
      MetGeneStudyTable,
    ],
  },
  // TODO: 12
  {
    id: '548b6f81-e6d5-cabb-0284-2e2a749271b8',
    label: 'Use Case 13: Prioritizing Targets for Individual Cancer patients',
    description: `Given RNA-seq samples from a patient tumor, we screen for targets which are highly expressed in the tumor but lowly expressed across all healthy human tissues in GTEx. Detailed information about the the selected target are queried from several DCCs.`,
    gpt_summary: `The process began with the upload of a file, which was then parsed as an input gene count matrix. The next step involved identifying significantly over-expressed genes in comparison to normal tissue in GTEx, resulting in the selection of IMP3 for further investigation.

To identify drugs that down-regulate IMP3 expression, RNA-seq-like LINCS L1000 Chemical Perturbagens were utilized. Additionally, genes that down-regulate IMP3 were identified from RNA-seq-like LINCS L1000 CRISPR Knockouts. The list of genes was then filtered by IDG Understudied Proteins.

The Metabolomics Workbench was used to identify associated metabolites and relevant reactions for IMP3. Regulatory elements were obtained from the Linked Data Hub. Lastly, the GlyGen database was searched to identify a relevant set of proteins originating from IMP3.`,
    published: 'Mar 30, 2023',
    version: '1.0.0',
    authors: ['CFDE Playbook Partnership'],
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
    license: 'CC-BY-NC-SA-4.0',
    dataSources: [
      'KidsFirst',
      'LINCS',
      'GTEx',
      'exRNA',
      'GlyGen',
      'Metabolomics',
      'IDG',
    ],
    inputs: [
      GeneCountMatrix,
    ],
    outputs: [
      LINCSL1000ReverseSearchDashboard,
      MetGeneSummary,
      ScoredGenes,
      ScoredDrugs,
      MetGeneRxnTable,
      MetgeneMetaboliteTable,
      VariantSet,
      GlyGenResponseNode,
    ],
  },
]

export default playbooks
