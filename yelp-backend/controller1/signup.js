"use strict";
const bcrypt = require('bcrypt');
var passwordHash = require('password-hash');
const User = require("../models/User");
const Restaurant = require("../models/Restaurant");


// async function handle_request(msg, callback){

// 	switch (msg.api) {
// 	case 'signup_user': {	
async function signupUser(msg, callback){
	
    console.log("Inside Signup Post Request");  
  	console.log("Req Body : ",msg);
  	let errmsg = '';
  let hashedPassword = passwordHash.generate(msg.body.login.password);	
    console.log(hashedPassword);
	const userdata = new User({
		firstname: msg.firstname,
		lastname: msg.lastname,
		dateofbirth: msg.birthday,
		city: msg.city,
		state: msg.state,
		country: msg.country,
		nickname: msg.nickname,
		gender: msg.gender,
		emailid: msg.username,
		phonenumber: msg.phonenumber,
		yelpingsince: msg.yelpingsince,
		thingsilove:msg.thingsilove,
		findmein: msg.findmein,
		login: {
			username: msg.login.username,
			password: hashedPassword,
		},
	});
	try {
		await User.findOne({emailid: msg.body.username}, (error, user) => {
			if(error) {
				response.status = 500;
				response.data = 'Network Error';
				callback(null, response);
			}
			if(user) {
				response.status = 400;
            	response.data = 'Email Already Exists';
            	callback(null, response);
			}
			else {
				userdata.save((error, data) => {
					if (error) {
						callback(null, error);					
					}  
					else {
						response.status = 201;
                   		response.data = 'User Created';
                    	callback(null, response);					
					}
				})
		}
	});        
} catch(err) {
	response.status = 500;
	response.data = 'Network Error';
	callback(null, response);
    }  
//	break;
}

	// case 'signup_biz': {	

//function handle_request_bizsignup(msg, callback){
async function signupBiz(msg, callback) {
	let errmsg = '';
    console.log("Inside Signup Post Request");  
    console.log("Req Body : ",msg);    
    let hashedPassword = passwordHash.generate(msg.body.login.password);	
    console.log(hashedPassword);
	const bizdata = new Restaurant({
		name: msg.name,
		city: msg.city,
		description: msg.description,
		address: msg.address,
		timing: msg.timing,		
		emailid: msg.username,
		website: msg.website,
		phonenumber: msg.phonenumber,		
		login: {
			username: msg.login.username,
			password: hashedPassword,
		},
	});
	try {
		await Restaurant.findOne({emailid: msg.body.username}, (error, bizuser) => {
			if(error) {
				//res.status(500).end();
				errmsg = 'DB not connected !';
				callback(500, errmsg);
			}
			if(bizuser) {
				errmsg = 'Username already exists!';
				callback(400, errmsg);
				//res.status(400).json({message: 'Username already exists!'})
			}
			else {
				bizdata.save((error, data) => {
					if (error) {
						callback(500,error);
						// res.writeHead(500, {
						// 	'Content-Type': 'text/plain'
						// })
						// res.send(error);
					}
					else {
						callback(null,data);
						// res.writeHead(200, {
						// 	'Content-Type': 'text/plain'
						// })
						// res.json(data);
					}
				})
		}
	});
 } catch(err) {
	 	callback(null,err);
        //res.json({message: err});
	}
	//break;
}
	

module.exports = {	
	//handle_request
    signupUser,
    signupBiz
}

