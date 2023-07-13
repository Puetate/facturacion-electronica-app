export enum CompanyType {
    EMPTY = "",
    JURIDICA = "JURIDICA",
    NATURAL = "NATURAL"
}

export enum EnvironmentType {
    PRODUCTION = "PRODUCCION",
    PRUEBA = "PRUEBA"
}
export interface Company {
    id_company?: string,
    name: string,
    email: string,
    ruc: string,
    phone: string,
    address: string,
    accounting: boolean
    type: CompanyType,
    environment: EnvironmentType,
    logo: string,
}