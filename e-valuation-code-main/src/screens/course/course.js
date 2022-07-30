import React, { useState } from 'react'
import HeaderHomeBack from '../../components/header/header-home-back'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import { capitalizeString, extractDataFromDocumentSnapshot } from '../../helpers'
import HomeworkCard from './components/homework-card'
import { firestore } from '../../firebase'
import { useCollection } from 'react-firebase-hooks/firestore'
import { Link } from 'react-router-dom'
import { Container } from '@material-ui/core'
import format from 'date-fns/format'
import LinearProgress from '@material-ui/core/LinearProgress';
import CustomSnackbar from '../../components/snackbars/custom-snackbar'
import useCourse from '../../hooks/use-course'
import Typography from '@material-ui/core/Typography'
import { useHistory } from 'react-router-dom'
// const useStyle = makeStyles(theme => ({
//   root: {
//     backroundColor: theme.palette.background.default,
//     height: "100%",
//     overflow: "hidden",
//     paddingBottom: "40px"
//   }
// }
// ))

function Course({ match, homeworkCreated, homeworkEdited, setHomeworkCreated, setHomeworkEdited }) {
  //const classes = useStyle()

  const { course_id } = match.params;
  const [className, course] = course_id.split("-")

  const [, , , courseNotFound] = useCourse(course_id)

  // const homeworkRef = firestore.collection('courses')
  //   .doc(course_id)
  //   .collection("homework")
  // const query = homeworkRef.orderBy("expirationDate", "desc")
  // const [homework] = useCollectionData(query)

  const homeworkCollectionRef = firestore.collection(`courses/${course_id}/homework`)
  const query = homeworkCollectionRef.orderBy("expirationDate", "desc")
  const [homeworkSnapshot] = useCollection(query)

  const homework = homeworkSnapshot?.docs.map(doc => extractDataFromDocumentSnapshot(doc))
  const [visibleSnackBar, setVisibleSnackBar] = useState(false)

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const history = useHistory()
  if (courseNotFound) {
    history.push('/page-not-found')
  }



  return (
    <b>{homeworkSnapshot ?

      <div style={{ height: '100vh', overflow: 'hidden' }}>
        <HeaderHomeBack title={`${capitalizeString(course)}, ${className.toUpperCase()}`} backArrow="/" />
        <CustomSnackbar
          visible={visibleSnackBar}
          setVisible={setVisibleSnackBar}
          title="Homework deleted correctly"
          bottom={70}
        />
        <CustomSnackbar
          visible={homeworkEdited}
          setVisible={setHomeworkEdited}
          title="Homework modified correctly"
          bottom={70}
        />
        <CustomSnackbar
          visible={homeworkCreated}
          setVisible={setHomeworkCreated}
          title="Homework assigned correctly"
          bottom={70}
        />
        {courseNotFound ?
          (<Container style={{ paddingTop: 100 }}>
            <Typography variant='h5'>Course Not Found</Typography>
          </Container>) :
          (
            <Container style={{ paddingTop: '60px', marginBottom: '40px', height: '100%', overflow: 'scroll' }}>
              {homework && homework.map(({ id, title, expirationDate }, index) => {
                //const homework_id = title.toLowerCase().split(" ").join("-")
                return (
                  <HomeworkCard
                    key={id}
                    course_id={course_id}
                    homework_id={id}
                    title={title}
                    expirationDate={format(expirationDate.toDate(), "dd/MM/yyyy")}
                    is_expired={expirationDate.toDate() < today}
                    is_last={index === homework.length - 1}
                    setVisibleSnackBar={setVisibleSnackBar}
                    visibleSnackBar={visibleSnackBar}
                  />
                )
              })}
              <Link to={`/course/${course_id}/homework/create`} style={{ textDecoration: 'none' }}>
                <Fab color='secondary' style={{ position: 'fixed', right: 10, bottom: 10 }}>
                  <AddIcon />
                </Fab>
              </Link>
            </Container>
          )
        }
      </div> :
      <div>
        <HeaderHomeBack title={` `} backArrow={`/`} />
        <LinearProgress style={{ marginTop: 56 }} color="secondary" />

      </div>
    }</b>
  )
}

export default Course
