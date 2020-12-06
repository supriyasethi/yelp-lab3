//const graphql = require("graphql");
const { buildSchema } = require("graphql");

module.exports = buildSchema(`
	type Menu {		
		_id: ID
		dishname: String
		ingredients: String
		price: String
		description: String
		category: String		
	}

	type Order {
		_id: ID
		userid: String 
		username: String
		orderitem: String
		delieveryoption: String
		delieverystatus: String
		orderstatus: String
	}

	type Review {
		_id: ID
		userid: String
		username: String
		review: String
		rating: String
	}

	type Restaurant {
		_id: ID!
		name: String
		city: String
		description: String
		address: String
		timing: String
		emailid: String
		website: String
		phonenumber: String
		menu: [Menu]
		order: [Order]
		review: [Review]
	}

	type MenuOutput {
		name: String
		restauarantId: ID
		dishname: String
		price: String
	}
	
	type  RootQuery {
		fetchHomeBiz(keyword: String, location: String ): [MenuOutput!]
		fetchBiz(restaurantId:String): Restaurant!
	}

	input MenuInput {
		resId: String
		dishname: String,
		ingredients: String,
		price: String,
		description: String,
		category: String,
	}

	input ReviewInput {
		resid: String
		userid: String
		username: String
		review: String
		rating: String
	}

	input OrderInput {
		restaurantid: String
		restaurantname: String
		userid: String 
		username: String
		orderitem: String
		delieveryoption: String
		delieverystatus: String
		orderstatus: String
	}

	input UpdateBizInput {
		restaurantId: String
		name: String
		city: String
		description: String
		address: String
		timing: String
		emailid: String
		website: String
		phonenumber: String
	}

	input UpdateOrderInput {
		resid: String
		orderid: String
		userid: String 		
		deliverystatus: String
		orderfilter: String
	}

	type insertOutput {
		statuscode: String
	}
	type updateOutput {
		statuscode: String
	}
	type RootMutation {
		insertMenu(menuInput: MenuInput): insertOutput
		insertReview(reviewInput: ReviewInput): insertOutput
		insertOrder(orderInput: OrderInput): insertOutput
		updateBiz(updateBizInput: UpdateBizInput): Restaurant
		updateOrders(updateOrderInput: UpdateOrderInput): updateOutput
	}

	schema {
		query: RootQuery
		mutation: RootMutation
	}
`);

// const {
// 	GraphQLObjectType,
// 	GraphQLString,
// 	GraphQLSchema,
// 	GraphQLID,
// 	GraphQLInt,
// 	GraphQLList,
// 	GraphQLNonNull,
// } = graphql;

// const Menu = new GraphQLObjectType({
// 	name: "Menu",
// 	fields: () => ({
// 		id: { type: GraphQLID },
// 		dishname: { type: GraphQLString },
// 		ingredients: { type: GraphQLString },
// 		price: { type: GraphQLString },
// 		description: { type: GraphQLString },
// 		category: { type: GraphQLString },
// 	}),
// });
// const Order = new GraphQLObjectType({
// 	name: "Order",
// 	fields: () => ({
// 		id: { type: GraphQLID },
// 		userid: { type: GraphQLString },
// 		username: { type: GraphQLString },
// 		orderitem: { type: GraphQLString },
// 		delieveryoption: { type: GraphQLString },
// 		delieverystatus: { type: GraphQLString },
// 		orderstatus: { type: GraphQLString },
// 	}),
// });

// const Review = new GraphQLObjectType({
// 	name: "Review",
// 	fields: () => ({
// 		id: { type: GraphQLID },
// 		userid: { type: GraphQLString },
// 		username: { type: GraphQLString },
// 		review: { type: GraphQLString },
// 		rating: { type: GraphQLString },
// 	}),
// });

// const Restaurant = new GraphQLObjectType({
// 	name: "Restaurant",
// 	fields: () => ({
// 		id: { type: GraphQLID },
// 		name: { type: GraphQLString },
// 		city: { type: GraphQLString },
// 		description: { type: GraphQLString },
// 		address: { type: GraphQLString },
// 		timing: { type: GraphQLString },
// 		emailid: { type: GraphQLString },
// 		website: { type: GraphQLString },
// 		phonenumber: { type: GraphQLString },
// 		menu: { type: new GraphQLList(Menu) },
// 		order: { type: new GraphQLList(Order) },
// 		review: { type: new GraphQLList(Review) },
// 	}),
// });

// module.exports.Restaurant = { Restaurant };
