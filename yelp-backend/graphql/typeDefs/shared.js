//const graphql = require("graphql");
const { buildSchema } = require("graphql");

module.exports = buildSchema(`
	
	type  RootQuery {
		name: "Hello"
	}

	





	type RootMutation {		
			
		
	}

	schema {
		query: RootQuery
		mutation: RootMutation
	}
`);

