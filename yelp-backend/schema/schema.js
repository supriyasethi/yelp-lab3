const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;



const RestaurantType = new GraphQLObjectType({
    name: 'Restaurant',
    fields: () => ({  
        id: { type: GraphQLID },
        name: { type: GraphQLString },
		city: { type: GraphQLString },
		description: { type: GraphQLString },
		address: { type: GraphQLString },
		timing: { type: GraphQLString},
        menu: { type: GraphQLList },
        orders: { type: GraphQLList },
        reviews: { type: GraphQLList },        
        })
    });


const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        firstname: { type: GraphQLString},
        lastname: { type: GraphQLString },
        city: { type: GraphQLString },
		state: { type: GraphQLString },
        country: { type: GraphQLString },
        yelpingsince: { type: GraphQLString },
		thingsilove: { type: GraphQLString },
        findmein: { type: GraphQLString },
        orders: { type: GraphQLList },
        reviews: { type: GraphQLList }, 
        name: { type: GraphQLString },     
    })
});

const EventType = new GraphQLObjectType({
    name: 'Event',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString},        
        time: { type: GraphQLString},
		date: { type: GraphQLString},
        location: { type: GraphQLString},         
    })
});

const UserFollowType = new GraphQLObjectType({
    name: 'UserFollow',
    fields: () => ({
        id: { type: GraphQLID },
        userid: { type: GraphQLString },
		firstname: { type: GraphQLString},
		lastname: { type: GraphQLString },
		city: { type: GraphQLString },
		state: { type: GraphQLString },
		yelpingsince: { type: GraphQLString },
		thingsilove: { type: GraphQLString },
		findmein: { type: GraphQLString },       
    })
});

const MessagesType = new GraphQLObjectType({     
    name: 'MessagesFollow',
    fields: () => ({
        id: { type: GraphQLID },
        user: { type: GraphQLString },
		userid: { type: GraphQLString },
		restaurant: { type: GraphQLString },
		restaurantid: { type: GraphQLString},
		date: { type: GraphQLString },      
    })
});
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Root Query',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return books.find(book => book.id === args.id);
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return authors.find(author => author.id === args.id );
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books;
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return authors;
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: GraphQLString },
                age: { type: GraphQLInt },
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                let author = {
                    name: args.name,
                    age: args.age,
                    id: args.id
                };
                authors.push(author)
                console.log("Authors", authors);
                return author;
            }
        },

        addBook: {
            type: BookType,
            args: {
                name: { type: GraphQLString },
                genre: { type: GraphQLString },
                authorId: { type: GraphQLID },
            },
            resolve(parent, args) {
                let book = {
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId,
                    id: books.length+1
                }
                books.push(book);
                return book;
            }
        }

    }
});

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

module.exports = schema;