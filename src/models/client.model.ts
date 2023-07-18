export enum TypeClient {
    NATURAL = "NATURAL",
    JURIDICO = "JURIDICO"
}

export enum IdentificationType {
    CEDULA = "CEDULA",
    PASAPORTE = "PASAPORTE",
    RUC = "RUC"
}

export interface Client {
    id: string,
    identification: string,
    fullname: string,
    telephone: string,
    email: string,
    address: string,
    status: string | boolean
    identificationType:IdentificationType
}