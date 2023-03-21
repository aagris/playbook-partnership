import { MetaNode } from '@/spec/metanode'
import { GeneTerm } from '@/components/core/input/term'
import { GeneSet } from '@/components/core/input/set'
import { MetGeneStudyTable } from '../metgene_study_table'

// A unique name for your resolver is used here
export const MetGeneStudies = MetaNode('MetGeneStudies')
  // Human readble descriptors about this node should go here
  .meta({
    label: 'MetGENE Studies',
    description: 'Compute the MetGENE studies function',
  })


  // This should be a mapping from argument name to argument type
  //  the types are previously defined Meta Node Data Types
  .inputs({ gene: GeneTerm })
  // This should be a single Meta Node Data Type
  .output(MetGeneStudyTable)
  // The resolve function uses the inputs and returns output
  //  both in the shape prescribed by the data type codecs
  .resolve(async (props) => {
    const species_id = "hsa"
    const geneID_type = "SYMBOL_OR_ALIAS"
    
    const gene_ID = props.inputs.gene
    const vtf = "json"
    const req = await fetch(`https://bdcw.org/MetGENE/rest/studies/species/${species_id}/GeneIDType/${geneID_type}/GeneInfoStr/${gene_ID}/anatomy/NA/disease/NA/phenotype/NA/viewType/${vtf}`)
    const res = await req.json()
    

    
    return  res
  })
  .story(props =>
    `The gene was then searched in the Metabolomics Workbench [https://www.metabolomicsworkbench.org/] to identify relevant studies related to the gene.`
  )
  .build()

  export const MetGeneStudiesGeneSet = MetaNode('MetGeneStudiesGeneSet')
  // Human readble descriptors about this node should go here
  .meta({
    label: 'MetGENE Studies with GeneSet',
    description: 'Compute the MetGENE studies function for a GeneSet',
  })


  // This should be a mapping from argument name to argument type
  //  the types are previously defined Meta Node Data Types
  .inputs({ geneset: GeneSet })
  // This should be a single Meta Node Data Type
  .output(MetGeneStudyTable)
  // The resolve function uses the inputs and returns output
  //  both in the shape prescribed by the data type codecs
  .resolve(async (props) => {
    const species_id = "hsa"
    const geneID_type = "SYMBOL_OR_ALIAS"
    
    const gene_ID = props.inputs.geneset.set.join(",");
    const vtf = "json"
    const req = await fetch(`https://bdcw.org/MetGENE/rest/studies/species/${species_id}/GeneIDType/${geneID_type}/GeneInfoStr/${gene_ID}/anatomy/NA/disease/NA/phenotype/NA/viewType/${vtf}`)
    const res = await req.json()
    

    
    return  res
  })
  .story(props =>
    `The geneset was then searched in the Metabolomics Workbench [REF] to identify relevant studies related to the genes.`
  )
  .build()