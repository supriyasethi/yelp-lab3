const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var Message = new Schema(
	{	
		user: { type: String, required: false },
		userid: { type: String, required: false },
		restaurant: { type: String, required: false },
		restaurantid: { type: String, required: false },
		date: { type: String, required: false },
		messages: [
			{
				message: { type: String, required: false },
				role: { type: String, required: false },
			},
		],
	},
	{
		versionKey: false,
	}
);

const messageModel = mongoose.model("messages", Message);
module.exports = messageModel;
