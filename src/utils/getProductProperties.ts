import { Product } from "../models";
import { ProductData } from "../pages/Products/components/ProductTable";

export const getProductProperties = (productModel: Product) => {

    const product: ProductData = {
        id: productModel.id,
        code: productModel.code,
        name: productModel.name,
        price: productModel.price,
        quantity: productModel.quantity,
        status: (productModel.status) ? "true" : "false",
        minStock: productModel.minStock,
        maxStock: productModel.maxStock,
        category: ((productModel.category != null) ? productModel.category.id : "")!,
        promotion: ((productModel.promotion != null) ? productModel.promotion.id : "")!,
        tax: ((productModel.tax != null) ? productModel.tax.id : "")!,

    }
    return product;
}