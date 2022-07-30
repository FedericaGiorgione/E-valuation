import {useEffect, useState} from 'react'
import {useDocumentData} from 'react-firebase-hooks/firestore'
import {firestore} from '../firebase'
//import {useHistory} from 'react-router-dom'

function useCourse(courseId) {
  const [courseNotFound, setCourseNotFound] = useState(false)
  const courseRef = firestore.doc(`courses/${courseId}`)
  const [courseData, courseDataLoading, courseDataError] = useDocumentData(courseRef)
  //const history = useHistory()

  useEffect(() => {
    // if course not loading and not undefined => course not found (nor)
    setCourseNotFound(!(courseData || courseDataLoading))
  }, [courseId, courseData, courseDataLoading])

  // useEffect(() => {
  //   if (courseNotFound) {
  //     history.push('/page-not-found')
  //   }
  // }, [courseNotFound, history])

  return [courseData, courseDataLoading, courseDataError, courseNotFound]
}

export default useCourse
