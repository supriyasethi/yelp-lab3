import React from 'react';
import HomePage from './HomePage/HomePage.js'
import UserProfile from './User/UserProfile/ProfilePage/UserProfile.js' 
import UserList from './User/UserList/UserList.js' 
import UserDisplay from './User/UserProfile/ProfileDisplay/Profile.js'
import UserProfileUpdate from './User/UserProfile/ProfileUpdate/ProfileUpdate';
import BizProfileUpdate from './Restaurant/RestaurantProfile/ProfileUpdate/ProfileUpdate.js';
import RestaurantProfile from './Restaurant/RestaurantProfile/ProfilePage/RestaurantProfile.js'
import RestaurantList from './Restaurant/RestaurantList/List.js' 
import ProfileDisplay from './Restaurant/ProfileDisplay/ProfileU.js'
import UpdateOrder from './Restaurant/Orders/ViewOrder.js'
import RestaurantMenu from './Restaurant/RestaurantProfile/Menu/Menu.js'
import AddEvent from './Restaurant/RestaurantProfile/Events/Events.js'
import FetchEvents from './EventsDisplay/Restaurant/EventsDisplay.js'
import HomePageA from './HomePage/HomePageA.js'
import EventsDisplay from './EventsDisplay/User/EventsDisplay.js'
import WriteReviews from './User/Review/WriteReview.js'
import ViewReviews from './Restaurant/Reviews/ViewReviews.js'
import ViewResMessages from './Restaurant/Messages/Message.js'
import ViewUserMessages from './User/Messages/Message.js'
import {Switch, Route} from 'react-router-dom';     
import LoginUser from './User/LoginPage/LoginUser';
import ViewOrder from './User/OrdersPage/Order.js';
import LoginRestaurant from './Restaurant/LoginPage/LoginRestaurant';
import Signup from './Restaurant/Signup/Signup';
import SignupPage from './User/SignupPage/SignupPage.js';

function App() {
   return (
     
     <Switch>
       <Route path="/login" component={LoginUser}/>
       <Route path="/loginbiz" component={LoginRestaurant}/>
       <Route path="/signup" component={SignupPage}/>
       <Route path="/signupbiz" component={Signup}/>
       <Route path="/homea" component={HomePageA}/>
       <Route path="/userp" component={UserProfile}/>
       <Route path="/userdisplay" component={UserDisplay}/>
       <Route path="/userlist" component={UserList}/>
       <Route path="/updateuprofile" component={UserProfileUpdate}/>
       <Route path="/updatebprofile" component={BizProfileUpdate}/>
       <Route path="/bizp" component={RestaurantProfile}/>
       <Route path="/menu" component={RestaurantMenu}/>
       <Route path="/event" component={AddEvent}/>
       <Route path="/events" component={FetchEvents}/>
       <Route path="/resmessages" component={ViewResMessages}/>
       <Route path="/usermessages" component={ViewUserMessages}/>
       <Route path="/eventsdisplay" component={EventsDisplay}/>       
       <Route path="/bizdisplay" component={ProfileDisplay}/>
       <Route path="/bizlist" component={RestaurantList}/>
       <Route path="/ureviews" component={WriteReviews}/>
       <Route path="/vreviews" component={ViewReviews}/>
       <Route path="/updateorder" component={UpdateOrder}/>
       <Route path="/vieworder" component={ViewOrder}/>
       <Route path="/" component={HomePage}/>
     </Switch>    
  );
}

export default App;
