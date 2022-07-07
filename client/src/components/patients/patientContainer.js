import { Outlet, Link } from "react-router-dom";

import Wrapper from "../../assets/wrappers/patientContainerPage";

const PatientContainer = () => {
	return (
		<Wrapper className="container">

			<nav className="main-menu">
				<h4> XYZ HOSPITAL</h4>
				<div className="nav-links">
					<Link className="nav-link" to="/">
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

			<div className="page">
				{/* Sub Menu */}
				<div className="left-menu">
					<nav className="left-nav-links">
						<Link className="left-nav-link" to="/patient/dashboard">
							Dashboard
						</Link>
						<Link className="left-nav-link" to="/patient/book-appointment">
							Book Appointment
						</Link>
						<Link className="left-nav-link" to="/patient/appointment-list">
							Appointment List
						</Link>
					</nav>
				</div>
				<div className="patient-container">
					<Outlet></Outlet>
				</div>
			</div>
		</Wrapper>
	);
};
export default PatientContainer;
