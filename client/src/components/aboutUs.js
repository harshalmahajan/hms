import { Link } from "react-router-dom";

import Wrapper from "../assets/wrappers/patientContainerPage";

const AboutUs = () => {
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
				About Us Page
			</div>
		</Wrapper>
	);
};
export default AboutUs;
