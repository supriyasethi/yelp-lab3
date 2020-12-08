const Users = require("../../models/User");
const Restaurants = require("../../models/Restaurant");
const Events = require("../../models/Event");
var passwordHash = require("password-hash");
const jwt = require("jsonwebtoken");
var passwordHash = require("password-hash");
const { secret } = require("../../utils/config");
const fs = require("fs");

async function loginUser(msg, res) {
	let LoginOutput = {};
	let message = msg.userLogin;
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
					expiresIn: 1008000,
				});
				LoginOutput = {
					token,
					message: "Login Successful",
				};
			}
		} else {
			LoginOutput = {
				token: "",
				message: "Invalid Credentials",
			};
		}
		return LoginOutput;
	} catch (error) {
		LoginOutput = {
			token: "",
			message: "Error Occured",
		};
		return LoginOutput;
	}
}

async function loginBiz(msg, res) {
	LoginOutput = {};
	let message = msg.restaurantLogin;
	try {
		const biz = await Restaurants.findOne({
			"login.username": message.username,
		});
		if (passwordHash.verify(message.password, biz.login.password)) {
			const payload = { _id: biz._id, username: biz.login.username };
			const token = jwt.sign(payload, secret, {
				expiresIn: 1008000,
			});
			LoginOutput = {
				token,
				message: "Login Successful",
			};
		} else {
			LoginOutput = {
				token: "",
				message: "Invalid Credentials",
			};
		}
		return LoginOutput;
	} catch (error) {
		LoginOutput = {
			token: "",
			message: "Error Occured",
		};
		return LoginOutput;
	}
}

async function fetchHomeBiz(msg, res) {
	let message = msg;
	const keyword = message.keyword;
	const location = message.location;
	let menuData = [];
	try {
		const user = await Restaurants.find(
			{
				city: { $regex: `${location}`, $options: "i" },
				"menu.dishname": { $regex: `${keyword}`, $options: "i" },
			},
			function (error, data) {
				if (error) {
					return error;
				} else {
					for (var i = 0; i < data.length; i++) {
						issearch = 1;

						for (var j = 0; j < data[i].menu.length; j++) {
							const tempObj = {};
							if (
								data[i].menu[j].dishname
									.toLowerCase()
									.includes(keyword.toLowerCase())
							) {
								tempObj.name = data[i].name;
								tempObj.restaurantid = data[i]._id;
								tempObj.dishname = data[i].menu[j].dishname;
								tempObj.price = data[i].menu[j].price;
								menuData.push(tempObj);
							}
						}
					}
				}
			}
		);

		return menuData;
	} catch (error) {
		return error;
	}
}

async function fetchUser(msg, res) {
	let message = msg;
	try {
		const user = await Users.findOne(
			{ _id: message.userId },
			function (error, data) {
				if (error) {
					return;
				} else {
				}
			}
		);

		return user;
	} catch (error) {
		return error;
	}
}

async function fetchBiz(msg, res) {
	let message = msg;
	try {
		const user = await Restaurants.findOne(
			{ _id: message.restaurantId },
			function (error, data) {
				if (error) {
					return error;
					res.json(500).send(error);
				} else {
				}
			}
		);
		return user;
	} catch (error) {
		return error;
	}
}

async function fetchEvent(msg, res) {
	let message = msg;

	const eventdata = [];
	try {
		let event = await Events.find(
			{ restaurantId: message.restaurantId },
			function (error, data) {
				if (error) {
					res.json(500).send(error);
				} else {
					for (let i = 0; i < data.length; i++) {
						const tempObj = {};

						tempObj.name = data[i].name;
						tempObj.time = data[i].time;

						tempObj.date = data[i].date;
						tempObj.location = data[i].location;
						tempObj.restaurantId = data[i].restaurantId;
						tempObj.usersregistered = data[i].usersregistered;
						eventdata.push(tempObj);
					}
				}
			}
		);

		return eventdata;
	} catch (error) {
		return error;
	}
}

async function insertEvent(msg, res) {
	let response = {};
	let insertOutput = {};

	let message = msg.eventInput;
	const eventdata = new Events({
		name: message.name,
		description: message.description,
		time: message.time,
		date: message.date,
		location: message.location,
		hashtags: message.hashtags,
		restaurantId: message.resid,
	});

	try {
		let event = await eventdata.save((error, data) => {
			if (error) {
				insertOutput.statuscode = "500";
			} else {
				insertOutput.statuscode = "200";
			}
		});

		return insertOutput;
		//return event;
	} catch (error) {
		insertOutput.statuscode = "500";
		return insertOutput;
	}
}

async function insertMenu(msg, res) {
	let insertOutput = {};
	let message = msg.menuInput;

	var insertmenu = {
		dishname: message.dishname,
		ingredients: message.ingredients,
		price: message.price,
		description: message.description,
		category: message.category,
	};

	try {
		const menu = await Restaurants.findOneAndUpdate(
			{ _id: message.resId },
			{ $addToSet: { menu: insertmenu } },
			function (error, data) {
				if (error) {
					insertOutput.statuscode = "500";
				} else {
					insertOutput.statuscode = "200";
					//return data.menu;
				}
			}
		).select("menu");

		return insertOutput;
	} catch (error) {
		insertOutput.statuscode = "500";
		return insertOutput;
	}
}

async function insertReview(msg, res) {
	let insertOutput = {};
	let message = msg.reviewInput;

	var insertreviewRestaurant = {
		userid: message.userid,
		username: message.username,
		review: message.review,
		rating: message.rating,
	};

	var insertreviewUser = {
		restaurantid: message.resid,
		review: message.review,
		rating: message.rating,
	};

	var query1 = { _id: message.resid };
	var query2 = { _id: message.userid };
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
		let response = { restaurantPromise, userPromise };
		insertOutput.statuscode = "200";
		return insertOutput;
	} catch (error) {
		insertOutput.statuscode = "500";
		return insertOutput;
	}
}

async function insertOrder(msg, res) {
	let insertOutput = {};
	let message = msg.orderInput;

	var insertorderRestaurant = {
		userid: message.userid,
		username: message.username,
		orderitem: message.orderitem,
		delieveryoption: message.delieveryoption,
		delieverystatus: message.delieverystatus,
		orderstatus: message.orderstatus,
	};

	var insertorderUser = {
		restaurantid: message.restaurantid,
		restaurantname: message.restaurantname,
		orderitem: message.orderitem,
		delieveryoption: message.delieveryoption,
		delieverystatus: message.delieverystatus,
		orderstatus: message.orderstatus,
	};

	var query1 = { _id: message.restaurantid };
	var query2 = { _id: message.userid };
	var update1 = {
		$addToSet: { orders: insertorderRestaurant },
	};
	var update2 = {
		$addToSet: { orders: insertorderUser },
	};
	var options = { safe: true, upsert: true, new: true };
	try {
		const restaurantPromise = await Restaurants.findOneAndUpdate(
			query1,
			update1,
			options
		);
		const userPromise = await Users.findOneAndUpdate(query2, update2, options);

		insertOutput.statuscode = "200";

		return restaurantPromise.orders;
	} catch (error) {
		insertOutput.statuscode = "500";
		return insertOutput;
	}
}

async function updateUser(msg, res) {
	let updateOutput = {};

	let message = msg.updateUserInput;
	try {
		const user = await Users.findOneAndUpdate(
			{ _id: message.userid },
			{
				$set: {
					firstname: message.firstname,
					lastname: message.lastname,
					dateofbirth: message.birthday,
					state: message.state,
					country: message.country,
					nickname: message.nickname,
					gender: message.gender,
					phonenumber: message.phonenumber,
					yelpingsince: message.yelpingsince,
					thingsilove: message.thingsilove,
					findmein: message.findmein,
				},
			},
			{ upsert: true },
			function (error, data) {
				if (error) {
					console.log("error", error);
					updateOutput.statuscode = "500";
				} else {
					console.log("data", data);
					updateOutput.statuscode = "200";
				}
			}
		);

		return updateOutput;
	} catch (error) {
		console.log("error", error);
		//return error;
		updateOutput.statuscode = "500";
		return updateOutput;
	}
}

async function updateBiz(msg, res) {
	let updateOutput = {};

	let message = msg.updateBizInput;
	try {
		const restaurant = await Restaurants.findOneAndUpdate(
			{ _id: message.restaurantId },
			{
				$set: {
					name: message.name,
					description: message.description,
					address: message.address,
					timing: message.timing,
					website: message.website,
					phonenumber: message.phonenumber,
				},
			},
			{ upsert: true },
			function (error, data) {
				if (error) {
					updateOutput.statuscode = "500";
				} else {
					updateOutput.statuscode = "200";
				}
			}
		);

		return updateOutput;
	} catch (error) {
		updateOutput.statuscode = "500";
		return updateOutput;
	}
}

async function updateOrders(msg, res) {
	let updateOutput = {};

	let message = msg.updateOrderInput;
	var query1 = { _id: message.resid, "orders._id": message.orderid };
	var query2 = {
		_id: message.userid,
		"orders._id": message.orderid,
	};
	var update = {
		$set: {
			"orders.$.delieverystatus": message.delieverystatus,
			"orders.$.orderstatus": message.orderstatus,
		},
	};
	try {
		const restaurantPromise = await Restaurants.findOneAndUpdate(
			query1,
			update
		);
		const userPromise = await Users.findOneAndUpdate(query2, update);

		return restaurantPromise.orders;
	} catch (error) {
		updateOutput.statuscode = "500";
		return updateOutput;
	}
}

async function singleUpload(parent, args) {
	return args.file.then((file) => {
		const { createReadStream, filename, mimetype } = file;

		const fileStream = createReadStream();

		fileStream.pipe(fs.createWriteStream(`./uploads/${filename}`));

		return file;
	});
}

module.exports = {
	loginUser,
	loginBiz,
	fetchHomeBiz,
	fetchUser,
	fetchBiz,
	fetchEvent,
	insertEvent,
	insertMenu,
	insertReview,
	insertOrder,
	updateUser,
	updateBiz,
	updateOrders,
	singleUpload,
};
