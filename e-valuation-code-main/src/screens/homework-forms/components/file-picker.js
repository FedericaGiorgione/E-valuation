import React, {useState}  from 'react'
import { Paper, Typography, Fab, makeStyles} from '@material-ui/core'
import LeftArrowIcon from '@material-ui/icons/KeyboardArrowLeft'
import RightArrowIcon from '@material-ui/icons/KeyboardArrowRight'
import ClearIcon from '@material-ui/icons/Clear'
import FileCard from './file-card'
import CustomDialog from '../../../components/dialogs/custom-dialog'

const useStyle = makeStyles(theme => ({
  paper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '50%',
  },

  central: {
    height: '85%',
    width: '60%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1,
  },

  side: {
    height: '75%',
    width: '50%',
    transform: 'translateY(-50%)',
    zIndex: 0
  },

  left: {
    left: 0
  },

  right: {
    right: 0
  },

  iconButton: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)'
  },

  counterPaper: {
    position: 'absolute',
    width: 'auto',
    padding: theme.spacing(1),
    borderRadius: '35%',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 3,
  },

  errorMessage: {
    position: 'absolute',
    width: 'auto',
    margin:'auto',
    padding: theme.spacing(1),
    bottom: 0,
    zIndex: 3,
  },

  deleteFileIcon: {
    position: 'absolute',
    right: 0,
    top: 0,
    transform: 'translate(25%, -25%)'
  },
}))

function isPdf(url) {
  return !!url.toLowerCase()
    .split(/[?.]/)
    .find(elem => elem === 'pdf')
}
function getFileType(file) {
  return file.type || (isPdf(file.url) ? 'pdf' : 'image')
}

function FilePicker({className, fileList, onRemoveFile, index, setIndex, deleteFab, errorMessage, style}) {
  const classes = useStyle()
  const images = fileList.map(f => ({...f, type: getFileType(f)}))
  const [imagesIndex, setImagesIndex] = [index, setIndex] //useState(0)

  const hasFiles = images.length > 0
  const hasFilesLeft = imagesIndex > 0
  const hasFilesRight = imagesIndex < images.length - 1

  const decImagesIndex = () => {
    if (!hasFilesLeft) {
      return
    }

    setImagesIndex(imagesIndex - 1)
  }

  const incImagesIndex = () => {
    if (!hasFilesRight) {
      return
    }

    setImagesIndex(imagesIndex + 1)
  }

  const removeFile = pos => {
    // trigger event
    onRemoveFile(pos);

    // decrease counter (if it is not 0)
    if (imagesIndex !== 0) {
      setImagesIndex(imagesIndex - 1)
    }
  }

  const centralFile = images[imagesIndex]
  const leftFile = images[imagesIndex - 1]
  const rightFile = images[imagesIndex + 1]

  const [deleteFileDialogVisible, setDeleteFileDialogVisible] = useState(false)

  return(
    <div className={className} style={{backgroundColor: 'transparent', position: 'relative', ...style}}>
      <Paper
        className={[classes.paper, classes.side, classes.left].join(' ')}
        elevation={1}
        style={{opacity: leftFile ? 1 : 0}}
      >
        <FileCard url={leftFile?.url} type={leftFile?.type} isCentral={false} file={leftFile}/>
      </Paper>
      <Paper
        className={[classes.paper, classes.central].join(' ')}
        elevation={2}
        style={{backgroundColor: centralFile}}
      >
        <FileCard url={centralFile?.url} type={centralFile?.type} isCentral={true} file={centralFile}/>
        {deleteFab ?
          <Fab
            className={classes.deleteFileIcon}
            color='secondary'
            size='small'
            disabled={!hasFiles}
            onClick={() => setDeleteFileDialogVisible(true)}
          >
            <ClearIcon />
          </Fab>
          : <> </>}

        <Typography className={classes.errorMessage} color='error'>
          {errorMessage}
        </Typography>
      </Paper>
      <Paper
        className={[classes.paper, classes.side, classes.right].join(' ')}
        elevation={1}
        style={{opacity: rightFile ? 1 : 0}}
      >
        <FileCard url={rightFile?.url} type={rightFile?.type} isCentral={false} file={rightFile}/>
      </Paper>
      <Fab
        className={[classes.iconButton, classes.left].join(' ')}
        onClick={decImagesIndex}
        disabled={!hasFiles || !hasFilesLeft}
        size='small'
      >
        <LeftArrowIcon fontSize='large'/>
      </Fab>
      <Fab
        className={[classes.iconButton, classes.right].join(' ')}
        onClick={incImagesIndex}
        disabled={!hasFiles || !hasFilesRight}
        size='small'
      >
        <RightArrowIcon fontSize='large'/>
      </Fab>
      <Paper className={classes.counterPaper} elevation={3}>
        <Typography>
          {hasFiles ? imagesIndex+1 : 0} / {images.length}
        </Typography>
      </Paper>
      <CustomDialog
        visible={deleteFileDialogVisible}
        setVisible={setDeleteFileDialogVisible}
        confirmFunction={() => {
          removeFile(imagesIndex)
          setDeleteFileDialogVisible(false)
        }}
        title='Delete File?'
        message="Permanently delete this file?"
        confirmLabel={"Delete"}
        cancelLabel={"Don't delete"}
      />
    </div>
  )
}

export default FilePicker
