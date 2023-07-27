const eBomProcessor = async({ eBomData, user }) => {
  //console.log('ebom data ->', eBomData)
  const newEBom = {
    bomName: eBomData.bomName,
    revision: eBomData.revision,
    bomCode: eBomData.bomCode,
    bomType: eBomData.bomType,
    dateCreated: new Date(),
    userCreated: user,
    active: eBomData.active,
    master: eBomData.master,
    masterId: eBomData.masterId,
    productName: eBomData.productName,
    drawingNo: eBomData.drawingNo,
    drawingPage: eBomData.drawingPage,
    orderCode: eBomData.orderCode,
    orderSubCode: eBomData.orderSubCode,
  }
  //console.log('** ebom processed data ->', newEBom)

  return newEBom
}
module.exports = {
  eBomProcessor
}