import React, { useState } from "react"
import PropTypes from "prop-types"
import {
  Dialog,
  DialogTitle,
  // DialogContent,
  // DialogContentText,
  DialogActions,
  Button
} from "@material-ui/core"
import ButtonCircularProgress from "./ButtonCircularProgress"


import { TextField } from '@material-ui/core'

function ConfirmationDialog(props) {
  const { open, onClose, loading, title, onConfirm } = props;
  const [PeriodRSI, setPeriodRSI] = useState(1);

  const updateRSIPeriod = (newValue) => {

  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      //disableBackdropClick={loading}
      disableEscapeKeyDown={loading}
    >
      <DialogTitle>{title}</DialogTitle>
      {/* <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent> */}
      <div >
        <div style={{ margin: 10, marginLeft: 40, marginRight: 40, display: "flex", justifyContent: "Space-between", width: 300 }}>
          <h6 style={{ display: "flex", alignItems: "center" }}>Threshold :</h6>
          <TextField type="number" style={{ width: 180 }} inputProps={{ step: "1", min: 1 }}
            id="ss1" variant="outlined" size="small" disabled={false}
            value={PeriodRSI} onChange={(event) => { updateRSIPeriod(event.target.value) }} />
        </div>
        <div style={{ margin: 10, marginLeft: 40, marginRight: 40, display: "flex", justifyContent: "Space-between", width: 300 }}>
          <h6 style={{ display: "flex", alignItems: "center" }}>ToUp Ampunt :</h6>
          <TextField type="number" style={{ width: 180 }} inputProps={{ step: "1", min: 1 }}
            id="ss1" variant="outlined" size="small" disabled={false}
            value={PeriodRSI} onChange={(event) => { updateRSIPeriod(event.target.value) }} />
        </div>

      </div>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          color="secondary"
          onClick={onConfirm}
          variant="contained"
          disabled={loading}
        >
          Yes {loading && <ButtonCircularProgress />}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmationDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  loading: PropTypes.bool,
  title: PropTypes.string,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  onConfirm: PropTypes.func
};

export default ConfirmationDialog;
