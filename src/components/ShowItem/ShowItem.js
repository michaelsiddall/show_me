import React, { useState } from "react";
import { connect } from "react-redux";

//Styling Imports
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

//Material UI imports
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
          <ListItemText
            id={props.show.showId}
            primary={props.show.artistName}
          />
          <ListItemText primary={props.show.venueName} />
          <ListItemText primary={moment(props.show.date).format("LL")} />

          <button onClick={() => setModalOpen(true)}>Display Details</button>
        </ListItem>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <ListItemText primary={props.show.review} />
          <ListItemText primary={props.show.genre} />
          <img height="200px" width="200px" src={props.show.image} />
        </div>
      </Modal>
    </div>
  );
}

export default connect()(ShowItem);
