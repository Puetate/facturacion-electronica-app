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
    fullName: string,
    telephone: string,
    email: string,
    address: string,
    active: string | boolean
    type: TypeClient,
    identificationType:IdentificationType
}