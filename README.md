1.	Goals and Purpose of System:
The goal of this application is to provide convenience to restaurant business to provide more services to its customers.
Also, for customers it provides options to search for the restaurants near to his place as well as any location. This application is simulation of yelp application in the real world.
The application should be able to handle the large number of customers at the same time in parallel. Also, it should be able to authenticate each API request made by UI to backend.

2.	System Design:
The application consists of below entities:
a.	Customer – Customer should be able to perform below tasks:
•	He can signup and login into the yelp application. 
•	He can maintain his profile and update. 
•	He will be able to search for dishname, restaurant along with the city name. 
•	He can visit the restaurant profile, menu and place an order. 
•	He can give reviews to the restaurant as well. 
•	He can register himself for the events initiated by Restaurants.
•	He can search the Customer list on yelp and can follow any customer.
•	He can reply to the messages posted by restaurant for any queries related to orders.

b.	Restaurant – A restaurant can perform below tasks:
•	Signup and login to the application. 
•	He can visit and update the profile of his restaurant. 
•	He can update the dishes, events and orders. 
•	He can also visit the profile of the user who ordered from him. 
•	He can check who gave reviews to his restaurant and who are registered for the events initiated by them.
•	He can message any user who has ordered from his restaurant for any queries.

c.	MongoDB – The database used is MongoDB. As it is a document based database, it provides the advantage over MySQL when it comes to joins.
d.	Kafka - For handling distribution of the application Kafka as a streaming has been used where pub-sub model is implemented between Kafka and backend of the application for each API request.
e.	Redux – For managing the states of the application and speed up the application, redux has been used where multiple reducers are introduced for the screens where state needs to be managed.
f.	JWT-Passport – For login authentication, JWT passport has been used at the backend NodeJS for verifying the user both customer and Restaurant.
Below is the system design:
	 

Database:
Below is the list of schemas created for the application using MongoDB
1.	Users – Tables consists of customer information
2.	Restaurants – Table consists of restaurant information along with reviews, orders and menu information
3.	Events – Events created by restaurants. It consists of information about list of users registered for the event
4.	Messages – The table manages the messaging conversation between Restaurant and User.
5.	Userfollows – This table consists of information about which user is following which other user on yelp.
