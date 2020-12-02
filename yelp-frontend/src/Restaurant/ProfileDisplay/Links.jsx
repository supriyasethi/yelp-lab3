import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import StarOutlinedIcon from "@material-ui/icons/StarOutlined";
import PhotoSizeSelectActualOutlinedIcon from "@material-ui/icons/PhotoSizeSelectActualOutlined";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		maxWidth: 250,
		fontSize: "12px",
		backgroundColor: theme.palette.background.paper,
		"& > *": {
			margin: theme.spacing(1),
		},
	},
	listItemText: {
		fontSize: "14px",
		fontWeight: "bold",
    },
    
}));

const Links = () => {
	const classes = useStyles();
	let history = useHistory();
	

	
    function handleClickHome() {
		history.push('/bizdisplay')
    }
    function handleClickReviews() {
		history.push('/ureviews')
	}

	return (
		<div className={classes.root} style={{ paddingTop: "50px" }}>
			<div>
				<List component='nav' aria-label='main mailbox folders'>
					<ListItem button>
						<ListItemIcon>
							<HomeOutlinedIcon />
						</ListItemIcon>
						<ListItemText
							classes={{ primary: classes.listItemText }}
                            primary='Home'
                            onClick={handleClickHome}
						/>
					</ListItem>
					
					<ListItem button>
						<ListItemIcon>
							<StarOutlinedIcon />
						</ListItemIcon>
						<ListItemText
							classes={{ primary: classes.listItemText }}
                            primary='Reviews'
                            onClick={handleClickReviews}
						/>
					</ListItem>
					<ListItem button>
						<ListItemIcon>
							<PhotoSizeSelectActualOutlinedIcon />
						</ListItemIcon>
						<ListItemText
							classes={{ primary: classes.listItemText }}
							primary='Photos'
						/>
					</ListItem>								
							
				</List>
			</div>			
		</div>
	);
};
export default Links;
