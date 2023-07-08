export interface ResponseRequest<T> {
    httpStatus: string,
    message: string,
    data: T
}
