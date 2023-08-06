const techItemProcessor = async( props ) => {
  //console.log('technicalItem props ->', props)
  const techItem = props.techItemData
  console.log('TechItem * Processor * technicalItem data ->', techItem)

  const newTechItem = {
    technicalName: techItem.technicalName,
    technicalCode: techItem.technicalCode,
    specifications: techItem.specifications,
    unit: techItem.unit,
    alternativeUnit: techItem.alternativeUnit,
    subordinate: techItem.subordinate,
    masterItems: techItem.masterItems, // Master Technical Items
    supplyType: techItem.supplyType,
    relatedBom: techItem.relatedBom, // Related BOM for Making this Item
    active: techItem.active
  }
  console.log('** TechItem * Processor * processed data ->', newTechItem)

  return newTechItem
}
module.exports = {
  techItemProcessor
}