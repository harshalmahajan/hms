import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
	selectAllAppointments,
	getAllAppointments,
} from "../../redux/reducers/appointmentReducer";

import Table from "../common/table/table";
import { getToken } from "../../utils/util";

const AppointmentList = () => {
	const dispatch = useDispatch();
	const attachments = useSelector(selectAllAppointments);
	const appStatus = useSelector((state) => state.appointments.status);
	const error = useSelector((state) => state.appointments.error);

	const user = useSelector((state) => state.auth.user);

	useEffect(() => {
		if (user) {
			dispatch(getAllAppointments({ pId: user._id }));
		} else {
			dispatch(getAllAppointments({ pId: getToken().user_data._id }));
		}
	}, [user, dispatch]);

	let content;

	if (appStatus === "loading") {
		// content = <Spinner text="Loading..." />
		content = <div>"Loading..." </div>;
	} else if (appStatus === "succeeded") {
		content = (
			<Table
				columns={[
					{
						field: "_id",
						title: "Appointment ID",
					},
					{
						field: "fname",
						title: "First Name",
					},
					{
						field: "lname",
						title: "Last Name",
					},
					{
						field: "contact",
						title: "Contact",
					},
					{
						field: "doctorName",
						title: "Doctor Name",
					},
					{
						field: "docFees",
						title: "Doctor Fees",
					},
					{
						field: "appDate",
						title: "Appointment Date",
					},
				]}
				data={attachments}
			></Table>
		);
	} else if (appStatus === "failed") {
		content = <div>{error}</div>;
	}

	return (
		<section className="appointment-list">
			<h4 style={{paddingTop: '20px'}}>All Appointments</h4>
			{content}
		</section>
	);
};

export default AppointmentList;
