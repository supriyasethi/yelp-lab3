import React,{useState} from 'react';
import {Button, TextField, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

const SignupForm = () => {
        
    //let httpURL = "http://localhost:3001";
	let httpURL = "http://54.219.75.46:3001";
    let history = useHistory();
    
    const [state, setState] = React.useState({
        name: "",        
        username: "",
        password: "",
        city    : ""
      });    

    const [authErr, setauthErr] = useState('');    
    const [nameErr, setNameErr] = useState('');
    const [usernameErr, setUserNameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [cityErr, setCityErr] = useState('');
    const classes = useStyles();  
    
    function onSubmitLogin() {
        history.push("/login");
    }

    function nextPageRender() {
        history.push("/homea");
    }

    function handleChange(e) {
        console.log("handlechange state", state);
        const value = e.target.value;
     setState({
       ...state,
       [e.target.name]: value
         });
        
    }

    function handleSubmit() {
        
        console.log('inside handle submit')
        console.log('state', state);        
         axios.defaults.withCredentials = true;
         axios.post(httpURL+"/signup/biz",state)
         .then(response => {
             console.log("Status code: ", response.status);
             if(response.status === 200) {
                history.push("/loginbiz");
               //dispatch(failure());
         }
     })
     .catch(error => {   
      console.log('error', error.response);
      if(error.response.status === 401) {
          //authFlag = true;
          if(error.response.data.errno === 1062) {
              var errmsg = "Username already registered";
          }
          setauthErr(<p class="alert alert-danger" role="alert">{errmsg}</p>);
          //return authErr;
          console.log(error.response.data);  
          console.log('authErr', authErr);
       }
      if(error.response.status === 422) {
        console.log(error);
        for(var i = 0; i < error.response.data.length; i++) {
          if (error.response.data[i].param === 'username') {                
              setUserNameErr(
                  <p class="alert alert-danger" role="alert">{error.response.data[i].msg}</p>);
          }
          if (error.response.data[i].param === 'password') {                
              setPasswordErr(
                  <p class="alert alert-danger" role="alert">{error.response.data[i].msg}</p>);
          }
          if (error.response.data[i].param === 'name') {                
              setNameErr(
                  <p class="alert alert-danger" role="alert">{error.response.data[i].msg}</p>);
          }          
          if (error.response.data[i].param === 'city') {                
              setCityErr(
                  <p class="alert alert-danger" role="alert">{error.response.data[i].msg}</p>);
          }
      }
     
     };
     });       
}       

    return (
        
        <div className={classes.root} style={{"padding-top":"150px"}}>          
            <form noValidate autoComplete="off" className={classes.root} >                
                <TextField id="outlined-basic" label="Name" variant="outlined" size="small"  type="text"
                 style={{ height: "30px", width: "120px"}} name="name" value={state.name}
                 onChange={handleChange} /> {nameErr}
                 <TextField id="outlined-basic" label="Email" variant="outlined" size="small" type="email"
                 style={{ height: "30px", width: "300px"}} name="username" value={state.username}
                 onChange={handleChange} />  {usernameErr}                
                 <TextField id="outlined-basic" label="Password" variant="outlined" size="small" type="password"
                 style={{ height: "30px", width: "300px"}} name="password" value={state.password}
                 onChange={handleChange} />  {passwordErr}               
                 <TextField id="outlined-basic" label="City" variant="outlined" size="small" type="text"
                 style={{ height: "30px", width: "300px"}} name="city" value={state.city}
                 onChange={handleChange} />  {cityErr}              
            </form>
            <Typography style={{fontSize : "12px"}}>You also understand that Yelp may send marketing emails about Yelp’s products, services, and local events. You can unsubscribe at any time.</Typography>
            <Button variant="contained" color="secondary" style={{ 
                height: "37px", 
                width: "300px", 
                background: "#d32323"}} onClick={handleSubmit} >
                Sign Up
            </Button>
            {authErr}
            <Typography style={{
                color:"#e6e6e6", 
                fontSize : "10px"
                }}>Already on Yelp?
            <Button color="primary" style={{
                color:"#0073bb", fontSize : "10px"}}
                onClick={onSubmitLogin}>Log in</Button></Typography>
        </div>      
    );
}
export default SignupForm;