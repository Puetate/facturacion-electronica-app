import { ProductCategory } from "../models";
import { CategoryData } from "../pages/Categories/components/CategoryTable";

export const getCategoryProperties = (productCategory: ProductCategory) => {

    const category: CategoryData = {
        id: productCategory.id || "",
        category: productCategory.category,
        promotion: ((productCategory.promotion) ? productCategory.promotion.id : "")!,
        tax: ((productCategory.tax) ? productCategory.tax.id : "")!,
        status: (productCategory.status) ? "true" : "false"

    }
    return category;
}