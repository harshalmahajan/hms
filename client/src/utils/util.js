export const setToken = (data, token) => {
	console.log("data....", data, token);
	localStorage.setItem("user_data", JSON.stringify(data));
	localStorage.setItem("user_token", JSON.stringify(token));
};

export const getToken = () => {
	return {
		user_data: JSON.parse(localStorage.getItem("user_data")),
		user_token: JSON.parse(localStorage.getItem("user_token")),
	};
};

export default { setToken, getToken };
