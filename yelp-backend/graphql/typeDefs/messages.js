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

const Messages = new GraphQLObjectType({
	name: "Messages",
	fields: () => ({
		id: { type: GraphQLID },
		user: { type: GraphQLString },
		userid: { type: GraphQLString },
		restaurant: { type: GraphQLString },
		restaurantid:{ type: GraphQLString },
		date: { type: GraphQLString },
		messages: { type: new GraphQLList(MessageRecieved) },		
	}),
});

module.exports.Messages = { Messages };
