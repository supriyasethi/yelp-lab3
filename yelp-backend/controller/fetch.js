const Users = require("../models/User");
const Restaurants = require("../models/Restaurant");
const Events = require("../models/Event");
const Messages = require("../models/Messages");

// async function handle_request(msg, callback) {
// 	console.log("inside fetch request kafka");
async function fetchHomeBiz(msg, res) {
	let response = {};
	// switch (msg.api) {
	// 	case "fetch_home": {
	let message = msg.query;
	console.log("Inside Home Get request");
	console.log("req query", msg);
	const keyword = message.keyword;
	const location = message.location;
	//const { keyword, location } = url.parse(req.url, true).query;
	let menuData = [];
	try {
		const user = await Restaurants.find(
			{
				city: { $regex: `${location}`, $options: "i" },
				"menu.dishname": { $regex: `${keyword}`, $options: "i" },
			},
			function (error, data) {
				if (error) {
					console.log("error", error);
					// response.status = 500;
					// response.data = "Network Error";
					// callback(null, response);
					res.json(500).send(error);
				} else {
					const tempObj = {};
					for (var i = 0; i < data.length; i++) {
						issearch = 1;
						tempObj.name = data[i].name;
						tempObj.restauarantid = data[i]._id;
						for (var j = 0; j < data[i].menu.length; j++) {
							console.log("inside j loop");
							if (
								data[i].menu[j].dishname.toLowerCase() === keyword.toLowerCase()
							) {
								console.log("inside if condition");
								console.log(data[i].menu[j].dishname);
								tempObj.dishname = data[i].menu[j].dishname;
								tempObj.price = data[i].menu[j].price;
							}
						}
						menuData.push(tempObj);
					}
					console.log("data", data);
					// response.status = 200;
					// response.data = menuData;
					// callback(null, response);
					res.status(200).json(menuData);
				}
			}
		);
	} catch (error) {
		console.log("error", error);
		// response.status = 500;
		// response.data = error;
		// callback(null, response);
		res.status(500).send(error);
	}
	//			break;
}

// case "fetch_userp": {
// 			let message = msg.data;
async function fetchUser(msg, res) {
	console.log("Inside User Profile Get request");
	let message = msg.query;
	try {
		const user = await Users.findOne(
			{ _id: message.userId },
			function (error, data) {
				if (error) {
					console.log("error", error);
					// response.status = 500;
					// response.data = "Network Error";
					// callback(null, response);
					res.json(500).send(error);
				} else {
					console.log("data", data);
					// response.status = 200;
					// response.data = data;
					// callback(null, response);
					res.status(200).json(data);
				}
			}
		);
	} catch (error) {
		console.log("error", error);
		// response.status = 500;
		// response.data = error;
		// callback(null, response);
		res.status(500).send(error);
	}
	//break;
}

// case "fetch_users": {
// 	let message = msg.data;
async function fetchUsersList(msg, res) {
	console.log("Inside User List Search Get request");
	let message = msg.query;
	const SearchKey = message.SearchKey;
	const PageNo = message.PageNo;
	//const { SearchKey, PageNo } = url.parse(req.url, true).query;
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
		console.log("data", resultData);
		// response.status = 200;
		// response.data = JSON.stringify(resultData);
		// callback(null, response);
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
		console.log("data", resultData);
		// response.status = 200;
		// response.data = JSON.stringify(resultData);
		// callback(null, response);
		res.writeHead(200, {
			"Content-Type": "application/json",
		 });
		console.log("result data", resultData);
		res.end(JSON.stringify(resultData));
	}
	//break;
}

// case "fetch_menu": {
// 	let message = msg.data;
// 	//async function fetchUsersList(req, res) {
// 	console.log("Inside Menu get Get request");
// 	const restaurantId = message.restaurantId;
// 	const PageNo = message.PageNo;
// 	//const { SearchKey, PageNo } = url.parse(req.url, true).query;
// 	console.log(PageNo);
// 	let resultData = [];
// 	const menuResult = [];

// 	const menuResults = await Restaurants.find({ _id: restaurantId })
// 		.limit(5)
// 		.skip(PageNo * 5)
// 		.exec();
// 	console.log(menuResults.menu);
// 	for (var i = 0; i < menuResults.menu.length; i++) {
// 		count = count + 1;
// 	}
// 	//const count = await Restaurants.find().countDocuments({ _id: restaurantId });

// 	const noOfPages = Math.ceil(count / 5);
// 	const tempObj = {};
// 	console.log('menuresults', menuResults);
// 	for (var i = 0; i < menuResults.menu.length; i++) {
// 		issearch = 1;
// 		tempObj.name = menuResults.name;
// 		tempObj.restauarantid = menuResults._id;
// 		// for (var j = 0; j < menuResults[i].menu.length; j++) {
// 		// 	console.log("inside j loop");
// 			console.log(menuResults.menu[i].dishname);
// 			tempObj.dishname = menuResults.menu[i].dishname;
// 			tempObj.price = menuResults.menu[i].price;
// 		//}
// 	}
// 	menuResult.push(tempObj);
// 	resultData = [menuResult, count, noOfPages];
// 	console.log("data", menuResult);
// 	response.status = 200;
// 	response.data = resultData;
// 	callback(null, response);
// 	//res.status(200).json(menuData);

// 	break;
// }

// case "fetch_bizp": {
// 	let message = msg.data;
async function fetchBiz(msg, res) {
	console.log("Inside Restaurant fetch request");
	console.log(msg.query);
	let message = msg.query;
	try {
		const user = await Restaurants.findOne(
			{ _id: message.restaurantId },
			function (error, data) {
				if (error) {
					console.log("error", error);
					// response.status = 500;
					// response.data = "Network Error";
					// callback(null, response);
					res.json(500).send(error);
				} else {
					console.log("data", data);
					// response.status = 200;
					// response.data = data;
					// callback(null, response);
					res.status(200).json(data);
				}
			}
		);
	} catch (error) {
		console.log("error", error);
		// response.status = 500;
		// response.data = error;
		// callback(null, response);
		res.status(500).send(error);
	}
	//break;
}

// case "fetch_event": {

async function fetchEvent(msg, res) {
	let message = msg.query;
	console.log("Inside event fetch request");
	console.log(message.restaurantId);
	const eventdata = [];
	try {
		await Events.find(
			{ restaurantId: message.restaurantId },
			function (error, data) {
				if (error) {
					console.log("error", error);
					// response.status = 500;
					// response.data = error;
					// callback(null, response);
					res.json(500).send(error);
				} else {
					console.log(data);
					for (let i = 0; i < data.length; i++) {
						const tempObj = {};

						tempObj.name = data[i].name;
						tempObj.time = data[i].time;

						tempObj.date = data[i].date;
						tempObj.location = data[i].location;
						tempObj.restaurantId = data[i].restaurantId;
						tempObj.usersregistered = data[i].usersregistered;
						// eslint-disable-next-line no-await-in-loop
						eventdata.push(tempObj);
					}
					console.log(eventdata);
					// response.status = 200;
					// response.data = JSON.stringify(eventdata);
					// callback(null, response);
					res.status(200).send(eventdata);
				}
			}
		);
	} catch (error) {
		console.log("error", error);
		// response.status = 500;
		// response.data = error;
		// callback(null, response);
		res.status(500).send(error);
	}
	//break;
}

// case "fetch_events": {
// 	let message = msg.data;
async function fetchEvents(msg, res) {
	console.log("Inside event fetch request");
	const eventdata = [];
	let message = msg.query;
	//console.log(req.query.restaurantId);
	try {
		const user = await Events.find(function (error, data) {
			if (error) {
				console.log("error", error);
				// response.status = 500;
				// response.data = error;
				// callback(null, response);
				res.json(500).send(error);
			} else {
				console.log(data);
				for (let i = 0; i < data.length; i++) {
					const tempObj = {};
					let formatdate = "";
					tempObj.name = data[i].name;
					tempObj.time = data[i].time;
					tempObj.date = data[i].date;
					tempObj.location = data[i].location;
					tempObj.restaurantId = data[i].restaurantId;
					tempObj.usersregistered = data[i].usersregistered;
					// eslint-disable-next-line no-await-in-loop
					eventdata.push(tempObj);
				}
				console.log(eventdata);
				// response.status = 200;
				// response.data = JSON.stringify(eventdata);
				// callback(null, response);
				res.status(200).end(JSON.stringify(eventdata));
			}
		});
	} catch (error) {
		console.log("error", error);
		res.json(500).send(error);
		// response.status = 500;
		// response.data = error;
		// callback(null, response);
	}
	//break;
}

// case "fetch_messages": {
async function fetchMessages(msg, res) {
	console.log("Inside message fetch request");
	const messagedata = [];
	let message1 = msg.query;
	//let message1 = req.body;
	try {
		const message = await Messages.find(
			{
				$or: [
					{ restaurantId: message1.restaurantId },
					{ userId: message1.userId },
				],
			},
			function (error, data) {
				if (error) {
					console.log("error", error);
					// response.status = 500;
					// response.data = error;
					// callback(null, response);
					res.status(500).send(error);
				} else {
					for (let i = 0; i < data.length; i += 1) {
						const tempObj = {};
						(tempObj.id = data[i]._id), (tempObj.user = data[i].user);
						tempObj.userid = data[i].userid;
						tempObj.restaurant = data[i].restaurant;
						tempObj.restaurantid = data[i].restaurantid;
						tempObj.date = data[i].date;
						tempObj.messages = data[i].messages;
						messagedata.push(tempObj);
					}
					console.log(messagedata);
					// response.status = 200;
					// response.data = JSON.stringify(messagedata);
					// callback(null, response);
					res.status(200).send(JSON.stringify(messagedata));
				}
			}
		);
	} catch (error) {
		console.log("error", error);
		res.status(500).send(error);
		// response.status = 500;
		// response.data = error;
		// callback(null, response);
	}
	//break;
}
//}
//}

module.exports = {
	//handle_request,
	fetchHomeBiz,
	fetchUser,
	fetchBiz,
	fetchEvent,
	fetchEvents,
	fetchUsersList,
	fetchMessages,
};
