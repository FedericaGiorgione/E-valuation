import React, { useState } from 'react'
import HeaderHomeBack from '../../components/header/header-home-back'
import CustomFooter from '../../components/footers/custom-footer'
import 'firebase/firestore'
import Typography from '@material-ui/core/Typography'
import StudentLine from './components/student-line'
import { makeStyles, TableBody, TableCell, TableContainer, TableRow, Table, TableHead, useTheme } from '@material-ui/core'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore'
import format from 'date-fns/format'
import LinearProgress from '@material-ui/core/LinearProgress'
import { mdiFilter, mdiFilterOff } from '@mdi/js'
import Icon from '@mdi/react'
import useCourse from '../../hooks/use-course'
import {useHistory} from 'react-router-dom'

const useStyle = makeStyles(theme => ({
  table: {
    backgroundColor: 'white',
    tableLayout: 'fixed',
  }, 
}
))
;

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}


function Homework({ match }) {
  const classes = useStyle()
  const theme = useTheme()
  
  const {width, height} = getWindowDimensions()
  //console.log(height)
  const { course_id, h_id } = match.params
  //const title = capitalizeString(h_id.split("-").join(" "))

  const firestore = firebase.firestore()
  
  const solutionsRef = firestore.collection('courses')
    .doc(course_id)
    .collection("homework")
    .doc(h_id)
    .collection("solutions")

  const query = solutionsRef.orderBy('surname', 'asc', 'name', 'asc');

  const [solutions] = useCollectionData(query)
  const homeworkRef = firestore.collection('courses')
    .doc(course_id)
    .collection("homework")
    .doc(h_id)
  const [homework, homeworkLoading] = useDocumentData(homeworkRef)

  let expirationDate = ""
  if (homework?.expirationDate) {
    expirationDate = format(homework.expirationDate.toDate(), "dd/MM/yyyy")
  }
  else {
    expirationDate = ""
  }

  const query_results = solutions && homework

  const [showAll, setShowAll] = useState(true)
  const handleTable = () => {
    setShowAll(prevState => (!prevState))
  }

  const history = useHistory()
  const [,,, courseNotFound] = useCourse(course_id)
  const homeworkNotFound = !(homework || homeworkLoading)
  if (courseNotFound || homeworkNotFound) {
    history.push('/page-not-found')
  }

  const updatedAt = homework?.updatedAt

  return (

    <div>{query_results ? 

      <div style={{height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column'}}>
        <HeaderHomeBack
          title={`${homework?.title}`}
          subTitle={`To submit by ${expirationDate}`}
          backArrow={`/course/${course_id}`} />

          <div style={{marginTop: '137px', marginRight: '20px', marginLeft: '20px'}}>
            <TableContainer style={{ maxHeight: height-214, }}>
              <Table className={classes.table} stickyHeader  >

                <TableHead>
                  <TableRow>
                    <TableCell width='40%' style={{backgroundColor: 'white', borderBottom: 'solid', borderBottomColor: theme.palette.background.default,  textAlign: 'center'}}>
                      <Typography color='textSecondary' variant='h6'>Student</Typography>
                    </TableCell>
                    <TableCell width='40%' style={{backgroundColor: 'white', borderBottom: 'solid', borderBottomColor: theme.palette.background.default,  textAlign: 'center'}}>
                      <Typography color='textSecondary' variant='h6'>Submission date</Typography>
                    </TableCell>
                    <TableCell width='20%' style={{backgroundColor: 'white', borderBottom: 'solid', borderBottomColor: theme.palette.background.default, textAlign: 'center'}}>

                        {showAll ? 
                          (<Icon
                             onClick={handleTable}
                            path={mdiFilterOff}
                            color={theme.palette.primary.dark}
                            size='28px'
                            
                          /> ) : 
                          ( <Icon
                            onClick={handleTable}
                            path={mdiFilter}
                            color={theme.palette.primary.dark}
                            size='28px'
                            
                          /> )
                      }
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody style={{ width: "100%" }}>
                  {solutions && solutions.map(({ name, surname, deliveryDate, homework }) => (
                    <StudentLine
                      key={name + '-' + surname}
                      name={name}
                      surname={surname}
                      deliveryDate={deliveryDate}
                      //deliveryDate={deliveryDate ? format(deliveryDate.toDate(), "dd/MM/yyyy") : ""}
                      updatedAt={updatedAt}
                      homework={homework}
                      course_id={course_id}
                      h_id={h_id} 
                      showAll={showAll}
                      />
                  ))}
                </TableBody>

              </Table>
            </TableContainer>
          </div>
          <CustomFooter section={1} course_id={course_id} h_id={h_id} style={{ flex: 1 }}/>
      </div> :
    
      <div>
        <HeaderHomeBack title={` `} 
          subTitle={` `} 
          backArrow={`/course/${course_id}`} />
        <LinearProgress style={{marginTop: 112}} color="secondary"/>
        <CustomFooter section={1} course_id={course_id} h_id={h_id} style={{ flex: 1 }}/> 
      </div>

      }</div>



  )
}

export default Homework
