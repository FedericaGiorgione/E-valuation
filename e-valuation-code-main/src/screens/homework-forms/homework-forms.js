import React, { useState, useCallback, useEffect, useRef } from 'react'
import { Container, Fab, makeStyles } from '@material-ui/core'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import LinearProgress from '@material-ui/core/LinearProgress'
import HeaderConfirmCancel from '../../components/header/header-confirm-cancel'
import FilePicker from './components/file-picker'
import FileSource from './components/file-source'
import HomeworkForm from './components/homework-form'
import UploadFilesDialog from './components/upload-files-dialog'
import { useHistory } from 'react-router-dom'
import useForm from './hooks/use-form'
import useSaveHomework from './hooks/use-save-homework_v2'
import useCreateOrUpdate from './hooks/use-create-or-update'
import useFileLists from './hooks/use-file-lists'
import Typography from '@material-ui/core/Typography'
import useCourse from '../../hooks/use-course'
import Popover from '@material-ui/core/Popover'
import usePopoverError from './hooks/use-popover-error'

const useStyle = makeStyles(theme => ({
  filePicker: {
    height: '50vh'
  },

  fileSource: {
    position: 'absolute',
    bottom: 0,
  },

  container: {
    marginTop: "20px",
  },

  dismissFileSourceLayer: {
    position: 'fixed',
    width: '100vw',
    height: '100vh',
    bottom: 0,
    zIndex: 4,
  },

  fab: {
    position: 'fixed',
    right: theme.spacing(1),
    bottom: theme.spacing(2),
  },

  popoverError: {
    padding: theme.spacing(2)
  },
}))
function HomeworkForms({ match, setHomeworkCreated, setHomeworkEdited }) {
  const classes = useStyle()
  const { course_id, h_id } = match.params
  // if homeworkId is not defined it is a new homework
  const isNew = !h_id

  // navigation hook
  const routerHistory = useHistory()

  // hook to decide initial values (none if new or current values if exists)
  const [initialValues, initialValuesLoading, initialValuesError] = useCreateOrUpdate(course_id, h_id)

  // hook to manage file lists
  const [
    remoteURLs,
    localFileList,
    toDeleteURLs,
    addFile,
    deleteFileFromIndex
  ] = useFileLists(`courses/${course_id}/homework/${h_id}/images`, 5)
  const storageURLs = remoteURLs.map(url => ({ url }))

  // hook to manage saving of changes
  const [
    saveHomeworkChanges,
    saveLoading,
    /*saveError*/,
    currentUploadingFileNumber,
    currentUploadingFilePercentage,
  ] = useSaveHomework(course_id, h_id)

  // hook to manage form
  const onSubmit = useCallback(homework => {
    saveHomeworkChanges(
      homework,
      localFileList.map(item => item.file),
      toDeleteURLs,
      () => {
        setHomeworkEdited && setHomeworkEdited(true)
        setHomeworkCreated && setHomeworkCreated(true)
        routerHistory.goBack()
      },
      error => console.log('saving error', error)
    )
  }, [saveHomeworkChanges, localFileList, toDeleteURLs, routerHistory])
  const { values, handleChanges, handleSubmit, errors, clearErrors } =
    useForm(initialValues, onSubmit, remoteURLs.length + localFileList.length)

  const [fileSourceVisible, setFileSourceVisible] = useState(false)
  const [filePickerIndex, setFilePickerIndex] = useState(0)

  const [, , , courseNotFound] = useCourse(course_id)

  const history = useHistory()

  if (initialValuesError || courseNotFound) {
    history.push('/page-not-found')
  }

  const totalNumberOfFiles = storageURLs.length + localFileList.length
  const filePickerDisplay = totalNumberOfFiles> 0 ? 'block' : 'none'

  const fabRef = useRef()
  const [anchorEl, popoverOpen] = usePopoverError(errors.fileNumber, fabRef)

  return (
    <div>
      <HeaderConfirmCancel
        title={isNew ? 'Create Homework' : 'Edit Homework'}
        onConfirm={handleSubmit}
        onCancel={routerHistory.goBack}
        confirmMessage={isNew ? "Are you sure you want to assign this homework?" : "Are you sure you want to edit this homework?"}
      />
      {initialValuesLoading ?
        <div>
          <LinearProgress color='secondary' />
        </div> : initialValuesError || courseNotFound ?
          <div>
            <Container>
              <Typography style={{marginTop: 10}} variant='h5'>
                {courseNotFound ? 'Course Not Found' : 'Homework not found'}
              </Typography>
            </Container>
            {/* error */}
          </div> :
          <div>
            <Container className={classes.container}>
              <HomeworkForm
                className={classes.homeworkForm}
                title={values.title}
                setTitle={value => handleChanges('title', value)}
                titleError={errors.title}
                expiryDate={values.expiryDate}
                setExpiryDate={value => handleChanges('expiryDate', value)}
                expiryDateError={errors.expiryDate}
              />
              <FilePicker
                style={{display: filePickerDisplay}}
                className={classes.filePicker}
                fileList={[...storageURLs, ...localFileList]}
                onRemoveFile={index => {
                  // setFileToDeleteIndex(index)
                  // setDeleteFileDialogVisible(true)
                  deleteFileFromIndex(index)
                }}
                index={filePickerIndex}
                setIndex={setFilePickerIndex}
                errorMessage={errors.fileNumber}
                deleteFab={true}
              />
            </Container>
            <Fab
              ref={fabRef}
              className={classes.fab}
              color='secondary'
              style={fileSourceVisible ? { transform: 'translateY(-100%)' } : null}
              onClick={() => setFileSourceVisible(true)}
            >
              <AttachFileIcon />
            </Fab>
            <Popover
              anchorEl={anchorEl}
              open={popoverOpen}
              onClose={() => clearErrors('fileNumber')}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 70,
                horizontal: 'center',
              }}
            >
              <Typography className={classes.popoverError} color='error'>Please, attach a file</Typography>
            </Popover>

            <div
              style={{ display: fileSourceVisible ? 'block' : 'none' }}
              className={classes.dismissFileSourceLayer}
              onClick={() => setFileSourceVisible(false)}
            >
              <FileSource
                className={classes.fileSource}
                fileNumber={storageURLs.length + localFileList.length}
                maximumFileNumber={5}
                onAddFile={file => {
                  addFile(file)
                  setFilePickerIndex(storageURLs.length + localFileList.length)
                  setFileSourceVisible(false)
                }}
              />
            </div>
            <div
              style={{ display: fileSourceVisible ? 'block' : 'none' }}
              className={classes.dismissFileSourceLayer}
              onClick={() => setFileSourceVisible(false)}
            >
              <FileSource
                className={classes.fileSource}
                fileNumber={storageURLs.length + localFileList.length}
                maximumFileNumber={5}
                onAddFile={file => {
                  clearErrors('fileNumber')
                  addFile(file)
                  setFilePickerIndex(storageURLs.length + localFileList.length)
                  setFileSourceVisible(false)
                }}
              />
            </div>
            <UploadFilesDialog
              visible={saveLoading && localFileList?.length > 0}
              currentFilePercent={currentUploadingFilePercentage}
              currentFileNumber={currentUploadingFileNumber}
              fileNumber={localFileList.length}
            />
          </div>
      }
    </div>
  )
}

export default HomeworkForms
