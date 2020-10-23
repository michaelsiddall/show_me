import React, { useState } from "react";
import { connect } from "react-redux";

//Styling Imports
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

//Material UI imports
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import moment from "moment";

// Modal Styling
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

//________

function ShowItem(props) {
  // Modal stuff
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="event">
      <div>
        <ListItem
          key={props.show.showId}
          button
          // onClick={() => this.addArtist(artist.spotifyId, artist.name)}
        >
          <ListItemAvatar>
            <Avatar alt="band" src={props.show.image} />
          </ListItemAvatar>
          <ListSubheader component="div" id="subheader">
            Artist
          </ListSubheader>
          <ListItemText
            id={props.show.showId}
            primary={props.show.artistName}
          />
          <ListSubheader component="div" id="subheader">
            Venue
          </ListSubheader>

          <ListItemText primary={props.show.venueName} />
          <ListSubheader component="div" id="subheader">
            Date
          </ListSubheader>
          <ListItemText primary={moment(props.show.date).format("LL")} />

          <button onClick={() => setModalOpen(true)}>Display Details</button>
        </ListItem>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <img height="250px" width="250px" src={props.show.image} />
          <h4> Genre:</h4> <ListItemText primary={props.show.genre} />
          <h4>Review:</h4>
          <ListItemText primary={props.show.review} />
        </div>
      </Modal>
    </div>
  );
}

export default connect()(ShowItem);
