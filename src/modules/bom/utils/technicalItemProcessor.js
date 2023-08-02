const technicalItemProcessor = async( props ) => {
  //console.log('technicalItem props ->', props)
  const technicalItem = props.technicalItemData
  //console.log('technicalItem data ->', technicalItem)

  const newTechnicalItem = {
    technicalName: technicalItem.technicalName,
    technicalCode: technicalItem.technicalCode,
    specifications: technicalItem.specifications,
    unit: technicalItem.unit,
    alternativeUnit: technicalItem.alternativeUnit,
    subordinate: technicalItem.subordinate,
    subordinateTo: technicalItem.subordinateTo,
    itemType: technicalItem.itemType,
    relatedBom: technicalItem.relatedBom,
  }
  //console.log('** technicalItem processed data ->', newTechnicalItem)

  return newTechnicalItem
}
module.exports = {
  technicalItemProcessor
}