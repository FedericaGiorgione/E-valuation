import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import LinearProgress from '@material-ui/core/LinearProgress'
import { Typography } from '@material-ui/core'

const useStyle = makeStyles(theme => ({
  content: {
    width: '70vw'
  },
  children: {
    marginBottom: theme.spacing(1)
  }
}))

function UploadFilesDialog ({currentFilePercent, currentFileNumber, fileNumber, visible}) {
  const classes = useStyle()
  const totalPercent = (currentFileNumber - 1) * 100 / fileNumber
  return (
    <Dialog open={visible}>
      <DialogTitle>
        Uploading Files
      </DialogTitle>
      <DialogContent className={classes.content}>
        <Typography className={classes.children}>
          Uploading file {currentFileNumber}
        </Typography>
        <LinearProgress className={classes.children} variant='determinate' value={currentFilePercent} />
        <Typography className={classes.children}>{`${currentFileNumber - 1} of ${fileNumber} uploaded`}</Typography>
        <LinearProgress className={classes.children} variant='determinate' value={totalPercent} />
      </DialogContent>
    </Dialog>
  )
}

export default UploadFilesDialog
