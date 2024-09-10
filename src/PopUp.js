import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Link } from "react-router-dom";

const options = ["Light Theme", "Dark Theme"];

function ConfirmationDialogRaw(props) {
  const { onClose, value: valueProp, open, onThemeChange, ...other } = props;
  const [value, setValue] = React.useState(valueProp);
  const radioGroupRef = React.useRef(null);

  React.useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    console.log("Selected Theme:", value); // Log the selected radio button value
    onThemeChange(value); // Pass the selected value to the parent
    onClose(value);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <DialogTitle>Select Theme</DialogTitle>
      <DialogContent dividers>
        <RadioGroup
          ref={radioGroupRef}
          aria-label="theme"
          name="theme"
          value={value}
          onChange={handleChange}
        >
          {options.map((option) => (
            <FormControlLabel
              value={option}
              key={option}
              control={<Radio />}
              label={option}
            />
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  onThemeChange: PropTypes.func.isRequired, // Add this prop type
};

export default function ConfirmationDialog({ onThemeChange }) {
  // Accept onThemeChange as a prop
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("Light Theme");

  const handleClickListItem = () => {
    setOpen(true);
  };

  const handleClose = (newValue) => {
    setOpen(false);

    if (newValue) {
      setValue(newValue);
      onThemeChange(newValue); // Pass the selected value to the parent
    }
  };

  return (
    <List component="div" role="group">
      <Link
        className={`App-link ${value
          
          === "Dark Theme" ? "dark-theme" : ""}`}
        onClick={handleClickListItem}
      >
        Appearance
      </Link>
      <ConfirmationDialogRaw
        id="theme-menu"
        keepMounted
        open={open}
        onClose={handleClose}
        value={value}
        onThemeChange={onThemeChange} // Pass the callback to the raw dialog component
      />
    </List>
  );
}

ConfirmationDialog.propTypes = {
  onThemeChange: PropTypes.func.isRequired, // Add this prop type
};
