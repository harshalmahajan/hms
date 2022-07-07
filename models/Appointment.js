import mongoose from "mongoose";
import validator from "validator";

const AppointmentSchema = new mongoose.Schema({
	pId: {
		type: mongoose.Types.ObjectId,
		ref: "Patient",
		required: [true, "Please provide patient ID"],
	},
	fname: {
		type: String,
		required: [true, "Please provide first name"],
		minlength: 3,
		maxlength: 20,
		trim: true,
	},
	lname: {
		type: String,
		required: [true, "Please provide last name"],
		minlength: 3,
		maxlength: 20,
		trim: true,
	},
	email: {
		type: String,
		required: [true, "Please provide email"],
		validate: {
			validator: validator.isEmail,
			message: "Please provide a valid email",
		},
		// unique: true,
	},
	gender: {
		type: String,
		enum: ["Male", "Female"],
		// default: 'nothing',
	},
	contact: {
		type: Number,
		required: [true, "Please provide contact number"],
		minlength: 10,
		maxength: 10,
	},
	doctor: {
		type: mongoose.Schema.ObjectId,
		ref: "Doctor",
		required: [true, "Please provide doctor name"],
	},
	docFees: {
		type: Number,
		required: [true, "Please provide doctor name"],
		maxlength: 5,
		minlength: 1,
	},
	appDate: {
		type: Date,
		required: [false, "Please provide appointment date"],
		default: Date.now(),
	},
	appTime: {
		type: String,
		required: [false, "Please provide appointment time"],
		default: "10 AM",
	},
	appStatus: {
		type: Number,
		enum: [0, 1, 2, 3, 4],
		default: 1, // Active
	},
});

AppointmentSchema.pre(/^find/, function (next) {
	this.populate({
		path: "doctor",
		select: "username",
	});
	// this.populate('doctor')
	next();
});

export default mongoose.model("Appointment", AppointmentSchema);
