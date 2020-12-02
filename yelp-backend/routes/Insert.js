"use strict";
const express = require("express");
const router = express.Router();
//var kafka = require("../kafka/client");
var config = require("../utils/config");
const {
	insertMenu,
	insertOrder,
	insertReview,
	insertEvent,
	userRegister,
	userFollow,
	insertMessage,
} = require("../controller/insert");

//Route to handle Post insertMenu Request Call
router.post("/menu", async (req, res) => {
	console.log("Inside insert menu route");
	const value = await insertMenu(req, res);
	return value;
	// const data = {
	// 	api: "insert_menu",
	// 	data: req.body,
	// };
	// kafka.make_request(config.insert_topic, data, function (err, results) {
	// 	if (err) {
	// 		console.log("Inside err");
	// 		res.status(500);
	// 		res.json({
	// 			status: "error",
	// 			msg: "System Error, Try Again.",
	// 		});
	// 		res.end();
	// 	} else {
	// 		console.log("inside else of request");

	// 		res.status(results.status);
	// 		// res.json(results.data);
	// 		res.end(JSON.stringify(results.data));
	// 	}
	// 	return res;
	// });
});

//Route to handle Post insert Orders Request Call
router.post("/order", async (req, res) => {
	console.log("Inside insert order route");
	const value = await insertOrder(req, res);
	return value;
	// const data = {
	// 	api: "insert_order",
	// 	data: req.body,
	// };
	// kafka.make_request(config.insert_topic, data, function (err, results) {
	// 	if (err) {
	// 		console.log("Inside err");
	// 		res.status(500);
	// 		res.json({
	// 			status: "error",
	// 			msg: "System Error, Try Again.",
	// 		});
	// 		res.end();
	// 	} else {
	// 		console.log("inside else of request");

	// 		res.status(results.status);
	// 		// res.json(results.data);
	// 		res.end(JSON.stringify(results.data));
	// 	}
	// 	return res;
	// });
});

//Route to handle Post insert Reviews Request Call
router.post("/review", async (req, res) => {
	console.log("Inside insert review route");
	const value = await insertReview(req, res);
	return value;
	// const data = {
	// 	api: "insert_review",
	// 	data: req.body,
	// };
	// kafka.make_request(config.insert_topic, data, function (err, results) {
	// 	if (err) {
	// 		console.log("Inside err");
	// 		res.status(500);
	// 		res.json({
	// 			status: "error",
	// 			msg: "System Error, Try Again.",
	// 		});
	// 		res.end();
	// 	} else {
	// 		console.log("inside else of request");

	// 		res.status(results.status);
	// 		// res.json(results.data);
	// 		res.end(JSON.stringify(results.data));
	// 	}
	// 	return res;
	// });
});

//Route to handle Post insert Events Request Call
router.post("/event", async (req, res) => {
	console.log("Inside insert event route");
	const value = await insertEvent(req, res);
	return value;
	// const data = {
	// 	api: "insert_event",
	// 	data: req.body,
	// };
	// kafka.make_request(config.insert_topic, data, function (err, results) {
	// 	if (err) {
	// 		console.log("Inside err");
	// 		res.status(500);
	// 		res.json({
	// 			status: "error",
	// 			msg: "System Error, Try Again.",
	// 		});
	// 		res.end();
	// 	} else {
	// 		console.log("inside else of request");

	// 		res.status(results.status);
	// 		// res.json(results.data);
	// 		res.end(JSON.stringify(results.data));
	// 	}
	// 	return res;
	// });
});

//Route to handle Post insert Events Request Call
router.post("/userregister", async (req, res) => {
	console.log("Inside insert event user register route");
	const value = await userRegister(req, res);
	return value;
	// const data = {
	// 	api: "insert_userregister",
	// 	data: req.body,
	// };
	// kafka.make_request(config.insert_topic, data, function (err, results) {
	// 	if (err) {
	// 		console.log("Inside err");
	// 		res.status(500);
	// 		res.json({
	// 			status: "error",
	// 			msg: "System Error, Try Again.",
	// 		});
	// 		res.end();
	// 	} else {
	// 		console.log("inside else of request");

	// 		res.status(results.status);
	// 		// res.json(results.data);
	// 		res.end(JSON.stringify(results.data));
	// 	}
	// 	return res;
	// });
});

//Route to handle Post insert Events Request Call
router.post("/userfollow", async (req, res) => {
	console.log("Inside insert user follow  route");
	const value = await userFollow(req, res);
	return value;
	// const data = {
	// 	api: "insert_userfollow",
	// 	data: req.body,
	// };
	// kafka.make_request(config.insert_topic, data, function (err, results) {
	// 	if (err) {
	// 		console.log("Inside err");
	// 		res.status(500);
	// 		res.json({
	// 			status: "error",
	// 			msg: "System Error, Try Again.",
	// 		});
	// 		res.end();
	// 	} else {
	// 		console.log("inside else of request");

	// 		res.status(results.status);
	// 		// res.json(results.data);
	// 		res.end(JSON.stringify(results.data));
	// 	}
	// 	return res;
	// });
});

//Route to handle Post insertMenu Request Call
router.post("/messages", (req, res) => {
	console.log("Inside insert message route");
	const value =  insertMessage(req, res);
	return value;
	// const data = {
	// 	api: "insert_messages",
	// 	data: req.body,
	// };
	// kafka.make_request(config.insert_topic, data, function (err, results) {
	// 	if (err) {
	// 		console.log("Inside err");
	// 		res.status(500);
	// 		res.json({
	// 			status: "error",
	// 			msg: "System Error, Try Again.",
	// 		});
	// 		res.end();
	// 	} else {
	// 		console.log("inside else of request");

	// 		res.status(results.status);
	// 		// res.json(results.data);
	// 		res.end(JSON.stringify(results.data));
	// 	}
	// 	return res;
	// });
});

module.exports = router;
