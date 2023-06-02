import { TypeWithKey } from "../models";

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
export const getValidationError = (errorCode: any, message?: string) => {
	const codeMatcher: TypeWithKey<string> = {
		ERR_NETWORK: "Error de conexión",
		ERR_TIMEOUT: "Se acabó el tiempo",
		ERR_CANCEL: "Se canceló la petición",
		ERR_UNKNOWN: "Error desconocido",
		ERR_BAD_REQUEST: message ? message : "BAD REQUEST",
		ERR_BAD_RESPONSE: message ? message : "BAD RESPONSE",
		ERR_400: "Error 400",
		ERR_401: "Error 401",
		ERR_403: "Error 403",
	};
	return codeMatcher[errorCode];
};
