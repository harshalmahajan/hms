import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Outlet ,useNavigate} from "react-router-dom";
import banner from "../assets/images/favicon.png";
import Wrapper from "../assets/wrappers/LandingPage";
import { ROLE_TYPE } from "../constants/constant";
import { authActions } from "../redux/reducers/authReducer";

const Landing = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	
	const roleType = useSelector((state) => state.auth.roleType);

	const changeRoleType = (e, type) => {
		e.preventDefault();

		if (type != ROLE_TYPE.PATIENT) {
			navigate("/login");
		}

		dispatch(authActions.setRoleType(type));
	};

	return (
		<Wrapper className="landing-container">
			{/* Top Navbar */}

			<nav className="main-menu">
				<h4> XYZ HOSPITAL</h4>
				<div className="nav-links">
					<Link className="nav-link " to="/">
						HOME
					</Link>
					<Link className="nav-link" to="/about-us">
						ABOUT US
					</Link>
					<Link className="nav-link" to="/contact-us">
						CONTACT
					</Link>
				</div>
			</nav>

			{/* page content register/login  */}
			<div className="page">
				<div className="main-banner">
					<img
						src={banner}
						alt="HMS"
						height={200}
						width={200}
						className="banner"
					/>
					<h5> WELCOME</h5>
				</div>
				<div className="auth-container">
					<nav className="sub-menu">
						<div className="nav-links">
							<Link
								className={`${
									roleType === ROLE_TYPE.PATIENT
										? "active nav-link"
										: "nav-link"
								}`}
								to="/"
								onClick={(e) => changeRoleType(e, ROLE_TYPE.PATIENT)}
							>
								Patient
							</Link>
							<Link
								className={`${
									roleType === ROLE_TYPE.DOCTOR ? "active nav-link" : "nav-link"
								}`}
								to="/"
								onClick={(e) => changeRoleType(e, ROLE_TYPE.DOCTOR)}
							>
								Doctor
							</Link>
							<Link
								className={`${
									roleType === ROLE_TYPE.ADMIN ? "active nav-link" : "nav-link"
								}`}
								to="/"
								onClick={(e) => changeRoleType(e, ROLE_TYPE.ADMIN)}
							>
								Admin
							</Link>
						</div>
					</nav>
					{/* Render Dynamic routes */}
					<Outlet></Outlet>
				</div>
			</div>
		</Wrapper>
	);
};

export default Landing;
