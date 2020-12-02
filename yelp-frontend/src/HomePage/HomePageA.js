import React from 'react';
import NavbarA from './Navbar/NavbarA';
import { Searchbar } from '../Searchbar/Searchbar';
import logo from '../assets/YelpLogo.jpg'
import styles from './HomePage.module.css';
import { useHistory } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import {Button} from '@material-ui/core';

export default function HomePageA(){
    const location = useLocation();
    let history = useHistory(); 
    function handleBusiness() {
        if(!localStorage.getItem('token')){
            history.push("/loginbiz");
        } else {
            history.push('/bizp');
            }      
    }
    if(!localStorage.getItem('token')){
        history.push('/home');
    }
    return (    
        <div className={styles.img} >
            <div className={styles.button}>     
             <Button onClick={handleBusiness}  variant='outlined' 
             style={{
                "color": "white",
                "font-size" : "12px",
                "font-weight" : "bold",                
            }}>
              Yelp for Business</Button>       
            </div>
        <div className={styles.homepage}>
        <div>
            <NavbarA />
            <div className={styles['search-area']}>
            <img src={logo} className={styles.logo} alt='logo' />
            <Searchbar />
            </div>
        </div>            
        </div>
        </div>
    );
}