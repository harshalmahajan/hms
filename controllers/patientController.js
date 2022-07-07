import { StatusCodes } from "http-status-codes";
import BadRequestError from "../errors/bad-request.js";
import Appointment from "../models/Appointment.js";

const createAppointment = async (req, res) => {
	console.log("createAppointment....", req.body);

	const {
		pId,
		fname,
		lname,
		gender,
		email,
		contact,
		doctor,
		docFees,
		appDate,
		appTime,
	} = req.body;

	if (
		!pId ||
		!fname ||
		!lname ||
		!gender ||
		!email ||
		!contact ||
		!doctor ||
		!docFees
	) {
		throw new BadRequestError("please provide all values");
	}

	const appointment = await Appointment.create({
		pId,
		fname,
		lname,
		gender,
		email,
		contact,
		doctor,
		docFees,
	});

	console.log("createAppointment....created", appointment);

	res.status(StatusCodes.CREATED).json({
		status: "success",
		mgs: "Appointment Create Successfully!",
		data: appointment,
	});
};

const getAllAppointment = async (req, res) => {
	console.log("getAllAppointment....", req.body);

	const { pId } = req.body;

	const result = await Appointment.find({ pId });
	console.log("All appointments", result);

	res.status(StatusCodes.OK).json({
		status: "success",
		// data: result.map((item)=> {
		// 	return {...item, doctorId: item.doctor._id, doctorName: item.doctor.username}
		// })
		data: result,
	});
};

export { createAppointment, getAllAppointment };
