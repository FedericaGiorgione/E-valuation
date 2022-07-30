import React from 'react'
import Header from '../../components/header/header'
import { Container } from '@material-ui/core'
import CourseCard from './components/course-card'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import LinearProgress from '@material-ui/core/LinearProgress'



function Courses() {

  const firestore = firebase.firestore()
  const coursesRef = firestore.collection('courses')
  const query = coursesRef.orderBy("className", "asc")

  const [courses] = useCollectionData(query)

  return (
    <div>{courses ? 
      <div>
        <Header title="E-valuation" />

        <Container>
          <div>
            {courses && courses.map(({ course, className }) => (
              <CourseCard key={course + '-' + className} course={course} className={className} />
            ))}
          </div>
        </Container>
      </div> :

      <div>
        <Header title="E-valuation" />
          <LinearProgress color="secondary"/> 
      </div>
    }</div>
  )


}

export default Courses
