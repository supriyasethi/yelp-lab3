const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var Event = new Schema(
	{
		name: { type: String, required: false },
		description: { type: String, required: false },
		time: { type: String, required: false },
		date: { type: String, required: false },
		location: { type: String, required: false },
		hashtags: { type: String, required: false },
		restaurantId: { type: String, required: false },
		usersregistered: [
			{
				userid: { type: String, required: false },
				userfirstname: { type: String, required: false },
				userlastname: { type: String, required: false },
			},
		],
	},
	{
		versionKey: false,
	}
);

const eventModel = mongoose.model("events", Event);
module.exports = eventModel;
