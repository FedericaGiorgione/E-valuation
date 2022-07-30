import {useEffect, useState} from 'react'
import { firestore } from '../firebase'
import { useCollection, useCollectionData } from 'react-firebase-hooks/firestore'

function useNewMessages(courseId, homeworkId) {
  const messagesRef = firestore.collection(`/courses/${courseId}/homework/${homeworkId}/comments`)
  const messagesQuery = messagesRef.where('new','==', true)
  const [newMessagesSnapshot] = useCollection(messagesQuery)

  const [newMessages, setMessages] = useState([])
  useEffect(() => {
    const tmpList = []
    if (newMessagesSnapshot) {
      newMessagesSnapshot.forEach(v => tmpList.push({
        ...(v.data()),
        ref: v.ref
      }))
    }
    setMessages(tmpList)
  }, [newMessagesSnapshot])
  //newMessagesSnapshot?.map(v => console.log(v.data()))

  const newMessagesCounter = newMessages?.length ?? 0
  return [newMessages, newMessagesCounter]
}

export default useNewMessages
