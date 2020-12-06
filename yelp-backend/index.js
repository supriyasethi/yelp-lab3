//import the require dependencies
"use strict";
var express = require("express");
var app = express();
const { graphqlHTTP } = require("express-graphql");

var bodyParser = require("body-parser");
const multer = require("multer");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var cors = require("cors");
const restaurantSchema = require('./graphql/typeDefs/restaurant');
const restaurantResolver = require('./controller/fetch');
const insertResolver = require('./controller/insert');
const updateResolver = require('./controller/update');

//var redis = require('redis');
//var connectRedis = require('connect-redis');
var auth = require("./middleware/auth");
var fileupload = require("express-fileupload");
const { mongoDB, frontendURL, secret } = require("./utils/config");
const mongoose = require("mongoose");

app.use(fileupload());

app.use(
	"/graphql",
	graphqlHTTP({
    schema: restaurantSchema,
    rootValue: updateResolver,
    graphiql: true,
	})
);
		// rootValue: {
    //   // events: async () => {
    //   //   return (await Event.find({}).toArray()).map(prepare)
    //   // },
		// 	events: () => {
		// 		return Event.find({})
		// 			.then((events) => {            
		// 				 return events.map((event) => {
    //            return { ...event._doc };               
		// 				 });
		// 			})
		// 			.catch((error) => {
		// 				throw error;
		// 			});
		// 	},
		// 	createEvent: (args) => {
		// 		// const event  = {
		// 		//   _id: Math.random().toString(),
		// 		//   name: args.eventInput.name,
		// 		//   description: args.eventInput.description,
		// 		//   time: args.eventInput.time,
		// 		//   date: args.eventInput.date,
		// 		//   location: args.eventInput.location,
		// 		//   restaurantId: args.eventInput.restaurantId
		// 		// };
		// 		const event = new Event({
		// 			name: args.eventInput.name,
		// 			description: args.eventInput.description,
		// 			time: args.eventInput.time,
		// 			date: args.eventInput.date,
		// 			location: args.eventInput.location,
		// 			hashtags: args.eventInput.hashtags,
		// 			restaurantId: args.eventInput.restaurantId,
		// 		});
		// 		return event
		// 			.save()
		// 			.then((response) => {
		// 				console.log(response);
		// 				return { ...response._doc };
		// 			})
		// 			.catch((error) => {
		// 				console.log(error);
		// 				throw error;
		// 			});
		// 	},
		// },
		

//if you run behind a proxy (eg nginx)
//app.set("trust proxy", 1);

// var RedisStore = connectRedis(session);
// var redisClient = redis.createClient({
//   port : 6379,
//   host: 'localhost'
// })

app.set("view engine", "ejs");

//use cors to allow cross origin resource sharing
app.use(cors({ origin: frontendURL, credentials: true }));
//app.use(cors({ origin: true, credentials: true }));

//use express session to maintain session data
app.use(
	session({
		//store               : new RedisStore({client: redisClient}),
		secret: secret,
		resave: true, // Forces the session to be saved back to the session store, even if the session was never modified during the request
		saveUninitialized: true, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
		duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
		activeDuration: 5 * 60 * 1000,
		name: "cookie",
		cookie: {
			secure: false, //if true, only transmits cookie over https
			httpOnly: false, // if true: prevents client side JS from reading the cookie
			maxAge: 1000 * 60 * 30, // session max age in milliseconds
		},
	})
);

app.use(bodyParser.json());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(require("connect").bodyParser());

//Allow Access Control
app.use(function (req, res, next) {
	//res.setHeader('Access-Control-Allow-Origin', 'http://54.219.75.46:3000');
	res.setHeader("Access-Control-Allow-Origin", frontendURL);
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET,HEAD,OPTIONS,POST,PUT,DELETE"
	);
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
	);
	res.setHeader("Cache-Control", "no-cache");
	next();
});

var options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	poolSize: 500,
	bufferMaxEntries: 0,
};

mongoose.connect(mongoDB, options, (err, res) => {
	if (err) {
		console.log(err);
		console.log(`MongoDB Connection Failed`);
	} else {
		console.log(`MongoDB Connected`);
	}
});

//creating the routes
const Login = require("./routes/Login");
const Signup = require("./routes/Signup");
app.use("/login", Login);
app.use("/signup", Signup);
// //app.use(auth);
const Update = require("./routes/Update");
const Insert = require("./routes/Insert");
const Fetch = require("./routes/Fetch");

app.use("/update", Update);
app.use("/insert", Insert);
app.use("/get", Fetch);

// SET STORAGE
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads");
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + "-" + Date.now());
	},
});

var upload = multer({ storage: storage });

app.post("/upload", upload.single("myFile"), (req, res, next) => {
	const file = req.file;
	if (!file) {
		const error = new Error("Please upload a file");
		error.httpStatusCode = 400;
		return next(error);
	}
	res.send(file);
});

//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");

module.exports = app;
