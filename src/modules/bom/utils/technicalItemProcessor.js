const technicalItemProcessor = async( props ) => {
  //console.log('technicalItem props ->', props)
  const technicalItem = props.technicalItemData
  //console.log('technicalItem data ->', technicalItem)

  const newTechnicalItem = {
    technicalName: technicalItem.technicalName,
    technicalCode: technicalItem.technicalCode,
    technicalCategory: technicalItem.technicalCategory,
    unit: technicalItem.unit,
    specification: technicalItem.specification,
    alternativeCode: technicalItem.alternativeCode || null,
  }
  //console.log('** technicalItem processed data ->', newTechnicalItem)

  return newTechnicalItem
}
module.exports = {
  technicalItemProcessor
}