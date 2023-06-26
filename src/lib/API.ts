import axios from "./axios.config";

const API = {
	get,
	post,
	put,
	patch,
	del,
};

export interface RequestParams {
	url: string;
	params?: {};
	data?: {};
	headers?: {};
}

export interface ResponseSuccess<T> {
	data: T,
	error: null
}

export interface ResponseError {
	data: null,
	error: any
}

function get<T>(params: RequestParams): Promise<ResponseSuccess<T> | ResponseError> {
	return axios<T>({
		url: params.url,
		method: "GET",
		params: params.params,
		data: params.data,
		headers: params.headers,
	})
		.then((res) => ({ data: res.data, error: null }))
		.catch((error) => ({ data: null, error }));
}

function post<T>(params: RequestParams): Promise<ResponseSuccess<T> | ResponseError> {
	return axios<T>({
		url: params.url,
		method: "POST",
		params: params.params,
		data: params.data,
	})
		.then((res) => ({ data: res.data, error: null }))
		.catch((error) => ({ data: null, error }));
}

function put<T>(params: RequestParams): Promise<ResponseSuccess<T> | ResponseError> {
	return axios<T>({
		url: params.url,
		method: "PUT",
		params: params.params,
		data: params.data,
		headers: params.headers,
	})
		.then((res) => ({ data: res.data, error: null }))
		.catch((error) => ({ data: null, error }));
}

function patch<T>(params: RequestParams): Promise<ResponseSuccess<T> | ResponseError> {
	return axios<T>({
		url: params.url,
		method: "PATCH",
		params: params.params,
		data: params.data,
		headers: params.headers,
	})
		.then((res) => ({ data: res.data, error: null }))
		.catch((error) => ({ data: null, error }));
}

function del<T>(params: RequestParams): Promise<ResponseSuccess<T> | ResponseError> {
	return axios<T>({
		url: params.url,
		method: "DELETE",
		params: params.params,
		data: params.data,
		headers: params.headers,
	})
		.then((res) => ({ data: res.data, error: null }))
		.catch((error) => ({ data: null, error }));
}

export default API;
