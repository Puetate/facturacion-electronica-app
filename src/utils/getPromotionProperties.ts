import { Promotion } from "../models";
import { PromotionData } from "../pages/Promotions/components/PromotionTable";



export const getPromotionProperties = (promotions: Promotion) => {

    const promotion: PromotionData = {
        id: promotions.id || "",
        description: promotions.description,
        value: promotions.value,
        status: (promotions.status) ? "true" : "false"

    }
    return promotion;
}

export const getCategoryRequest = (promotions: PromotionData) => {

    const promotion = {
        id: promotions.id || "",
        description: promotions.description,
        value: promotions.value,
        status: promotions.status

    }
    return promotion;
}