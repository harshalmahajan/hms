import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/authReducer.js";
import appointmentSlice from "./reducers/appointmentReducer.js";

const store = configureStore({
	reducer: {
		auth: authSlice,
		appointments: appointmentSlice,
	},
});

export default store;
