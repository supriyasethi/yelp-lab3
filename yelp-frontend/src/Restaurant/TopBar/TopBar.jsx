import React from'react';
import styles from './TopBar.module.css'
import logo from '../../assets/YelpLogo1.jpg';
import {Typography, AppBar, Toolbar} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import {makeStyles} from '@material-ui/styles';
import MailOutlinedIcon from '@material-ui/icons/MailOutlined';
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';

const useStyles = makeStyles( () => ({
    iconStyle : {
        display: 'flex',        
        justifyContent: 'space-between',
        alignItems: 'center',
    }
})); 
const TopBar = () => {  

    let history = useHistory();      
    const classes = useStyles();

    function handleHomeClick() {    
        history.push("/homea");
    }    
    
       return(
        <AppBar position="static" color='default' >
         <Toolbar className={classes.iconStyle}>
            <img onClick={handleHomeClick} src={logo}  alt='logo' />    
            <Typography style={{fontWeight:"bold", color:"#d32323"}}>Yelp for business</Typography>   
            <div className={styles["right"]}>
                    <MailOutlinedIcon />
                    <NotificationsOutlinedIcon />
                    <HelpOutlineOutlinedIcon />
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />                        
                </div>   
         </Toolbar>
        </AppBar>
        
       );    
}

export default TopBar;