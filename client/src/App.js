import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Error } from "./components/common";
import Landing from "./components/landing";
import AboutUs from "./components/aboutUs";
import ContactUs from "./components/contactUs";
import { Register, Login } from "./components/authentication";
import {
	PatientContainer,
	AppointmentList,
	Dashboard,
	BookAppointment
} from "./components/patients";

function App() {
	return (
		<div className="main-container">
			<BrowserRouter>
				<Routes>
					<Route path="/patient" exact element={<PatientContainer />}>
						
						<Route
							path="/patient/book-appointment"
							exact
							element={<BookAppointment />}
						/>
						<Route
							path="/patient/appointment-list"
							exact
							element={<AppointmentList />}
						/>
						<Route index element={<Dashboard />} />
						<Route path="/patient/dashboard" exact element={<Dashboard />} />
					</Route>

					<Route path="/about-us" exact element={<AboutUs />} />
					<Route path="/contact-us" exact element={<ContactUs />} />

					<Route path="/" exact element={<Landing />}>
						<Route index exact element={<Register />} />
						<Route path="/login" exact element={<Login />} />
						<Route path="/register" exact element={<Register />} />
					</Route>

					<Route path="*" element={<Error />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
