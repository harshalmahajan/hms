import axios from "axios";

const instance = axios.create({
	baseURL: "http://localhost:5000/api/v1",
	timeout: 60000,
	// withCredentials: true,
	// crossDomain: true,
});

instance.interceptors.request.use(
	async (config) => {
		config.headers["Content-Type"] = "application/json";
		config.headers["Access-Control-Allow-Credentials"] = true;
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

instance.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		console.log("error-----", error?.response);
		if (error?.response?.status === 401) {
			return Promise.reject(error?.response?.data);
		}
		return Promise.reject(error?.response?.data);
	}
);

const get = async (url, config) => {
	try {
		const response = await instance.get(url, config);
		if (response.ok) {
			// Return a result object similar to Axios
			return {
				status: response.status,
				data: response.data,
				headers: response.headers,
				url: response.url,
			};
		}
		throw new Error(response.statusText);
	} catch (err) {
		return Promise.reject(err.message ? err.message : err);
	}
};

const post = async (url, data, config) => {
	try {
		const response = await instance.post(url, data, config);
		console.log("in HttpClient Post", response);
		if (response.status === 200 || response.status === 201) {
			return {
				status: response.status,
				data: response.data,
				headers: response.headers,
				url: response.config.url,
			};
		}
		throw new Error(response.statusText);
	} catch (err) {
		return Promise.reject(err.message ? err.message : err);
	}
};

const put = async (url, data, config) => {
	try {
		const response = await instance.put(url, data, config);
		if (response.ok) {
			return {
				status: response.status,
				data: response.data,
				headers: response.headers,
				url: response.url,
			};
		}
		throw new Error(response.statusText);
	} catch (err) {
		return Promise.reject(err.message ? err.message : err);
	}
};

const httpClient = {
	get,
	post,
	put,
};
export default httpClient;
