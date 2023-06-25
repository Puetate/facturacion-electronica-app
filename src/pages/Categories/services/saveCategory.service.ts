import API from "../../../lib/API";

export interface CategoryRequest {
    id: string,
    category: string,
    promotionId: string,
    taxId: string,
    status: boolean | string
}

const URL = "/protected/category"
export default async function saveCategoryService(category: CategoryRequest) {
    const res = await API.post<CategoryRequest>({ url: URL, data: category });
    return res;
}