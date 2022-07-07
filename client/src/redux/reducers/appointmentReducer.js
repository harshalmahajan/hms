import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import httpClient from "../../api/api";

const initialState = {
	newAppointment: null,
	appointments: [],
	status: "idle",
	error: null,
};

export const getAllAppointments = createAsyncThunk(
	"patient/appointment-list",
	async (request) => {
		const response = await httpClient.post(
			"/patient/appointment-list",
			request
		);
		return response.data;
	}
);

export const bookAppointment = createAsyncThunk(
	"patient/appointments",
	async (request) => {
		const response = await httpClient.post("/patient/appointments", request);
		return response.data;
	}
);

const appointmentSlice = createSlice({
	name: "appointments",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getAllAppointments.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(getAllAppointments.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.appointments = action.payload.data?.map((item) => {
					return {
						...item,
						doctorId: item.doctor._id,
						doctorName: item.doctor.username,
					};
				});
			})
			.addCase(getAllAppointments.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(bookAppointment.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(bookAppointment.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.newAppointment = action.payload.data;
			})
			.addCase(bookAppointment.rejected, (state, action) => {
				state.status = "failed";
				state.newAppointment = null;
				state.error = action.error.message;
			});
	},
});

export const selectAllAppointments = (state) => state.appointments.appointments;

export const appointmentActions = appointmentSlice.actions;

export default appointmentSlice.reducer;
