export enum TypeClient{
    NATURAL="NATURAL",
    JURIDICO="JURÍDICO"
}

export interface Client{
    id:string,
    identification:string,
    fullName:string,
    telephone:string,
    email:string,
    address: string,
    type:TypeClient,
    status:string | boolean
}