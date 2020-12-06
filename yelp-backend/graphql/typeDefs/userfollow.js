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

const MessageRecieved = new GraphQLObjectType({
	name: "MessageRecieved",
	fields: () => ({
		id: { type: GraphQLID },
		message: { type: GraphQLString },
				role: { type: GraphQLString },
	}),
});

const UserFollow = new GraphQLObjectType({
	name: "UserFollow",
	fields: () => ({
		id: { type: GraphQLID },
		userid: { type: GraphQLString },
		firstname: { type: GraphQLString },
		lastname: { type: GraphQLString },
		city: { type: GraphQLString },
		state: { type: GraphQLString },
		yelpingsince: { type: GraphQLString },
		thingsilove: { type: GraphQLString },
		findmein: { type: GraphQLString },
	}),
});

module.exports.UserFollow = { UserFollow };
