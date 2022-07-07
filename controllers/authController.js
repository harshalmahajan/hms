import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";

import { ROLE_TYPE } from "../constants/constant.js";
import Patient from "../models/Patient.js";
import Doctor from "../models/Doctor.js";

const register = async (req, res) => {
	const {
		fname,
		lname,
		contact,
		email,
		gender,
		password,
		userType,
		username,
		spec,
		docfees,
	} = req.body;

	if (!userType) {
		throw new BadRequestError("User Type is invalid");
	}

	let userAlreadyExists = null;

	if (userType == ROLE_TYPE.PATIENT) {
		console.log("req.body..", req.body);
		if (!fname || !lname || !contact || !email || !password) {
			throw new BadRequestError("please provide all values");
		}
		userAlreadyExists = await Patient.findOne({ email });
	} else if (userType == ROLE_TYPE.DOCTOR) {
		if (!username || !email || !spec || !docfees || !password) {
			throw new BadRequestError("please provide all values");
		}
		userAlreadyExists = await Doctor.findOne({ email });
	} else {
		throw new BadRequestError("User Type is invalid");
	}
	//  else if (userType == ROLE_TYPE.ADMIN) {
	// 	userAlreadyExists = await Patient.findOne({ email });
	// }

	if (userAlreadyExists) {
		throw new BadRequestError("Email already in use");
	}

	let user = null;
	if (userType == ROLE_TYPE.PATIENT) {
		user = await Patient.create({
			fname,
			lname,
			contact,
			email,
			gender,
			password,
		});
	} else if (userType == ROLE_TYPE.DOCTOR) {
		user = await Doctor.create({
			username,
			contact,
			email,
			spec,
			docfees,
			password,
		});
	}

	const token = user.createJWT();

	user.password = undefined;
	res.status(StatusCodes.CREATED).json({
		data: user,
		token,
	});
};

const login = async (req, res) => {
	const { email, password, userType } = req.body;

	if (!email || !password) {
		throw new BadRequestError("Please provide all values");
	}

	if (!userType) {
		throw new BadRequestError("User Type is invalid");
	}

	let user = null;
	if (userType == ROLE_TYPE.PATIENT) {
		user = await Patient.findOne({ email }).select("+password");
	} else if (userType == ROLE_TYPE.DOCTOR) {
		user = await Doctor.findOne({ email }).select("+password");
	} else if (userType == ROLE_TYPE.ADMIN) {
		user = await Patient.findOne({ email }).select("+password");
	}

	if (!user) {
		throw new UnAuthenticatedError("Invalid Credentials");
	}

	const isPasswordCorrect = await user.comparePassword(password);

	if (!isPasswordCorrect) {
		throw new UnAuthenticatedError("Invalid Credentials");
	}

	const token = user.createJWT();

	user.password = undefined; // Do not return the password

	res.status(StatusCodes.OK).json({ data: user, token });
};

export { register, login };
