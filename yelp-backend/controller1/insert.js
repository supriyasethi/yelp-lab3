const Users = require("../models/User");
const Restaurants = require("../models/Restaurant");
const Events = require("../models/Event");
const UserFollows = require("../models/UserFollow");
const Messages = require("../models/Messages");

async function insertEvent(req, res) {
	console.log("Inside Insert Event Post Request");
	console.log("Req Body : ", req.body);

	const eventdata = new Events({
		name: req.body.eventname,
		description: req.body.description,
		time: req.body.time,
		date: req.body.date,
		location: req.body.location,
		hashtags: req.body.hashtags,
		restaurantId: req.body.resid,
	});

	try {
		await eventdata.save((error, data) => {
			if (error) {
				console.log("error", error);
				res.json(500).send(error);
			} else {
				console.log("data", data);
				res.status(200).json(data);
			}
		});
	} catch (err) {
		res.json({ message: err });
	}
}

async function userRegister(req, res) {
	var insertUserRegister = {
		userid: req.query.userid,
		userfirstname: req.body.firstname,
		userlastname: req.body.lastname,
	};
	var inserteventUser;

	console.log(insertUserRegister);
	try {
		await Events.findOneAndUpdate(
			{ _id: req.body.eventid },
			{ $addToSet: { usersregistered: insertUserRegister } },
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

async function userFollow(req, res) {
	const userfollowdata = new UserFollows({
		userid: req.body.userid,
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		city: req.body.city,
		state: req.body.state,
		yelpingsince: req.body.yelpingsince,
		thingsilove: req.body.thingsilove,
		findmein: req.body.findmein,
	});

	try {
		await UserFollows.findOne({ userid: req.body.userid }, (error, user) => {
			if (error) {
				res.status(500).end();
			}
			if (user) {
				res
					.status(200)
					.json({ message: "You are already following this user!" });
			} else {
				userfollowdata.save((error, data) => {
					if (error) {
						console.log("error", error);
						res.json(500).send(error);
					} else {
						console.log("data", data);
						res
							.status(200)
							.json({ message: "You are now following this user!" });
					}
				});
			}
		});
	} catch (err) {
		res.json({ message: err });
	}
}

async function insertMenu(req, res) {
	console.log("Inside Insert Menu Post Request");
	console.log("Req Body : ", req.body);
	console.log("Req Query : ", req.query);

	var insertmenu = {
		dishname: req.body.dishname,
		ingredients: req.body.ingredients,
		price: req.body.price,
		description: req.body.description,
		category: req.body.category,
	};
	console.log(insertmenu);
	try {
		await Restaurants.findOneAndUpdate(
			{ _id: req.body.resId },
			{ $addToSet: { menu: insertmenu } },
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

async function insertReview(req, res) {
	console.log("Inside Insert Reviews Post Request");
	console.log(req.body);
	var insertreviewRestaurant = {
		userid: req.body.userid,
		username: req.body.username,
		review: req.body.review,
		rating: req.body.rating,
	};

	var insertreviewUser = {
		restaurantid: req.body.resid,
		review: req.body.review,
		rating: req.body.rating,
	};
	console.log(insertreviewRestaurant);
	var query1 = { _id: req.body.resid };
	var query2 = { _id: req.body.userid };
	var update1 = {
		$addToSet: { reviews: insertreviewRestaurant },
	};
	var update2 = {
		$addToSet: { reviews: insertreviewUser },
	};
	var options = { safe: true, upsert: true };
	try {
		const restaurantPromise = await Restaurants.findOneAndUpdate(
			query1,
			update1,
			options
		);
		const userPromise = await Users.findOneAndUpdate(query2, update2, options);
		return res.status(200).json({ restaurantPromise, userPromise });
	} catch (error) {
		return res.status(500).json(err);
	}
}

async function insertOrder(req, res) {
	console.log("Inside Insert Order Post Request");
	console.log(req.body);

	var insertorderRestaurant = {
		userid: req.body.userid,
		username: req.body.username,
		orderitem: req.body.orderitem,
		delieveryoption: req.body.delieveryoption,
		delieverystatus: req.body.delieverystatus,
		orderstatus: req.body.orderstatus,
	};

	var insertorderUser = {
		restaurantid: req.body.resid,
		restaurantname: req.body.restaurantname,
		orderitem: req.body.orderitem,
		delieveryoption: req.body.delieveryoption,
		delieverystatus: req.body.delieverystatus,
		orderstatus: req.body.orderstatus,
	};
	console.log(insertorderRestaurant);
	var query1 = { _id: req.body.resid };
	var query2 = { _id: req.body.userid };
	var update1 = {
		$addToSet: { orders: insertorderRestaurant },
	};
	var update2 = {
		$addToSet: { orders: insertorderUser },
	};
	var options = { safe: true, upsert: true };
	try {
		const restaurantPromise = await Restaurants.findOneAndUpdate(
			query1,
			update1,
			options
		);
		const userPromise = await Users.findOneAndUpdate(query2, update2, options);
		return res.status(200).json({ restaurantPromise, userPromise });
	} catch (error) {
		return res.status(500).json(err);
	}
}

async function insertMessage(req, res) {
	console.log("Inside Insert Message Post Request");
	console.log("Req Body : ", req.body);

	const insertmessage = {
		message: req.body.messages.message,
		role: req.body.messages.role,
	};

	const messagedata = new Messages({
		messages: {
			message: req.body.messages.message,
			role: req.body.messages.role,
		},
		user: req.body.user,
		userid: req.body.userid,
		restaurant: req.body.restaurant,
		restaurantid: req.body.restaurantid,
		date: req.body.date,
	});

	try {
		await Messages.find({ _id: req.body.messageid },
			{userid: req.body.userid}, 
			{restaurantid: req.body.restaurantid}, 
			(error, message) => {
			if (error) {
				res.status(500).end();
				errmsg = "DB not connected !";
				//callback(500, errmsg);
			}
			if (message) {
				console.log(message);
				console.log("inside update only message");
				console.log(message.length);
				if (message.length > 0) {
					//updateOnlyMessage(insertmessage, req.body.messageid);
					Messages.findOneAndUpdate(
						{ _id: req.body.messageid },
						{ $addToSet: { messages: insertmessage } },
						{ safe: true, upsert: true },
						function (error, data) {
							if (error) {
								console.log("error", error);
								res.json(500).send(error);
							} else {
								console.log("data", data);
								res.status(200).end(JSON.stringify(data));
							}
						}
					);
				} else {
					console.log("inside error");
					messagedata.save((error, data) => {
						if (error) {
							console.log(error);
							res.writeHead(500, {
								"Content-Type": "text/plain",
							});
							res.send(error);
						} else {
							console.log(messagedata);
							//callback(null,data);
							console.log(data);
							res.writeHead(200, {
								"Content-Type": "text/plain",
							});
							res.json(data);
						}
					});
				}
			}
		});
	} catch (err) {
		console.log(err);
		//callback(null,err);
		//res.json({message: err});
	}
}




module.exports = {
	insertEvent,
	insertMenu,
	userRegister,
	insertReview,
	insertOrder,
	userFollow,
	insertMessage,
	
};
