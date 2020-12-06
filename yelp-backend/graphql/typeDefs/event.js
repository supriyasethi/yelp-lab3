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

const UserRegistered = new GraphQLObjectType({
	name: "UserRegistered",
	fields: () => ({
		id: { type: GraphQLID },
		userid: { type: GraphQLString },
		userfirstname: { type: GraphQLString },
		userlastname: { type: GraphQLString },
	}),
});

const Event = new GraphQLObjectType({
	name: "Event",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		description: { type: GraphQLString },
		time: { type: GraphQLString },
		date: { type: GraphQLString },
		location: { type: GraphQLString },
		hashtags: { type: GraphQLString },
		restaurantId: { type: GraphQLString },
		usersregistered: { type: new GraphQLList(UserRegistered) },		
	}),
});

module.exports.Event = { Event };
