import React from 'react';
import Navbar from './Navbar/Navbar';
import { Searchbar } from '../Searchbar/Searchbar';
import {Button} from '@material-ui/core';
import logo from '../assets/YelpLogo.jpg'
import styles from './HomePage.module.css';
import { useHistory } from 'react-router-dom';

export default function HomePage(){
    let history = useHistory();  
    
    function handleBusiness() {
        if(!localStorage.getItem('token')){
            history.push("/loginbiz");
        } else {
            history.push('/bizp');
            }        
    }
    if(localStorage.getItem('token')){
        history.push('/homea');
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
            <Navbar />                  
            <div className={styles['search-area']}>
            <img src={logo} className={styles.logo} alt='logo' />
            <Searchbar />
            </div>
        </div>            
        </div>  
        </div>              
    );
}