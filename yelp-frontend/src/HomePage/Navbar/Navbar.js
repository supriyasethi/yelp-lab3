import React, { Component, useState } from "react";
import styles from "./Navbar.module.css";
import { Button, TextField, Typography, Link } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import cookie from "react-cookies";

const Navbar = () => {
	let history = useHistory();

	function handleLoginClick() {
		history.push('/login');
	}

	function handleSignupClick() {
		console.log('inside handle signup click');
		history.push('/signup');
    }
    
    function handleDisplayEvents() {
		history.push({
			pathname: '/eventsdisplay',
			state: {data: "home"}});
	}

	function handleWriteReview() {
		history.push({
			pathname: '/review',
			state: {data: "home"}});
	}

	return (
		<div>
			<div>
				<div className={styles["nav-bar"]}>
					<div className={styles["left"]}>
						<Link
							component='button'
                            variant='body2'
                            style={{
                                color: "white",
								fontSize: "14px",
								fontWeight: "bold",
                            }}
							onClick={handleWriteReview}
							>
							Write a Review
						</Link>
                        <Link
							component='button'
                            variant='body2'
                            style={{
                                color: "white",
								fontSize: "14px",
								fontWeight: "bold",
                            }}
							onClick={handleDisplayEvents}>
							Events
						</Link>						
					</div>
					<div className={styles["right"]}>
						<React.Fragment>
							<Button
								onClick={handleLoginClick}
								color='primary'
								style={{
									color: "white",
									fontSize: "12px",
									fontWeight: "bold",
								}}>
								Log In
							</Button>
							<Button
								onClick={handleSignupClick}
								className='button'
								variant='outlined'
								style={{
									color: "white",
									"font-size": "12px",
									"font-weight": "bold",
								}}>
								Signup
							</Button>
						</React.Fragment>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
