import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FormRow, Alert } from "../common/index";
import { useNavigate } from "react-router-dom";
import { register } from "../../redux/reducers/authReducer";
import { ROLE_TYPE } from "../../constants/constant";

import Wrapper from "../../assets/wrappers/RegisterPage";

const initialState = {
	fname: "",
	lname: "",
	email: "",
	contact: "",
	password: "",
	confirmPassword: "",
};

const Register = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [values, setValues] = useState(initialState);
	// const { user, isLoading, showAlert, displayAlert } = useAppContext();

	const loginStatus = useSelector((state) => state.auth.status);
	const error = useSelector((state) => state.auth.error);

	useEffect(() => {
		if (loginStatus === "succeeded") {
			navigate("/patient/dashboard");
		}
		if (loginStatus === "rejected") {
			console.log("Login error...", error);
		}
	}, [loginStatus, dispatch]);

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const goToLogin = (e) => {
		e.preventDefault();
		navigate("/login");
	};

	const onSubmit = (e) => {
		e.preventDefault();
		console.log("on Submit.......", values);
		const { fname, lname, email, contact, password, confirmPassword } = values;
		if (
			!email ||
			!password ||
			!confirmPassword ||
			!contact ||
			!fname ||
			!lname
		) {
			alert("Please proves all values.");
			return;
		}

		if (password !== confirmPassword) {
			alert("Password and confirm password should be same.");
			return;
		}

		const currentUser = {
			fname,
			lname,
			email,
			contact,
			password,
			userType: ROLE_TYPE.PATIENT,
		};
		console.log("on Submit....... validation pass", currentUser);
		// Call API Here......

		dispatch(register(currentUser));
	};

	return (
		<Wrapper className="">
			<form className="form" onSubmit={onSubmit}>
				<h4>Register As Patient</h4>

				{/* {showAlert && <Alert />} */}
				<div className="row">
					<FormRow
						type="text"
						name="fname"
						value={values.fname}
						handleChange={handleChange}
					/>
					<FormRow
						type="text"
						name="lname"
						value={values.lname}
						handleChange={handleChange}
					/>
				</div>
				<div className="row">
					<FormRow
						type="email"
						name="email"
						value={values.email}
						handleChange={handleChange}
					/>
					<FormRow
						type="number"
						name="contact"
						value={values.contact}
						handleChange={handleChange}
					/>
				</div>
				<div className="row">
					<FormRow
						type="password"
						name="password"
						value={values.password}
						handleChange={handleChange}
					/>
					<FormRow
						type="password"
						name="confirmPassword"
						value={values.confirmPassword}
						handleChange={handleChange}
					/>
				</div>
				<div className="row">
					<button type="submit" className="btn btn-block">
						submit
					</button>
				</div>
				<p>
					Already a member
					<button type="button" onClick={goToLogin} className="member-btn">
						Login
					</button>
				</p>
			</form>
		</Wrapper>
	);
};
export default Register;
