import React from 'react'
import HeaderHomeBack from '../../components/header/header-home-back'
//import SubHeader from '../../components/header/header'
import CustomFooter from '../../components/footers/custom-footer'
import MessageList from './components/message-list'
import SendMessage from './components/send-message'
import firebase from 'firebase/app';
import 'firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore'
import format from 'date-fns/format'
import { useTheme } from '@material-ui/core'
import LinearProgress from '@material-ui/core/LinearProgress'
import { useHistory } from 'react-router-dom'
import useCourse from '../../hooks/use-course'


function Comments({ match }) {
  //const firestore = firebase.firestore();
  const { course_id, h_id } = match.params
  const [className, course] = course_id.split("-")


  const firestore = firebase.firestore()
  const homeworkRef = firestore.collection('courses')
    .doc(course_id)
    .collection("homework")
    .doc(h_id)

  const [homework, homeworkLoading] = useDocumentData(homeworkRef)
  const title = homework?.title
  let expirationDate = ""
  if (homework?.expirationDate) {
    expirationDate = format(homework.expirationDate.toDate(), "dd/MM/yyyy")
  }
  else {
    expirationDate = ""
  }

  const theme = useTheme()

  const history = useHistory()
  const [, , , courseNotFound] = useCourse(course_id)
  const homeworkNotFound = !(homework || homeworkLoading)
  if (courseNotFound || homeworkNotFound) {
    history.push('/page-not-found')
  }
  return (

    <div>{homework ?

      <div style={{ display: 'flex', flexDirection: 'column', overflow: 'visible' }}>
        <HeaderHomeBack
          title={`${title}`}
          subTitle={`To submit by ${expirationDate}`}
          backArrow={`/course/${className}-${course}`}
        />

        <MessageList
          match={match}
          style={{ flex: 1, width: '100%', overflow: 'scroll', background: theme.palette.background.default, paddingBottom: '140px', marginTop: '120px' }}
        />

        <div style={{ flex: 1, }}>
          <SendMessage match={match} />
          <CustomFooter section={2} course_id={course_id} h_id={h_id} />
        </div>
      </div> :

      <div>
        <HeaderHomeBack title={` `}
          subTitle={` `}
          backArrow={`/course/${course_id}/homework/${h_id}`} />
        <LinearProgress style={{ marginTop: 112 }} color="secondary" />
        <CustomFooter section={2} course_id={course_id} h_id={h_id} />
      </div>

    }</div>

  )
}

export default Comments
