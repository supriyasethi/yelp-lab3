"use strict";
const bcrypt = require("bcrypt");
var passwordHash = require("password-hash");
//const User = require("../models/User");
const User = require("../models/User");
const Restaurant = require("../models/Restaurant");

//function handle_request(msg, callback) {
async function signupUser(msg, res) {
	let response = {};
	// switch (msg.api) {
	// 	case "signup_user": {
	console.log("Inside Signup Post Request");
	console.log("Req Body : ", msg);
	let message = msg.body;
	try {
		User.findOne({ emailid: message.username }, (error, user) => {
			console.log("inside user find one");
			if (error) {
				console.log("inside error", error);
				res.writeHead(200,{
					'Content-Type' : 'text/plain'
				})
				  res.end("Signup successful!");
				// response.status = 500;
				// response.data = "Network Error";
				// callback(null, response);				
			}
			if (user) {
				console.log("inside user", user);
				res.writeHead(400,{
					'Content-Type' : 'text/plain'
				})
				  res.end("Email Already Exists");
				// response.status = 400;
				// response.data = "Email Already Exists";
				// callback(null, response);
			} else {
				let hashedPassword = passwordHash.generate(message.login.password);
				console.log(hashedPassword);
				const userdata = new User({
					firstname: message.firstname,
					lastname: message.lastname,
					dateofbirth: message.birthday,
					city: message.city,
					state: message.state,
					country: message.country,
					nickname: message.nickname,
					gender: message.gender,
					emailid: message.username,
					phonenumber: message.phonenumber,
					yelpingsince: message.yelpingsince,
					thingsilove: message.thingsilove,
					findmein: message.findmein,
					login: {
						username: message.login.username,
						password: hashedPassword,
					},
				});
				userdata.save((error, data) => {
					if (error) {
						console.log("error", error);
						res.writeHead(500,{
							'Content-Type' : 'text/plain'
						})
						  res.end(error);
						// response.status = 500;
						// response.data = error;
						// callback(null, response);
					} else if (data) {
						console.log("inside user data response", response);
						res.writeHead(200,{
							'Content-Type' : 'text/plain'
						})
						  res.end("User Created");
						// response.status = 200;
						// response.data = "User Created";
						// callback(null, response);
					}
				});
			}
		});
	} catch (error) {
		console.log(error);
		res.writeHead(500,{
			'Content-Type' : 'text/plain'
		})
		  res.end("Network Error");
		// response.status = 500;
		// response.data = "Network Error";
		// callback(null, response);
	}
	//break;
}

// case "signup_biz": {
async function signupBiz(msg, res) {
	console.log("Inside Signup Post Request");
	console.log("Req Body : ", msg);
	let message = msg.body;
	try {
		Restaurant.findOne({ emailid: message.username }, (error, bizuser) => {
			if (error) {
				console.log("inside error", error);
				res.writeHead(500,{
					'Content-Type' : 'text/plain'
				})
				  res.end("Network Error");
				// response.status = 500;
				// response.data = "Network Error";
				// callback(null, response);
			}
			if (bizuser) {
				console.log("inside user", bizuser);
				res.writeHead(400,{
					'Content-Type' : 'text/plain'
				})
				  res.end("Email Already Exists");
				// response.status = 400;
				// response.data = "Email Already Exists";
				// callback(null, response);
			} else {
				let hashedPassword = passwordHash.generate(message.login.password);
				console.log(hashedPassword);
				const bizdata = new Restaurant({
					name: message.name,
					city: message.city,
					description: message.description,
					address: message.address,
					timing: message.timing,
					emailid: message.username,
					website: message.website,
					phonenumber: message.phonenumber,
					login: {
						username: message.login.username,
						password: hashedPassword,
					},
				});
				bizdata.save((error, data) => {
					if (error) {
						console.log("inside user data error", error);
						res.writeHead(500,{
							'Content-Type' : 'text/plain'
						})
						  res.end(error);
						callback(err1, null);
					} else if (data) {
						console.log("inside user data response", data);
						res.writeHead(200,{
							'Content-Type' : 'text/plain'
						})
						  res.end("User Created");
						// response.status = 200;
						// response.data = "User Created";
						// callback(null, response);
					}
				});
			}
		});
	} catch (error) {
		console.log(error);
		res.writeHead(500,{
			'Content-Type' : 'text/plain'
		})
		  res.end("Network Error");
		// response.status = 500;
		// response.data = "Network Error";
		// callback(null, response);
	}
	//break;
}
//}
//}

module.exports = {
	//handle_request,
	signupUser,
	signupBiz,
};
