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
import "./styles/App.css";
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
    console.log("Selected Theme (in child):", value); // Log in the child
    onThemeChange(value); // Pass the selected value to the parent
    onClose();
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
  onThemeChange: PropTypes.func.isRequired,
};

export default function ConfirmationDialog({ value, onThemeChange }) {
  const [open, setOpen] = React.useState(false);
  const [localValue, setLocalValue] = React.useState(value); // Renamed the local state variable

  const handleClickListItem = () => {
    setOpen(true);
  };

  const handleClose = (newValue) => {
    setOpen(false);

    if (newValue) {
      setLocalValue(newValue); // Update the local state
      onThemeChange(newValue); // Pass the selected value to the parent
    }
  };

  return (
    <List component="div" role="group">
      <Link
        className={`App-link ${value === "Dark Theme" ? "dark-theme" : ""}`}
        onClick={handleClickListItem}
      >
        Appearance
      </Link>
      <ConfirmationDialogRaw
        id="theme-menu"
        keepMounted
        open={open}
        onClose={handleClose}
        value={localValue} // Use the local state value
        onThemeChange={onThemeChange}
      />
    </List>
  );
}

ConfirmationDialog.propTypes = {
  onThemeChange: PropTypes.func.isRequired,
};
