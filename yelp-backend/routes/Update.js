"use strict";
const express = require("express");
const router = express.Router();
//var kafka = require("../kafka/client");
var config = require("../utils/config");
const {
	updateUser,
	updateBiz,
	updateOrders	
} = require("../controller/update");

//Route to handle Post Update user profile Request Call
router.post("/userprofile", async (req, res) => {
	console.log("Inside update user profile route");
	const value = await updateUser(req, res);
	return value;
	// const data = {
	// 		api: "update_userprofile",
	// 		data: req.body,
	// 	};
	// 	kafka.make_request(config.update_topic, data, function (err, results) {
	// 		if (err) {
	// 			console.log("Inside err");
	// 			res.status(500);
	// 			res.json({
	// 				status: "error",
	// 				msg: "System Error, Try Again.",
	// 			});
	// 			res.end();
	// 		} else {
	// 			console.log("inside else of request");
	
	// 			res.status(results.status);
	// 			// res.json(results.data);
	// 			res.end(JSON.stringify(results.data));
	// 		}
	// 		return res;
	// 	});
});

//Route to handle Post Update biz profile Request Call
router.post("/bizprofile", async (req, res) => {
	console.log("Inside update user profile route");
	const value = await updateBiz(req, res);
	return value;
	// const data = {
	// 		api: "update_bizprofile",
	// 		data: req.body,
	// 	};
	// 	kafka.make_request(config.update_topic, data, function (err, results) {
	// 		if (err) {
	// 			console.log("Inside err");
	// 			res.status(500);
	// 			res.json({
	// 				status: "error",
	// 				msg: "System Error, Try Again.",
	// 			});
	// 			res.end();
	// 		} else {
	// 			console.log("inside else of request");
	
	// 			res.status(results.status);
	// 			// res.json(results.data);
	// 			res.end(JSON.stringify(results.data));
	// 		}
	// 		return res;
	// 	});
});

//Route to handle Post Update orders Request Call
router.post("/orders", async (req, res) => {
	console.log("Inside update user profile route");
	const value = await updateOrders(req, res);
	return value;
	// const data = {
	// 		api: "update_orders",
	// 		data: req.body,
	// 	};
	// 	kafka.make_request(config.update_topic, data, function (err, results) {
	// 		if (err) {
	// 			console.log("Inside err");
	// 			res.status(500);
	// 			res.json({
	// 				status: "error",
	// 				msg: "System Error, Try Again.",
	// 			});
	// 			res.end();
	// 		} else {
	// 			console.log("inside else of request");
	
	// 			res.status(results.status);
	// 			// res.json(results.data);
	// 			res.end(JSON.stringify(results.data));
	// 		}
	// 		return res;
	// 	});
});



module.exports = router;
