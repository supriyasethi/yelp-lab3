const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var UserFollow = new Schema(
	{
		userid: { type: String, required: true },
		firstname: { type: String, required: true },
		lastname: { type: String, required: true },
		city: { type: String, required: false },
		state: { type: String, required: false },
		yelpingsince: { type: String, required: false },
		thingsilove: { type: String, required: false },
		findmein: { type: String, required: false },
	},
	{
		versionKey: false,
	}
);

const userFollowModel = mongoose.model("userfollow", UserFollow);
module.exports = userFollowModel;
