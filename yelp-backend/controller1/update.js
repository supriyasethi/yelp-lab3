var express = require("express");
const Users = require("../../kafka-backend/models/User");
const Restaurants = require("../../kafka-backend/models/Restaurant");

function updateUser(req, res) {
	console.log("Inside Update User Profile Post Request");
	console.log("Req Body : ", req.body);
	try {
		Users.findOneAndUpdate(
			{ _id: req.body.userid },
			{
				$set: {
					firstname: req.body.firstname,
					lastname: req.body.lastname,
					dateofbirth: req.body.birthday,					
					state: req.body.state,
					country: req.body.country,
					nickname: req.body.nickname,
					gender: req.body.gender,					
					phonenumber: req.body.phonenumber,
					yelpingsince: req.body.yelpingsince,
					thingsilove: req.body.thingsilove,
					findmein: req.body.findmein,
				},
			},
			{ upsert: true },
			function (error, data) {
				if (error) {
					console.log("error", error);
					res.json(500).send(error);
				} else {
					console.log("data", data);
					res.status(200).json(data);
				}
			}
		);
	} catch (error) {
		console.log("error", error);
		res.send(error);
	}
}

async function updateBiz(req, res) {
	console.log("Inside Update Restaurant Profile Post Request");
	console.log("Req Body : ", req.body);
	try {
		await Restaurants.findOneAndUpdate(
			{ _id: req.body.restaurantId },
			{
				$set: {
					name: req.body.name,					
					description: req.body.description,
					address: req.body.address,
					timing: req.body.timing,					
					website: req.body.website,
					phonenumber: req.body.phonenumber,
				},
			},
			{ upsert: true },
			function (error, data) {
				if (error) {
					console.log("error", error);
					res.json(500).send(error);
				} else {
					console.log("data", data);
					res.status(200).json(data);
				}
			}
		);
	} catch (error) {
		console.log("error", error);
		res.send(error);
	}
}

async function updateOrders(req, res) {
	console.log("Inside Update Order Profile Post Request");
	console.log("Req Body : ", req.body);

	var query1 = { _id: req.body.resid, "orders._id": req.body.orderid };
	var query2 = { _id: req.body.userid, "orders.restaurantid": req.body.resid };
	var update = {
		$set: {
			"orders.$.delieverystatus": req.body.delieverystatus,
			"orders.$.orderstatus": req.body.orderfilter,
		},
	};
	try {
		const restaurantPromise = await Restaurants.findOneAndUpdate(
			query1,
			update
		);
		const userPromise = await Users.findOneAndUpdate(query2, update);
		return res.status(200).json({ restaurantPromise, userPromise });
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
}

// async function updateMessages(req, res) {
// 	console.log("Inside Update Messages Post Request");
// 	console.log("Req Body : ", req.body);

// 	var query = { _id: req.body.messageid};	
// 	var update = {
// 		$addToSet: {
// 			"messages.$.message": req.body.messages.message,
// 			"messages.$.role": req.body.messages.role,
// 		},
// 	};
// 	try {
// 		const messagePromise = await Restaurants.findOneAndUpdate(
// 			query,
// 			update
// 		);		
// 		console.log(messagePromise);
// 		return res.status(200).json({ messagePromise});
// 	} catch (error) {	
// 		console.log(error)	;
// 		return res.status(500).json(err);
// 	}
// }
module.exports = {
	updateUser,
	updateBiz,
	updateOrders,
	//updateMessages
};
