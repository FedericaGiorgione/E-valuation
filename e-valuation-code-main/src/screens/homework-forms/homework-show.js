import React, { useState } from 'react'
import { Container, makeStyles } from '@material-ui/core'
import LinearProgress from '@material-ui/core/LinearProgress'
import FilePicker from './components/file-picker'
import useCreateOrUpdate from './hooks/use-create-or-update'
import HeaderHomeBack from '../../components/header/header-home-back'
import firebase from 'firebase/app';
import 'firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore'
import format from 'date-fns/format'
import useFileLists from './hooks/use-file-lists'
import CustomFooter from '../../components/footers/custom-footer'
import Typography from '@material-ui/core/Typography'
import {useHistory} from 'react-router-dom'
import useCourse from '../../hooks/use-course'
import CustomSnackbar from '../../components/snackbars/custom-snackbar'

const useStyle = makeStyles(theme => ({
  filePicker: {
    height: '50vh',
    //marginTop: "90px"
  },

  fileSource: {
    position: 'absolute',
    bottom: 0,
  },

  container: {
    position: 'absolute', left: '50%', top: '50%',
    transform: 'translate(-50%, -50%)'
  },

}))
function HomeworkShow({ match, homeworkEdited, setHomeworkEdited }) {
  const classes = useStyle()
  const { course_id, h_id } = match.params
  const [className, course] = course_id.split("-")

  const firestore = firebase.firestore()
  const homeworkRef = firestore.collection('courses')
    .doc(course_id)
    .collection("homework")
    .doc(h_id)

  const [homework] = useDocumentData(homeworkRef)
  const title = homework?.title
  let expirationDate = ""
  if (homework?.expirationDate) {
    expirationDate = format(homework.expirationDate.toDate(), "dd/MM/yyyy")
  }
  else {
    expirationDate = ""
  }


  // hook to decide initial values (none if new or current values if exists)
  const [initialValues, initialValuesLoading, initialValuesError] = useCreateOrUpdate(course_id, h_id)
  const [
    remoteURLs,
    localFileList,
    toDeleteURLs,
    addFile,
    deleteFileFromIndex
  ] = useFileLists(`courses/${course_id}/homework/${h_id}/images`, 5)
  const storageURLs = remoteURLs.map(url => ({ url }))


  //const [fileSourceVisible, setFileSourceVisible] = useState(false)
  const [filePickerIndex, setFilePickerIndex] = useState(0)

  const today = new Date()
  today.setHours(0,0,0,0)

  const isExpired = homework?.expirationDate.toDate() < today

  const [,,, courseNotFound] = useCourse(course_id)
  const history = useHistory()
  if (courseNotFound || initialValuesError) {
    history.push('/page-not-found')
  }
  return (
    <div>
      
      {initialValuesLoading || initialValuesError ?
        <div>
          <HeaderHomeBack title={` `} 
            subTitle={` `} 
            backArrow={`/course/${className}-${course}`} />
          {initialValuesLoading ?
            <LinearProgress style={{marginTop: 112}} color="secondary"/> :
            <Container>
              <Typography variant='h5'>
                Error
              </Typography>
            </Container>
          }

        </div> :
          <div style={{ display: 'flex', flexDirection: 'column', overflow: 'visible'}}>
            <HeaderHomeBack
                title={title ?? ''}
                subTitle={isExpired ? `Expired on ${expirationDate ?? ''}` : `To submit by ${expirationDate ?? ''}`}
                backArrow={`/course/${className}-${course}`} 
                edit={!isExpired}
                isExpired={isExpired}
                course_id={course_id} 
                h_id={h_id}
                />

              <CustomSnackbar
                visible={homeworkEdited}
                setVisible={setHomeworkEdited}
                title="Homework modified correctly"
                bottom={70}
              />

            <Container className={classes.container}>
                <FilePicker
                    className={classes.filePicker}
                    fileList={[...storageURLs, ...localFileList]}
                    onRemoveFile={index => {
                    deleteFileFromIndex(index)
                    }}
                    index={filePickerIndex}
                    setIndex={setFilePickerIndex}
                    deleteFab={false}
                />
            </Container>
           
          </div>
      }

    <CustomFooter section={0} course_id={course_id} h_id={h_id} style={{ flex: 1 }}/>
    </div>
  )
}

export default HomeworkShow
