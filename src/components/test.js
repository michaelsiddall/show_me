import "date-fns";
import React from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import mapStoreToProps from "./../redux/mapStoreToProps";

function AddDate {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React
    .useState
    // new Date("2014-08-18T21:11:54")
    ();

  const handleDateChange = (date) => {
    console.log("date is", date);
    this.props.dispatch({
      type: "SET_DATE",
      payload: date,
    });
    setSelectedDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date picker dialog"
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
export default connect(mapStoreToProps)(withRouter(AddDate));
