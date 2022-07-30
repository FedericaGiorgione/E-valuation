import React, { useEffect, useRef } from 'react'
import { Container, makeStyles, Chip } from '@material-ui/core'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { extractDataFromDocumentSnapshot } from '../../../helpers'
import { useCollection } from 'react-firebase-hooks/firestore'
import format from 'date-fns/format'
import TextMessage from './text-message'
import AudioMessage from './audio-message'
import { StayCurrentLandscapeTwoTone } from '@material-ui/icons'
import useNewMessages from '../../../hooks/useNewMessages'

const useStyle = makeStyles(theme => ({
    messageSender: {
        color: theme.palette.primary.main,
        padding: '1px'
    },
    messageBox: {
        color: theme.palette.primary.light, //'white',
        backgroundColor: 'white', //theme.palette.primary.light,
        display: 'inline-block',
        padding: '2px 5px',
        borderRadius: '8px',
        lineHeight: '22px',
        width: 'auto',
        maxWidth: '90%'
    },
    chip: {
        color: 'darkgray', 
        backgroundColor: 'white',
        margin: "0 auto"
    },
    messageList: {
        //padding: '5px 40px 5px 0px',
        //width: '100%',
        //overflow: 'scroll',
        //paddingBottom: '20px',
        //width: '100%',
        //height: 'auto',
        //maxHeight: '90vh',
        //paddingBottom: '130px',
    }
}
))


function MessageList({ match, style }) {
    const classes = useStyle()

    // getting the message and sorting them by time of creation
    const { course_id, h_id } = match.params;

    const firestore = firebase.firestore()
    const messagesRef = firestore.collection('courses')
        .doc(course_id)
        .collection("homework")
        .doc(h_id)
        .collection("comments")

    const query = messagesRef.orderBy('createdAt', 'asc').limitToLast(25);

   //const newMessagesQuery = messagesRef.where('')

    //const [messages] = useCollectionData(query, { idField: 'id' });

    const [messagesSnapshot] = useCollection(query, { idField: 'id' })

    const messages = messagesSnapshot?.docs.map(doc => extractDataFromDocumentSnapshot(doc))
    
    let previousDate = ""
    let currentDate = ""
    let today = new Date()
    today.setHours(0,0,0,0)
    let yesterday = new Date(new Date().setDate(new Date().getDate()-1))
    yesterday.setHours(0,0,0,0)
    let textChip = ""
    let displayChip = false

    
    // we will use this to scroll to bottom of chat on page-reload and after sending a message
    const dummy = useRef();
    useEffect(() => {
        if (dummy.current) {
            
            dummy.current.scrollIntoView(
            {
              behavior: 'smooth',
              block: 'end',
              inline: 'nearest'
            })
        }
      }, [messages])

    // get new messages and clear them
    const [newMessages] = useNewMessages(course_id, h_id)
    newMessages.forEach(nm => nm.ref.update({new: false}))

    return (
       <Container /*className={classes.messageList}*/ style={style} ref={dummy}>
            {messages && messages.map(msg => {

                
                const { ID, name, surname, audio, message, createdAt } = msg;

                currentDate = createdAt?.toDate()
                currentDate?.setHours(0,0,0,0)

                if (previousDate === ""){
                    // print current date
                    if (currentDate){
                        textChip = format(currentDate, "do MMMM")
                        if (currentDate?.getTime() == today.getTime()){
                            textChip = "Today"
                        }
                        if (currentDate?.getTime() == yesterday.getTime()){
                            textChip = "Yesterday"
                        }
                        displayChip = true
                        previousDate = currentDate
                    }
                    
                } else {
                    if (previousDate.getTime() !== currentDate?.getTime()){
                        if (currentDate){
                            textChip = format(currentDate, "do MMMM")
                            if (currentDate?.getTime() == today.getTime()){
                                textChip = "Today"
                            }
                            if (currentDate.getTime() == yesterday.getTime()){
                                textChip = "Yesterday"
                            }
                            displayChip = true
                            previousDate = currentDate
                        }
                    }
                } 

                
                return (
                <div>
                { msg ? 
                <>
                        { displayChip ?
                        <div style={{display: "flex"}}>
                            <Chip size="small" className={classes.chip} label={textChip} />
                            {displayChip = false}
                        </div>
                        : <> </>
                        }
                        { audio ? 
                        /* audio message */

                            <AudioMessage msg={msg}  messageSender={classes.messageSender} />
                        :
                        /* text message */ 
                            <TextMessage msg={msg} messageSender={classes.messageSender} messageBox={classes.messageBox} />
                        }
                </>
                : null }
                </div>  )
            })
            }
        </Container>
    )
}

export default MessageList
