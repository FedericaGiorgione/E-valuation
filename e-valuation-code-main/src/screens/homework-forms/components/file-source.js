import React, {useRef, useCallback, useEffect, useState} from 'react'
import {makeStyles, Button} from '@material-ui/core'
import CameraAltIcon from '@material-ui/icons/CameraAlt'
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary'
import FileIcon from '@material-ui/icons/InsertDriveFile'
import usePermissions from '../hooks/use-permissions'
import CustomSnackbar from '../../../components/snackbars/custom-snackbar'

const useStyle = makeStyles(theme => ({
  root:  {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'spaceBetween',
  },

  button: {
    flex: 1,
    backgroundColor: 'primary',
    borderRadius: 0,
    height: theme.spacing(7)
  },

  centralButton: {
    margin: '0 2px'
  },

  hide: {
    display: 'none'
  },
}))

const errors = {
  PERMISSION_DENIED:
    "E-valuation doesn't have permissions to use the camera, please give us permission from browser settings",
  WRONG_FILE_TYPE: 'Wrong file type, please select only pdf file from file picker',
  MAX_FILE_NUMBER_REACHED: 'You can upload up to 5 files',
}
function FileSource({className, onAddFile, fileNumber, maximumFileNumber}) {
  const classes = useStyle()
  const buttonColor = 'primary' // 'secondary'
  const buttonVariant = 'contained'
  const buttonSize = 'large'
  const [checkPermissions, permissionError] = usePermissions({video: true})
  const [snackbarVisible, setSnackbarVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const takeImageFromCameraRef = useRef()
  const takeImageFromGalleryRef = useRef()
  const takeFileRef = useRef()

  const takeImageFromCamera = useCallback(() => {
    checkPermissions(() => takeImageFromCameraRef.current.click())
  }, [takeImageFromCameraRef, checkPermissions])
  const takeImageFromGallery = () => takeImageFromGalleryRef.current.click()
  const takeFile = () => takeFileRef.current.click()

  const setError = useCallback( errMsg => {
    setErrorMessage(errMsg)
    setSnackbarVisible(true)
  },[setErrorMessage, setSnackbarVisible])

  useEffect(() => {
    if (permissionError) {
      // show snackbar
      setError(errors.PERMISSION_DENIED)
    }
  }, [permissionError, setError])

  const addFile = (file, type) => {
    if (fileNumber >= maximumFileNumber) {
      setError(errors.MAX_FILE_NUMBER_REACHED)
      return
    }

    if (type === 'pdf') {
      if (!file) {
        return
      }
      if (file.type !== 'application/pdf') {
        setError(errors.WRONG_FILE_TYPE)
        return
      }
    }

    onAddFile({
      url: URL.createObjectURL(file),
      file: file,
      type,
    })
  }

  return (
    <div className={[className, classes.root].join(' ')} onClick={event => event.stopPropagation()}>
      <Button
        variant={buttonVariant}
        color={buttonColor}
        size={buttonSize}
        className={classes.button}
        startIcon={<CameraAltIcon />}
        onClick={takeImageFromCamera}
      >
        Camera
      </Button>
      <Button
        variant={buttonVariant}
        color={buttonColor}
        size={buttonSize}
        className={[classes.button, classes.centralButton].join(' ')}
        startIcon={<PhotoLibraryIcon />}
        onClick={takeImageFromGallery}
      >
        Gallery
      </Button>
      <Button
        variant={buttonVariant}
        color={buttonColor}
        size={buttonSize}
        className={classes.button}
        startIcon={<FileIcon />}
        onClick={takeFile}
      >
        PDF
      </Button>

      <input
        className={classes.hide}
        ref={takeImageFromCameraRef}
        type='file'
        capture='environment'
        accept='image/*'
        onChange={e => addFile(e.target.files[0], 'image')}
      />
      <input
        className={classes.hide}
        ref={takeImageFromGalleryRef}
        type='file'
        accept='image/*'
        onChange={e => addFile(e.target.files[0], 'image')}
      />
      <input
        className={classes.hide}
        ref={takeFileRef}
        type='file'
        capture='environment'
        accept='application/pdf'
        onChange={e => addFile(e.target.files[0], 'pdf')}
      />

      <CustomSnackbar
        visible={snackbarVisible}
        setVisible={setSnackbarVisible}
        autoHideDuration={4000}
        title={errorMessage}
        severity='error'
        bottom={150}
      />
    </div>
  )
}

export default FileSource
