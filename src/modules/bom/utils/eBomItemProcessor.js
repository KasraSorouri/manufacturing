const eBomItemProcessor = async( props ) => {
  console.log('eBomItemProcessor  * props ->', props)
  const eBomItem = props.eBomItemData
  console.log('eBomItemProcessor * data ->', eBomItem)

  const newEBomlItem = {
    ebomId: eBomItem.ebomId,
    item: eBomItem.item,
    qty: eBomItem.qty,
    unit: eBomItem.unit,
    qtyChangable: eBomItem.qtyChangable,
    spesification: eBomItem.spesification,
    subModule: eBomItem.subModule,
    relationType: eBomItem.relationType,
    alternativeCode: eBomItem.alternativeCode,
    copiedFrom: eBomItem.copiedFrom,
  }
  //console.log('** eBomItemProcessor * processed data ->', newEBomlItem)

  return newEBomlItem
}
module.exports = {
  eBomItemProcessor
}