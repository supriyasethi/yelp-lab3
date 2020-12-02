"use strict";
const express = require("express");
const jwt = require('jsonwebtoken');
const { secret } = require('../utils/config');
const { auth } = require("../utils/passport");
var passwordHash = require('password-hash');
const Users = require('../models/User');
const Restaurants = require('../models/Restaurant');
auth();

async function loginUser(req,res) {
    console.log("Inside Login Post Request");  
  console.log("Req Body : ",req.body);    
  try {
		const user = await Users.findOne({ "login.username": req.body.username});
		console.log('user', user);
		if(user) {
		if(passwordHash.verify(req.body.password, user.login.password)) {              			
			const payload = { _id: user._id, username: user.login.username, firstname: user.firstname, lastname: user.lastname};			
            const token = jwt.sign(payload, secret, {
                expiresIn: 1008000
			});
            res.status(200).send({token: "JWT " + token, message: "Login Successful"});			
		} 
		else res.status(401).json({message: "Invalid Credentials"});
		}
		else {
			res.status(401).json({message: "User is not registered!"});
		}
	}	
	catch(error) {		
		console.log(error);
		res.status(500).send(error);
	}

}

async function loginBiz(req,res) {
    console.log("Inside Login Post Request");  
  console.log("Req Body : ",req.body);  
  try {
		const biz = await Restaurants.findOne({ "login.username": req.body.username});
		console.log(biz);
		if(passwordHash.verify(req.body.password, biz.login.password)) {			           
			const payload = { _id: biz._id, username: biz.login.username};			
            const token = jwt.sign(payload, secret, {
                expiresIn: 1008000
			});
            res.status(200).send({token: "JWT " + token, message: "Login Successful"});				
		}
		else res.status(401).json({message: "Invalid Credentials"});
	}	
	catch(error) {		
		console.log(error);
		res.status(500).json({message:"Error Occured"});
	}  
}

module.exports = {
    loginUser,
    loginBiz
}