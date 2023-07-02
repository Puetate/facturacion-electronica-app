export const enum EndPoints{
    PROTECTED='/protected',
    CATEGORY=`${EndPoints.PROTECTED}/category`,
    PROMOTION=`${EndPoints.PROTECTED}/promotion`,
    TAX=`${EndPoints.PROTECTED}/tax`,
    SUPPLIER=`${EndPoints.PROTECTED}/supplier`,
    PRODUCT=`${EndPoints.PROTECTED}/product`
}