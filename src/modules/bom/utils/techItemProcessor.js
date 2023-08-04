const techItemProcessor = async( props ) => {
  //console.log('technicalItem props ->', props)
  const techItem = props.techItemData
  //console.log('technicalItem data ->', technicalItem)

  const newTechItem = {
    technicalName: techItem.technicalName,
    technicalCode: techItem.technicalCode,
    specifications: techItem.specifications,
    unit: techItem.unit,
    alternativeUnit: techItem.alternativeUnit,
    subordinate: techItem.subordinate,
    supplyType: techItem.supplyType,
    relatedBom: techItem.relatedBom,
    active: techItem.active
  }
  //console.log('** technicalItem processed data ->', newTechnicalItem)

  return newTechItem
}
module.exports = {
  techItemProcessor
}