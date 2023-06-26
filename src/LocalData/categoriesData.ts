import { Category, ProductCategory } from "../models";

export const categoriesData: ProductCategory[] = [
    {
        id: "1",
        tax:
        {
            id: "1",
            percentage: 12,
            status: true,
            tax: "12$ impuesto"
        },
        promotion:
        {
            id: "1",
            description: "dia del Padre",
            status: true,
            value: 10
        },
        category: Category.BEVERAGES,
        status: true
    }
    ,
    {
        id: "2",
        tax:
        {
            id: "2",
            percentage: 5,
            status: true,
            tax: "5$ impuesto"
        },
        promotion:
        {
            id: "2",
            description: "dia del Padre",
            status: true,
            value: 12
        },
        category: Category.FRUITS,
        status: true
    }
]