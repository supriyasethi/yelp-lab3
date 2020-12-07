import React,{useState} from 'react';
import {Button, TextField, Typography, Divider} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import serverUrl from '../../config';
//import { setLogin } from "../js/actions/index";

const useStyles = makeStyles( (theme) => ({
    root: {
        '& > *': {
          margin: theme.spacing(1),
        },
      },
    container : {
        display: 'flex',
        flexFlow: 'row wrap',    
        justifyContent: 'space-between',  
        width: '120.4%',
        padding: '20',            
      },
      input1: {  
        height: 50,
        width: 500
      }
     
}));

const Reviewform = () => {

    //let httpURL = "http://localhost:3001";
	// let httpURL = "http://54.219.75.46:3001";
    let history = useHistory();    
    
     //const dispatch = useDispatch();
     let [state, setState] = React.useState({
        restaurantId: '',
        reviews: '',
        rating: '',
        userId: ''
     });
     let [errmsg, seterrmsg] = useState('');
     const rId = localStorage.getItem('restaurantId');
     const uId = localStorage.getItem('userId');
    

     function handleReviewsChange(value) {        
     setState({
        ...state,
        restaurantId: rId,
        userId: uId,
        reviews: value,           
         });
        
    }

    function handleRatingChange(value) {       
     setState({
        ...state,
        restaurantId: rId,
        userId: uId,        
        rating: value    
         });
        
    }

    function handleSaveChanges() {      
                   
        console.log(state);
        axios.defaults.withCredentials = true;
         axios.post(serverUrl+"/insert/reviews", state)
         .then(response => {
             console.log("Status code: ", response.status);
             if(response.status === 200) {
                history.push("/homea");               
         }
     })
     .catch(error => {   
         console.log('error', error.response); 
         seterrmsg(<p>Reviews already given by the user</p>)
       });
     }  
        
    function handleCancel() {
        history.push('/homea')
    }
    const classes = useStyles();        
    
    return (
        <div className={classes.root}> 
            <div className={classes.container}>             
            <Typography style={{
                   color:"#d32323", 
                   fontWeight: "bold", 
                    fontSize : "20px",
                    justifyContent: "center"
                   }}>Write Your Reviews</Typography>
            </div>
            <div>
                <Divider />
            </div>                     
            
             <div> 
             <Typography style={{
                   color:"#333333", 
                   fontWeight: "bold", 
                    fontSize : "13px",
                    justifyContent: "center"
                   }}>Reviews</Typography>                      
            <TextField id="outlined-multiline-static"             
                name="reviews"
                multiline
                rows={4}                
                variant="outlined"
                style={{width: "500px"}}
                value={state.reviews}
                onChange={(event) => handleReviewsChange(event.target.value)}    
                   />                                     
            </div>
            <div>
            <Typography style={{
                   color:"#333333", 
                   fontWeight: "bold", 
                    fontSize : "13px",
                    justifyContent: "center"
                   }}>Rating - Out of 5</Typography>
            <TextField id="outlined-basic" variant="outlined" size="small" type="text" margin="dense"
                 style={{ height: "20", width: "500px"}} name="rating" value={state.rating} onChange={(event) => handleRatingChange(event.target.value)} 
                
                  /> 
            </div>  
            <div>
            <Button variant="contained" color="secondary" style={{ 
                height: "35px", 
                width: "150px", 
                fontSize : '12px',
                fontWeight : "bold",
                background: "#d32323"}} onClick={handleSaveChanges} >
                Save Changes
            </Button>

            <Button variant="contained" color="secondary" style={{ 
                height: "35px", 
                width: "150px", 
                fontSize : '12px',
                fontWeight : "bold",
                background: "#333333"}} onClick={handleCancel} >
                Cancel
            </Button>   
            <div>  
            {errmsg}       
            </div>
            </div>   
            </div>                       
        
    );    
}

// function mapDispatchToProps(dispatch) {
//     console.log('inside map dispatch')
//     return {
//       setLogin: loginFormInfo => dispatch(setLogin(loginFormInfo))
//     };
//   }

//   const mapStateToProps = (state) => {
//       return {
//           user: state.login.user,
//           loginsuccess: state.login.loginsuccess,
//           loginfailure: state.login.loginfailure,
//       }
//  }
//export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
export default Reviewform;
