"use strict";
const express = require("express");
const jwt = require("jsonwebtoken");
const { secret } = require("../utils/config");
const { auth } = require("../utils/passport");
var passwordHash = require("password-hash");
const Users = require("../models/User");
const Restaurants = require("../models/Restaurant");
auth();

//async function handle_request(msg, callback) {
async function loginUser(msg, res) {
	let response = {};
	// switch (msg.api) {
	// 	case "login_user": {
	console.log("Inside Login Post Request");
	console.log("Req Body : ", msg.body);
	let message = msg.body;
	try {
		const user = await Users.findOne({
			"login.username": message.username,
		});
		if (user) {
			if (passwordHash.verify(message.password, user.login.password)) {
				const payload = {
					_id: user._id,
					username: user.login.username,
					firstname: user.firstname,
					lastname: user.lastname,
				};
				const token = jwt.sign(payload, secret, {
					expiresIn: 1008000
				});
				// response.status = 200;
				// response.data = payload;
				// callback(null, response);
				res
					.status(200)
					.send({ token: "JWT " + token, message: "Login Successful" });
			}
		} else {
			// response.status = 401;
			// response.data = "Invalid Credentials";
			// callback(null, response);
			res.status(401).json({ message: "Invalid Credentials" });
		}
	} catch (error) {
		console.log(error);
		// response.status = 500;
		// response.data = "Network Error";
		// callback(null, response);
		res.status(500).send(error);
	}
	//break;
}
// case "login_biz": {
async function loginBiz(msg, res) {
	console.log("Inside Login Post Request");
	console.log("Req Body : ", msg.body);
	let message = msg.body;
	try {
		const biz = await Restaurants.findOne({
			"login.username": message.username,
		});
		console.log(biz);
		if (passwordHash.verify(message.password, biz.login.password)) {
			const payload = { _id: biz._id, username: biz.login.username };
			const token = jwt.sign(payload, secret, {
				expiresIn: 1008000,
			});
			// response.status = 200;
			// response.data = payload;
			// callback(null, response);
			res
				.status(200)
				.send({ token: "JWT " + token, message: "Login Successful" });
		} else {
			// response.status = 401;
			// response.data = "Invalid Credentials";
			// callback(null, response);
			res.status(401).json({ message: "Invalid Credentials" });
		}
	} catch (error) {
		console.log(error);
		// response.status = 500;
		// response.data = "Network Error";
		// callback(null, response);
		res.status(500).json({ message: "Error Occured" });
	}
	//break;
}
//}
//}

module.exports = {
	//handle_request,
	loginUser,
	loginBiz,
};
