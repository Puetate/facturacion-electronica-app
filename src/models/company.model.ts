export enum CompanyType {
    EMPTY = "EMPTY",
    TECHNOLOGY = "TECHNOLOGY",
    NATURAL = "NATURAL"
}
export enum EnvironmentType {
    PRODUCTION = "PRODUCCION",
    TEST = "PRUEBA"
}
export interface Company {
    id_company: string,
    city: string,
    ruc: string,
    type: CompanyType,
    name: string,
    email: string,
    phone: string,
    logo: string,
    environment: EnvironmentType,
    accounting: boolean
}