"use strict";
const express = require("express");
const router = express.Router();
//var kafka = require("../kafka/client");
var config = require("../utils/config");
const {
	fetchHomeBiz,
	fetchBiz,
	fetchUser,
	fetchEvent,
	fetchEvents,
	fetchUsersList,
	fetchMessages,
} = require("../controller/fetch");
const { checkAuth } = require("../utils/passport");

router.get("/home", async (req, res) => {
	console.log("Inside fetch home biz route");
	const value = await fetchHomeBiz(req, res);
	return value;
	// const data = {
	// 		api: "fetch_home",
	// 		data: req.query			
	// 	};
	// 	kafka.make_request(config.fetch_topic, data, function (err, results) {
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

router.get("/userp", async (req, res) => {
	console.log("Inside  user profile route");
	const value = await fetchUser(req, res);
	return value;
	// const data = {
	// 		api: "fetch_userp",
	// 		data: req.query,
	// 	};
	// 	kafka.make_request(config.fetch_topic, data, function (err, results) {
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

router.get("/users", async (req, res) => {
	console.log("Inside user list route");
	const value = await fetchUsersList(req, res);
	return value;
	// const data = {
	// 		api: "fetch_users",
	// 		data: req.query,
	// 	};
	// 	kafka.make_request(config.fetch_topic, data, function (err, results) {
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

router.get("/bizp", async (req, res) => {
	console.log("Inside restaurant profile route");
	const value = await fetchBiz(req, res);
	return value;
	// const data = {
	// 		api: "fetch_bizp",
	// 		data: req.query,
	// 	};
	// 	kafka.make_request(config.fetch_topic, data, function (err, results) {
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

router.get("/event", async (req, res) => {
	console.log("Inside fetch event route");
	const value = await fetchEvent(req, res);
	return value;
	// const data = {
	// 		api: "fetch_event",
	// 		data: req.query,
	// 	};
	// 	kafka.make_request(config.fetch_topic, data, function (err, results) {
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

router.get("/events", async (req, res) => {
	console.log("Inside fetch events route");
	const value = await fetchEvents(req, res);
	return value;
	// const data = {
	// 		api: "fetch_events",
	// 		data: req.query,
	// 	};
	// 	kafka.make_request(config.fetch_topic, data, function (err, results) {
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

router.get("/menu", async (req, res) => {
	console.log("Inside fetch events route");
	const value = await fetchEvents(req, res);
	return value;
	// const data = {
	// 		api: "fetch_menu",
	// 		data: req.query,
	// 	};
	// 	kafka.make_request(config.fetch_topic, data, function (err, results) {
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

router.get("/messages", async (req, res) => {
	console.log("Inside fetch messages route");
	const value = await fetchMessages(req, res);
	return value;
	// const data = {
	// 		api: "fetch_messages",
	// 		data: req.query,
	// 	};
	// 	kafka.make_request(config.fetch_topic, data, function (err, results) {
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
