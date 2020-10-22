import React, { useState } from "react";
import { connect } from "react-redux";

//Styling Imports
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Input } from "@material-ui/core";

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
        {/* ITEMS TO DISPLAY ON DOM GO HERE */}
        <button onClick={() => setModalOpen(true)}>Open Modal</button>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          {/* STUFF FOR MODAL GOES HERE */}
        </div>
      </Modal>
    </div>
  );
}

export default connect()(ShowItem);
