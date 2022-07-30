import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { makeStyles } from '@material-ui/core'

const useStyle = makeStyles(theme => ({
  root: {
    color: theme.palette.primary.main
  },
}))

export default function CustomDialog(
  {visible, setVisible, title, message, confirmFunction, cancelFunction, confirmLabel, cancelLabel}) { // visible passata come prop
  const handleClose = () => {
    setVisible(false);
  };
  const classes = useStyle()

  return (

    <div>
      <Dialog
        open={visible}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className={classes.root} id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            if (cancelFunction) {
              cancelFunction()
            } else {
              handleClose()
            }
          }} color="primary">
            {cancelLabel || 'Cancel'}
          </Button>
          <Button onClick={() => { confirmFunction() }} color="primary" autoFocus>
            {confirmLabel || 'Confirm'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>

  )

}
