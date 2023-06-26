import axios, {
	AxiosResponse,
	InternalAxiosRequestConfig
} from "axios";
import { useSessionStore } from "../store";
import { SnackbarManager, getValidationError } from "../utils";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const axiosConfig = axios.create({
	baseURL: BASE_URL,

});

axiosConfig.interceptors.request.use((config: InternalAxiosRequestConfig) => {
	const token = useSessionStore.getState().token;
	config.headers.Authorization = `Bearer ${token}`;
	return config;
});

axiosConfig.interceptors.response.use(
	(response: AxiosResponse) => {
		return response;
	},
	(error) => {
		const message: string = error.response?.data.error
			? error.response.data.error
			: "";
		SnackbarManager.error(getValidationError(error.code, message));
		return Promise.reject(error);
	},
);
export default axiosConfig;
