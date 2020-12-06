const graphql = require("graphql");

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull,
} = graphql;

const Order = new GraphQLObjectType({
	name: "Order",
	fields: () => ({
		id: { type: GraphQLID },
		restaurantid: { type: GraphQLString },
		restaurantname: { type: GraphQLString },
		orderitem: { type: GraphQLString },
		delieveryoption: { type: GraphQLString },
		delieverystatus: { type: GraphQLString },
		orderstatus: { type: GraphQLString },
	}),
});

const Review = new GraphQLObjectType({
	name: "Review",
	fields: () => ({
		id: { type: GraphQLID },
		restaurantid: { type: GraphQLString },	
		review: { type: GraphQLString },
		rating: { type: GraphQLString },
	}),
});

const User = new GraphQLObjectType({
	name: "User",
	fields: () => ({
		id: { type: GraphQLID },
		firstname: { type: GraphQLString },
		lastname: { type: GraphQLString },
		dateofbirth: { type: GraphQLString },
		city: { type: GraphQLString },
		state: { type: GraphQLString },
		country: { type: GraphQLString },
		nickname: { type: GraphQLString },
		gender: { type: GraphQLString },
		emailid: { type: GraphQLString },
		phonenumber: { type: GraphQLString },
		yelpingsince: { type: GraphQLString },
		thingsilove: { type: GraphQLString },
		findmein: { type: GraphQLString },
		order: { type: new GraphQLList(Order) },
		review: { type: new GraphQLList(Review) },
	}),
});

module.exports.User = { User };
