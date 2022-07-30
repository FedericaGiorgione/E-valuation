import React, { useState } from 'react'
import { Container } from '@material-ui/core'
import CourseItem from './course-item'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import Record from "../components/recorder"

/*
export default class ClassList extends Component {
  render() {
    const { list } = this.props
    return (
      <Container>
        {list.map(item => (
          <ClassItem title={item.subject} classRoom={item.classRoom}/>
        ))}
      </Container>
    )
  }
}
*/

export default function Courses() {
  const firestore = firebase.firestore()
  const coursesRef = firestore.collection('courses')
  const query = coursesRef.limit(5)

  const [courses] = useCollectionData(query)

  return (
    <Container>
      {courses && courses.map(({ course, className }) => (
        <CourseItem key={course + '-' + className} title={course} className={className} />
      ))}
      <Record></Record>
    </Container>
  )
}