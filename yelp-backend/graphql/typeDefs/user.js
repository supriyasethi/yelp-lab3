const { buildSchema } = require("graphql");

module.exports = buildSchema(`
	type Order {
		_id: ID
		restaurantid: String 
		restaurantname: String
		orderitem: String
		delieveryoption: String
		delieverystatus: String
		orderstatus: String
	}

	type Review {
		_id: ID
		restaurantid: String		
		review: String
		rating: String
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

	type UserListOutput {
		user: [User]
				
	}
	
	type  RootQuery {
		fetchUsersList(SearchKey: String, PageNo: Int ):UserListOutput!
		fetchUser(userId:String): User!
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

	type insertOutput {
		statuscode: String
	}
	

	type RootMutation {			
		updateUser(updateUserInput: UpdateUserInput): User
		insertReview(reviewInput: ReviewInput): insertOutput
		insertOrder(orderInput: OrderInput): insertOutput			
	}

	schema {
		query: RootQuery
		mutation: RootMutation
	}
`)
