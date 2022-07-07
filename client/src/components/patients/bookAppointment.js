import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FormRow, Alert, FormRowSelect } from "../common/index";
import { useNavigate } from "react-router-dom";
import { bookAppointment } from "../../redux/reducers/appointmentReducer";
import { ROLE_TYPE } from "../../constants/constant";

import Wrapper from "../../assets/wrappers/BookAppointment";

const initialState = {
	pId: "",
	fname: "",
	lname: "",
	email: "",
	gender: "",
	contact: "",
	doctor: "",
	docFees: "",
	appDate: "",
	appTime: "",
};

const doctorList = [
	{ id: null, name: "Select Doctor", fees: 0 },
	{ id: "62bd4794e61feff68f148522", name: "Doctor", fees: 500 },
	{ id: "62bd4806e61feff68f148527", name: "Doctor One", fees: 600 },
];

const timeList = [
	{ id: "10 AM", name: "10 AM" },
	{ id: "11 AM", name: "11 AM" },
	{ id: "12 PM", name: "12 PM" },
	{ id: "1 PM", name: "1 PM" },
	{ id: "2 PM", name: "2 PM" },
	{ id: "3 PM", name: "3 PM" },
	{ id: "4 PM", name: "4 PM" },
	{ id: "5 PM", name: "5 PM" },
	{ id: "6 PM", name: "6 PM" },
];

const AddAppointment = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [values, setValues] = useState(initialState);
	// const { user, isLoading, showAlert, displayAlert } = useAppContext();

	const loginStatus = useSelector((state) => state.auth.status);
	const user = useSelector((state) => state.auth.user);
	const error = useSelector((state) => state.auth.error);

	// useEffect(() => {
	// 	if (loginStatus === "succeeded") {
	// 		navigate("/patient/dashboard");
	// 	}
	// 	if (loginStatus === "rejected") {
	// 		console.log("Login error...", error);
	// 	}
	// }, [loginStatus, dispatch]);

	const handleChange = (e) => {
		if (e.target.name == "doctor") {
			const docFees = doctorList.find(
				(item) => item.id === e.target.value
			).fees;
			setValues({
				...values,
				[e.target.name]: e.target.value,
				docFees: docFees,
			});
		} else {
			setValues({ ...values, [e.target.name]: e.target.value });
		}
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		console.log("on Submit.......", values);
		const { doctor, docFees, appDate, appTime } = values;

		if (!doctor || !docFees || !appDate || !appTime) {
			alert("Please proves all values.");
			return;
		}

		const currentUser = {
			pId: user._id,
			fname: user.fname,
			lname: user.lname,
			email: user.email,
			contact: user.contact,

			doctor,
			docFees,
			appDate,
			appTime,
			userType: ROLE_TYPE.PATIENT,
			gender: 'Male'
		};

		console.log("on Submit....... validation pass", currentUser);
		// Call API Here......

		const result = await dispatch(bookAppointment(currentUser)).unwrap();
		console.log("Book Appointment result...", result);
	};

	return (
		<Wrapper className="">
			<form className="form" onSubmit={onSubmit}>
				<h4>Book Appointment</h4>

				{/* {showAlert && <Alert />} */}

				<div className="row">
					<FormRowSelect
						labelText="Doctor"
						name="doctor"
						value={values.doctor}
						handleChange={handleChange}
						list={doctorList}
					/>
				</div>
				<div className="row">
					<FormRow
						type="number"
						name="docFees"
						value={values.docFees}
						handleChange={handleChange}
						showLabel={true}
					/>
				</div>
				<div className="row">
					<FormRow
						type="date"
						labelText="Appointment Date"
						name="appDate"
						value={values.appDate}
						handleChange={handleChange}
						showLabel={true}
					/>
				</div>

				<div className="row">
					<FormRowSelect
						labelText="Appointment Time"
						name="appTime"
						value={values.appTime}
						handleChange={handleChange}
						list={timeList}
					/>
				</div>

				<div className="row">
					<button type="submit" className="btn btn-block">
						submit
					</button>
				</div>
			</form>
		</Wrapper>
	);
};
export default AddAppointment;
