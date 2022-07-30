import {useState, useEffect} from 'react'
import { firestore } from '../../../firebase'

async function getCurrentValues(courseId, homeworkId) {
  const homeworkRef = firestore.doc(`courses/${courseId}/homework/${homeworkId}`)

  const doc = await homeworkRef.get()
  if (!doc.exists) {
    throw new Error("Homework doesn't exists")
  }

  const {title, expirationDate} = doc.data()
  return {
    title,
    expiryDate: expirationDate.toDate()
  }
}

function useCreateOrUpdate(courseId, homeworkId) {
  const [values, setValues] = useState({title: '', expiryDate: null})
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // init state
    setError(null)

    // if homework exists, try to load current values
    if (homeworkId) {
      setLoading(true)
      getCurrentValues(courseId, homeworkId)
        .then(homework => setValues(homework))
        .catch(e => setError(e))
        .finally(() => setLoading(false))
    }
    // else use empty values
  }, [courseId, homeworkId])

  return [values, loading, error]
}

export default useCreateOrUpdate
