"use strict";
const express = require("express");
const router = express.Router();
var config = require("../utils/config");
const {signupUser, signupBiz} = require('../controller/signup');
//var kafka = require("../kafka/client");

//Route to handle user Signup
router.post("/user", async (req, res) => {
	console.log("Inside user signup route");
	const value = await signupUser(req, res);	
	return value;
	// const data = {
	// 	api: "signup_user",
	// 	data: req.body,
	// };
	// kafka.make_request(config.signup_topic, data, function (err, results) {
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

//Route to handle restaurant Signup
router.post("/biz", async (req, res) => {
	console.log("Inside biz signup route");
	const value = await signupBiz(req, res);
	return value;
	// const data = {
	// 	api: "signup_biz",
	// 	data: req.body,
	// };
	// kafka.make_request(config.signup_topic, data, function (err, results) {
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
