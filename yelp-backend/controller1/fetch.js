const Users = require("../models/User");
const Restaurants = require("../models/Restaurant");
const Events = require("../models/Event");
const Messages = require("../models/Messages");
const url = require("url");

async function fetchHomeBiz(req, res) {
	console.log("Inside Home Get request");
	console.log("req query", req.query);
	const { keyword, location } = url.parse(req.url, true).query;
	let menuData = [];
	try {
		const user = await Restaurants.find(
			{
				city: { $regex: `${location}`, $options: 'i' },
				"menu.dishname": { $regex: `${keyword}`, $options: 'i' },
			},
			function (error, data) {
				if (error) {
					console.log("error", error);
					res.json(500).send(error);
				} else {
					const tempObj = {};
					for (var i = 0; i < data.length; i++) {
						issearch = 1;
						tempObj.name = data[i].name;
						tempObj.restauarantid = data[i]._id;
						for(var j = 0; j< data[i].menu.length; j++) {
							console.log('inside j loop');
							if(data[i].menu[j].dishname.toLowerCase() === keyword.toLowerCase()) {
								console.log('inside if condition');
								console.log(data[i].menu[j].dishname);
								tempObj.dishname = data[i].menu[j].dishname;
								tempObj.price = data[i].menu[j].price;
								
							}	
													;
						}
						menuData.push(tempObj)	
					}								
					res.status(200).json(menuData);
				}
			}
		);
	} catch (error) {
		res.status(500).send(error);
	}
}

async function fetchUser(req, res) {
	console.log("Inside User Profile Get request");
	try {
		const user = await Users.findOne({ _id: req.query.userId }, function (
			error,
			data
		) {
			if (error) {
				console.log("error", error);
				res.json(500).send(error);
			} else {
				console.log("data", data);
				res.status(200).json(data);
			}
		});
	} catch (error) {
		res.status(500).send(error);
	}
}

async function fetchUsersList(req, res) {
	console.log("Inside User List Search Get request");
	const { SearchKey, PageNo } = url.parse(req.url, true).query;
	console.log(PageNo);
	let resultData = [];
	const userResult = [];
	if (SearchKey.length === 0) {
		const userResults = await Users.find()
			.limit(5)
			.skip(PageNo * 5)
			.exec();
		const count = await Users.find().countDocuments();
		const noOfPages = Math.ceil(count / 5);
		for (let i = 0; i < userResults.length; i += 1) {
			const ID = userResults[i]._id;
			const tempObj = {};
			tempObj.userid = userResults[i]._id;
			tempObj.firstname = userResults[i].firstname;
			tempObj.lastname = userResults[i].lastname;
			tempObj.dateofbirth = userResults[i].dateofbirth;
			tempObj.city = userResults[i].city;
			tempObj.state = userResults[i].state;
			tempObj.country = userResults[i].country;
			tempObj.nickname = userResults[i].nickname;
			tempObj.gender = userResults[i].gender;
			tempObj.emailid = userResults[i].emailid;
			tempObj.phonenumber = userResults[i].phonenumber;
			tempObj.yelpingsince = userResults[i].yelpingsince;
			tempObj.thingsilove = userResults[i].thingsilove;
			tempObj.findmein = userResults[i].findmein;
			// eslint-disable-next-line no-await-in-loop
			userResult.push(tempObj);
		}
		console.log(userResult);
		resultData = [userResult, count, noOfPages];
		res.writeHead(200, {
			"Content-Type": "application/json",
		});
		res.end(JSON.stringify(resultData));
	} else if (SearchKey.length !== 0) {
		const userResults = await Users.find({
			firstname: { $regex: `${SearchKey}`, $options: "i" },
		})
			.limit(5)
			.skip(PageNo * 5)
			.exec();
		const count = await Users.find().countDocuments({
			firstname: { $regex: `${SearchKey}`, $options: "i" },
		});
		const noOfPages = Math.ceil(count / 5);
		for (let i = 0; i < userResults.length; i += 1) {
			//const ID = userResults[i].CompanyID;
			const tempObj = {};
			tempObj.userid = userResults[i]._id;
			tempObj.firstname = userResults[i].firstname;
			tempObj.lastname = userResults[i].lastname;
			tempObj.dateofbirth = userResults[i].dateofbirth;
			tempObj.city = userResults[i].city;
			tempObj.state = userResults[i].state;
			tempObj.country = userResults[i].country;
			tempObj.nickname = userResults[i].nickname;
			tempObj.gender = userResults[i].gender;
			tempObj.emailid = userResults[i].emailid;
			tempObj.phonenumber = userResults[i].phonenumber;
			tempObj.yelpingsince = userResults[i].yelpingsince;
			tempObj.thingsilove = userResults[i].thingsilove;
			tempObj.findmein = userResults[i].findmein;
			// eslint-disable-next-line no-await-in-loop
			userResult.push(tempObj);
		}
		resultData = [userResult, count, noOfPages];
		res.writeHead(200, {
			"Content-Type": "application/json",
		});
		console.log("result data", resultData);
		res.end(JSON.stringify(resultData));
	}
}

async function fetchBiz(req, res) {
	console.log("Inside Restaurant fetch request");
	//console.log(req.query.restaurantId);
	try {
		const user = await Restaurants.findOne(
			{ _id: req.query.restaurantId },
			function (error, data) {
				if (error) {
					res.json(500).send(error);
				} else {
					res.status(200).json(data);
				}
			}
		);
	} catch (error) {
		res.status(500).send(error);
	}
}

async function fetchEvent(req, res) {
	console.log("Inside event fetch request");
	console.log(req.query.restaurantId);
	const eventdata = [];
	try {
		await Events.find({ restaurantId: req.query.restaurantId }, function (
			error,
			data
		) {
			if (error) {
				res.json(500).send(error);
			} else {
				console.log(data);
				for (let i = 0; i < data.length; i += 1) {
					const tempObj = {};
					let formatdate = "";
					tempObj.name = data[i].name;
					tempObj.time = data[i].time;
					formatdate = data[i].date;
					let year = formatdate.getFullYear();
					let month = formatdate.getMonth() + 1;
					let dt = formatdate.getDate();

					if (dt < 10) {
						dt = "0" + dt;
					}
					if (month < 10) {
						month = "0" + month;
					}
					tempObj.date = year+'-' + month + '-'+dt;
					tempObj.location = data[i].location;
					tempObj.restaurantId = data[i].restaurantId;
					tempObj.usersregistered = data[i].usersregistered;
					// eslint-disable-next-line no-await-in-loop
					eventdata.push(tempObj);
				}
				console.log(eventdata);

				res.writeHead(200, {
					"Content-Type": "application/json",
				});
				res.end(JSON.stringify(eventdata));
			}
		});
	} catch (error) {
		res.status(500).send(error);
	}
}

async function fetchEvents(req, res) {
	console.log("Inside event fetch request");
	const eventdata = [];
	//console.log(req.query.restaurantId);
	try {
		const user = await Events.find(function (error, data) {
			if (error) {
				res.json(500).send(error);
			} else {
				for (let i = 0; i < data.length; i += 1) {
					const tempObj = {};
					let formatdate = "";
					tempObj.name = data[i].name;
					tempObj.time = data[i].time;
					formatdate = data[i].date;
					let year = formatdate.getFullYear();
					let month = formatdate.getMonth() + 1;
					let dt = formatdate.getDate();

					if (dt < 10) {
						dt = "0" + dt;
					}
					if (month < 10) {
						month = "0" + month;
					}
					tempObj.date = year+'-' + month + '-'+dt;
					tempObj.location = data[i].location;
					tempObj.restaurantId = data[i].restaurantId;
					tempObj.usersregistered = data[i].usersregistered;
					// eslint-disable-next-line no-await-in-loop
					eventdata.push(tempObj);
				}
				console.log(eventdata);

				res.writeHead(200, {
					"Content-Type": "application/json",
				});
				res.end(JSON.stringify(eventdata));
			}
		});
	} catch (error) {
		res.status(500).send(error);
	}
}

async function fetchMessages(req, res) {
	console.log("Inside message fetch request");
	const messagedata = [];
	//console.log(req.query.restaurantId);
	try {
		const message = await Messages.find(function (error, data) {
			if (error) {
				res.json(500).send(error);
			} else {
				for (let i = 0; i < data.length; i += 1) {
					const tempObj = {};		
					//const tempMessage = [];	
					tempObj.id = data[i]._id,										
					tempObj.user = data[i].user;
					tempObj.userid = data[i].userid;
					tempObj.restaurant = data[i].restaurant;					
					tempObj.restaurantid = data[i].restaurantid;
					tempObj.date = data[i].date;
					tempObj.messages = data[i].messages;
					// for(let j = 0; j < (data[i].messages).length; j++ ) {
					// 	tempObj.messages.message = data[i].messages[j].message;
					// 	tempObj.messages.role = data[i].messages[j].role;
					// }
					// eslint-disable-next-line no-await-in-loop
					messagedata.push(tempObj);
				}
				console.log(messagedata);

				res.writeHead(200, {
					"Content-Type": "application/json",
				});
				res.end(JSON.stringify(messagedata));
			}
		});
	} catch (error) {
		res.status(500).send(error);
	}
}

module.exports = {
	fetchHomeBiz,
	fetchUser,
	fetchBiz,
	fetchEvent,
	fetchEvents,
	fetchUsersList,
	fetchMessages
};
