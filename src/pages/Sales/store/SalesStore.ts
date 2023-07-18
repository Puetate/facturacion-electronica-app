import { create } from "zustand";
import { BillDetail, Client, IdentificationType } from "../../../models";

export interface ProductDetail extends Omit<BillDetail, "product"> {
    id: string;
    name: string;
    product: string;
}

export interface SalesState {
    client: Client;
    setClient: (customer: Client) => void;
    totalToPay: number;
    setTotalToPay: (total: number) => void;
    productsDetail: ProductDetail[];
    setProductsDetail: (productsDetail: ProductDetail[]) => void;
    addProductDetail: (product: ProductDetail) => void;
    removeProductDetail: (product: ProductDetail) => void;
    clearStore: () => void;
}

const initialState: SalesState = {
    client: {
        id: "",
        identification: "",
        fullname: "",
        telephone: "",
        email: "",
        address: "",
        status: true,
        identificationType: IdentificationType.CEDULA
    },
    setClient: () => { },
    totalToPay: 0,
    setTotalToPay: () => { },
    productsDetail: [],
    setProductsDetail: () => { },
    addProductDetail: () => { },
    removeProductDetail: () => { },
    clearStore: () => { }
}

const IVA = 1.12;

export const useSalesStore = create<SalesState>((set, get) => ({
    client: initialState.client,
    setClient: (client) => set({ client }),
    totalToPay: initialState.totalToPay,
    setTotalToPay: (totalToPay) => set({ totalToPay }),
    productsDetail: initialState.productsDetail,
    setProductsDetail: (productsDetail) => set({ productsDetail }),
    addProductDetail: (product) => {
        set((state) => ({ productsDetail: [...state.productsDetail, product] }))
        const totalToPay = get().productsDetail.reduce((total, currentValue) => total + currentValue.subtotal, 0) * IVA;
        set({ totalToPay });
    },
    removeProductDetail: (product) => {
        const products = get().productsDetail.filter(p => p.product != product.product);
        set(({ productsDetail: products }))
        const totalToPay = get().productsDetail.reduce((total, currentValue) => total + currentValue.subtotal, 0) * IVA;
        set({ totalToPay });
    },
    clearStore: () => set({ productsDetail: initialState.productsDetail, client: initialState.client, totalToPay: initialState.totalToPay })
}));