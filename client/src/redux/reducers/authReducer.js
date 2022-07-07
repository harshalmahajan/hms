import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import httpClient from "../../api/api";
import { ROLE_TYPE } from "../../constants/constant";
import util from "../../utils/util";

const initialAuthState = {
	isAuthenticated: false,
	user: util.getToken().user,
	token: util.getToken().token,
	status: "idle",
	error: null,
	roleType: ROLE_TYPE.PATIENT,
};

export const login = createAsyncThunk("auth/login", async (request) => {
	const response = await httpClient.post("/auth/login", request);
	return response.data;
});

export const register = createAsyncThunk("auth/register", async (request) => {
	const response = await httpClient.post("/auth/register", request);
	return response.data;
});

const authSlice = createSlice({
	name: "authentication",
	initialState: initialAuthState,
	reducers: {
		logout(state) {
			state.isAuthenticated = false;
		},
		setRoleType(state, action) {
			state.roleType = action.payload;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(login.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(login.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.isAuthenticated = true;
				state.user = action.payload.data;
				state.token = action.payload.token;
				util.setToken(action.payload.data, action.payload.token);
			})
			.addCase(login.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
				state.isAuthenticated = false;
				state.user = null;
				state.token = null;
				util.setToken(null, null);
			})
			.addCase(register.pending, (state) => {
				state.status = "loading";
			})
			.addCase(register.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.isAuthenticated = true;
				state.user = action.payload.data;
				state.token = action.payload.token;
				util.setToken(action.payload.data, action.payload.token);
			})
			.addCase(register.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
				state.isAuthenticated = false;
				state.user = null;
				state.token = null;
				util.setToken(null, null);
			});
	},
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
