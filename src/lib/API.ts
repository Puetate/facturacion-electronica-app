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

function get<T>(params: RequestParams) {
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

function post(params: RequestParams) {
	return axios({
		url: params.url,
		method: "POST",
		params: params.params,
		data: params.data,
		headers: params.headers,
	})
		.then((res) => res.data)
		.catch((error) => ({ error }));
}

function put(params: RequestParams) {
	return axios({
		url: params.url,
		method: "PUT",
		params: params.params,
		data: params.data,
		headers: params.headers,
	})
		.then((res) => res.data)
		.catch((error) => ({ error }));
}

function patch(params: RequestParams) {
	return axios({
		url: params.url,
		method: "PATCH",
		params: params.params,
		data: params.data,
		headers: params.headers,
	})
		.then((res) => res.data)
		.catch((error) => ({ error }));
}

function del(params: RequestParams) {
	return axios({
		url: params.url,
		method: "DELETE",
		params: params.params,
		data: params.data,
		headers: params.headers,
	})
		.then((res) => res.data)
		.catch((error) => ({ error }));
}

export default API;
