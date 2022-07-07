import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FormRow, Alert } from "../common/index";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/reducers/authReducer";

import Wrapper from "../../assets/wrappers/LoginPage";
import { ROLE_TYPE } from "../../constants/constant";

const initialState = {
	email: "",
	password: "",
};

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [values, setValues] = useState(initialState);
	// const { user, isLoading, showAlert, displayAlert } = useAppContext();

	const loginStatus = useSelector((state) => state.auth.status);
	const error = useSelector((state) => state.auth.error);
	const roleType = useSelector((state) => state.auth.roleType);

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
		navigate("/register");
	};

	const onSubmit = (e) => {
		e.preventDefault();
		console.log("on Submit.......", values);
		const { email, password } = values;
		if (!email || !password) {
			alert("Please proves all values.");
			return;
		}

		const currentUser = { email, password, userType: roleType };
		console.log("on Submit....... validation pass", currentUser);

		// Call API Here......
		dispatch(login(currentUser));
	};

	return (
		<Wrapper className="">
			<form className="form" onSubmit={onSubmit}>
				{roleType === ROLE_TYPE.ADMIN ? (
					<h4>Login As Admin</h4>
				) : roleType === ROLE_TYPE.DOCTOR ? (
					<h4>Login As Doctor</h4>
				) : (
					<h4>Login As Patient</h4>
				)}

				{/* {showAlert && <Alert />} */}

				<div className="row">
					<FormRow
						type="email"
						name="email"
						value={values.email}
						handleChange={handleChange}
						showLabel={true}
						className="inline"
					/>
				</div>
				<div className="row">
					<FormRow
						type="password"
						name="password"
						value={values.password}
						handleChange={handleChange}
						showLabel={true}
						className="inline"
					/>
				</div>

				<div className="row">
					<button type="submit" className="btn btn-block">
						submit
					</button>
				</div>

				{roleType == ROLE_TYPE.PATIENT ? (
					<p>
						Not a member yet?
						<button type="button" onClick={goToLogin} className="member-btn">
							Register
						</button>
					</p>
				) : (
					<div style={{ marginBottom: "20px" }}></div>
				)}
			</form>
		</Wrapper>
	);
};
export default Login;
