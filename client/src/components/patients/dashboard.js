import { Link } from "react-router-dom";
import img from "../../assets/images/user0.png";
import Wrapper from "../../assets/wrappers/DashboardPage";

const Dashboard = () => {
	return (
		<Wrapper className="container">
			<div className="dashboard">
				<div className="card">
					<img src={img} alt="All Appointments" />
					<Link to="/patient/appointment-list">Appointment List</Link>
				</div>

				<div className="card">
					<img src={img} alt="All Appointments" />
					<Link className="links" to="/patient/book-appointment">Book Appointment</Link>
				</div>

			</div>
		</Wrapper>
	);
};

export default Dashboard;
