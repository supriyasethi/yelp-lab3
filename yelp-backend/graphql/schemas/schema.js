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

	type UserRegistered {
		_id: ID
		userid: String
		userfirstname: String
		userlastname: String
	}

	type Event {		
		_id: ID
		name: String
		description: String
		time: String
		date: String
		location: String
		hashtags:String
		restaurantId: String
		usersregistered: [UserRegistered]			
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
		orders: [Order]
		reviews: [Review]
	}

    type User {
		userid: ID!
		firstname: String
		lastname: String
		dateofbirth: String
		city: String
		state: String
		country: String
		nickname: String
		gender: String
		emailid: String
		phonenumber: String
		yelpingsince: String
		thingsilove: String
		findmein: String
		order: [Order]
		review: [Review]
	}
	

	type MenuOutput {
		name: String
		restaurantid: String
		dishname: String
		price: String
    }   
   
	
	type  RootQuery {
		fetchHomeBiz(keyword: String, location: String ): [MenuOutput!]
        fetchBiz(restaurantId:String): Restaurant!
        fetchUser(userId:String): User!
	}

	input MenuInput {
		resId: String
		dishname: String,
		ingredients: String,
		price: String,
		description: String,
		category: String,
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

	type insertOutput {
		statuscode: String
	}
	
	input UpdateOrderInput {
		resid: String
		orderid: String
		userid: String 		
		delieverystatus: String
		orderstatus: String
	}
	type updateOutput {
		statuscode: String
    }
    
    input UpdateUserInput {
		userid: String
		firstname: String
		lastname: String
		dateofbirth: String
		state: String
		country: String
		nickname: String
		gender: String
		phonenumber: String
		yelpingsince: String
		thingsilove: String
		findmein: String		
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

	input EventInput {
		name: String
		description: String
		time: String
		date: String
		location: String
		hashtags: String
		resid: String
	}
	
	type MenuOutput1 {
		_id: String
		menu: [Menu]
	}
	type RootMutation {
		insertMenu(menuInput: MenuInput): MenuOutput1
		insertEvent(eventInput: EventInput)	: Event 
		updateBiz(updateBizInput: UpdateBizInput): Restaurant	
        updateOrders(updateOrderInput: UpdateOrderInput): [Order]	
        updateUser(updateUserInput: UpdateUserInput): User
		insertReview(reviewInput: ReviewInput): insertOutput
		insertOrder(orderInput: OrderInput): [Order]
	}

	schema {
		query: RootQuery
		mutation: RootMutation
	}
`);
