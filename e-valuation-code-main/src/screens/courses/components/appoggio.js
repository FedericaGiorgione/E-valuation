import React, {useEffect} from 'react'
import 'firebase/firestore'
import useNewMessages from '../../../hooks/useNewMessages'

export default function Appoggio({ course_id, homework_id, counter_update }){
    const [, newMessagesCounter] = useNewMessages(course_id, homework_id)

    useEffect(() => {
        if(newMessagesCounter >= 0)
            counter_update(course_id+'-'+homework_id, newMessagesCounter)
    }, [counter_update, newMessagesCounter, course_id, homework_id])

    return ( <div style={{display: 'none'}}/>)
}
