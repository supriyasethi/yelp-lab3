/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Users from "./Users";
import { Grid } from "@material-ui/core";
import LoginSignupTopBar from "../../helpers/LoginSignupTopBar";

function UserList() {

	return (
		<Grid container direction='column' spacing={20}>
			<Grid item>
				<LoginSignupTopBar />
			</Grid>
			<Grid item container>
				<Grid xs={0} sm={3} />
				<Grid xs={12} sm={6}>
					<Users />
				</Grid>
				<Grid xs={0} sm={3} />
			</Grid>
		</Grid>
	);
}
// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		getUserList: (payload) => {
// 			dispatch(
// 				getUserList({
// 					type: usersList,
// 					payload,
// 				})
// 			);
// 		},
// 	};
// };

// export default connect(null, mapDispatchToProps)(UserList);
export default UserList;
