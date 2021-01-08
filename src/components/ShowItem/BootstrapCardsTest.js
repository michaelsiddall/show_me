import React, { useState } from 'react';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

//Material UI imports
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import moment from 'moment';
// import Grid from "@material-ui/core/Grid";

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
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  image: { width: '60px', height: '60px' },
}));

//________

function ShowItem(props) {
  // Modal stuff
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [modalOpen, setModalOpen] = useState(false);

  console.log('props.show is', props.show);

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Col>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant='top' src={props.show.image} />
                <Card.Body>
                  <Card.Title></Card.Title>
                  <Card.Text>
                    <ul>
                      {props.show.artistName}
                      {props.show.date}
                      {props.show.venueName}
                      {props.show.genre}
                    </ul>
                  </Card.Text>
                  <Button variant='primary'>Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default connect()(ShowItem);
