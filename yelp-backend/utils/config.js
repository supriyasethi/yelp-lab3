const config = {
    secret: "cmpe273_kafka_passport_mongo",
    frontendURL: "http://localhost:3000",
    mongoDB: 'mongodb+srv://yelpuser:yelp12345@cluster0.tyozk.mongodb.net/yelpuser?retryWrites=true&w=majority',
    signup_topic: 'signup_topic',
    login_topic: 'login_topic',
    update_topic: 'update_topic',
    insert_topic: 'insert_topic',
    fetch_topic: 'fetch_topic'
};

module.exports = config;