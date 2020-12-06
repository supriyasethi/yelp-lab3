buildSchema(`
    type Event {
      _id: ID!
      name: String!
      description: String!
      time: String!
      date: String!
      location: String!
      hashtags: String!
      restaurantId: String!      
    }

    type Restaurant {
      name: { type: String, required: true },
		city: { type: String, required: false },
		description: { type: String, required: false },
		address: { type: String, required: false },
		timing: { type: String, required: false },
		emailid: { type: String, required: false },
		website: { type: String, required: false },
		phonenumber: { type: String, required: true },
		login: {
			username: { type: String, required: true },
			password: { type: String, required: true },
		},
    }

    input EventInput {
      name: String
      description: String
      time: String
      date: String
      location: String
      hashtags: String
      restaurantId: String
    }

    

    type Restaurant

    type  RootQuery {
      events: [Event!]  
    }

    type RootMutation {
      createEvent(eventInput: EventInput): Event
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }`),