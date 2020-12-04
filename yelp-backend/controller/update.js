var express = require("express");
const Users = require("../../yelp-backend/models/User");
const Restaurants = require("../../yelp-backend/models/Restaurant");

//async function handle_request(msg, callback) {
function updateUser(msg, res) {
	let response = {};
	// switch (msg.api) {
	// 	case "update_userprofile": {
	console.log("Inside Update User Profile Post Request");
	console.log("Req Body : ", msg);
	let message = msg.body;
	try {
		Users.findOneAndUpdate(
			{ _id: message.userid },
			{
				$set: {
					firstname: message.firstname,
					lastname: message.lastname,
					dateofbirth: message.birthday,
					state: message.state,
					country: message.country,
					nickname: message.nickname,
					gender: message.gender,
					phonenumber: message.phonenumber,
					yelpingsince: message.yelpingsince,
					thingsilove: message.thingsilove,
					findmein: message.findmein,
				},
			},
			{ upsert: true },
			function (error, data) {
				if (error) {
					console.log("error", error);
					// response.status = 500;
					// response.data = "Network Error";
					// callback(null, response);
					res.json(500).send(error);
				} else {
					console.log("data", data);
					// response.status = 200;
					// response.data = data;
					// callback(null, response);
					res.status(200).json(data);
				}
			}
		);
	} catch (error) {
		console.log("error", error);
		// response.status = 500;
		// response.data = error;
		// callback(null, response);
		res.send(error);
	}
	//break;
}

function updateBiz(msg, res) {
	//case "update_bizprofile": {
	console.log("Inside Update Restaurant Profile Post Request");
	console.log("Req Body : ", msg);
	let message = msg.body;
	try {
		Restaurants.findOneAndUpdate(
			{ _id: message.restaurantId },
			{
				$set: {
					name: message.name,
					description: message.description,
					address: message.address,
					timing: message.timing,
					website: message.website,
					phonenumber: message.phonenumber,
				},
			},
			{ upsert: true },
			function (error, data) {
				if (error) {
					console.log("error", error);
					// response.status = 500;
					// response.data = error;
					// callback(null, response);
					res.json(500).send(error);
				} else {
					console.log("data", data);
					// response.status = 200;
					// response.data = data;
					// callback(null, response);
					res.status(200).json(data);
				}
			}
		);
	} catch (error) {
		console.log("error", error);
		// response.status = 500;
		// response.data = error;
		// callback(null, response);
		res.send(error);
	}
	//break;
}

//case "update_orders": {
async function updateOrders(msg, res) {
	console.log("Inside Update Order Profile Post Request");
	console.log("Req Body : ", msg);
	let message = msg.body;
	var query1 = { _id: message.resid, "orders._id": message.orderid };
	var query2 = {
		_id: message.userid,
		"orders.restaurantid": message.resid,
	};
	var update = {
		$set: {
			"orders.$.delieverystatus": message.delieverystatus,
			"orders.$.orderstatus": message.orderfilter,
		},
	};
	try {
		const restaurantPromise = await Restaurants.findOneAndUpdate(
			query1,
			update
		);
		const userPromise = await Users.findOneAndUpdate(query2, update);
		// response.status = 200;
		// response.data = { restaurantPromise, userPromise };
		// return callback(null, response);
		return res.status(200).json({ restaurantPromise, userPromise });
	} catch (error) {
		// response.status = 500;
		// response.data = error;
		// return callback(null, error);
		return res.status(500).json(error);
	}
	//break;
}
//}
//}

module.exports = {
	//handle_request,
	updateUser,
	updateBiz,
	updateOrders,
	//updateMessages
};
