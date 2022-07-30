import React, { useState, useEffect } from 'react'
import { makeStyles, InputAdornment, Button } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
//import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import firebase from 'firebase/app'
import 'firebase/firestore'
import AudioRecorder from "../../../components/audio-recorder/audio-recorder"
import Typography from '@material-ui/core/Typography'

const useStyle = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '60px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: theme.palette.primary.light,
        position: 'fixed',
        bottom: '56px',
        //borderBottom: 'solid thin',
        //borderBottomColor: theme.palette.background.default
    },
    inputForm: {
        display: 'flex',
        justifyContent: 'space-around',
        backgroundColor: theme.palette.primary.light, //'red',
    },
    inputText: {
        borderRadius: '8px',
        paddingBottom: '5px',
        flexGrow: 1,

    },
    icon: {
        color: theme.palette.primary.dark,
    }
}
))




const send = async (audioUrl, messagesRef, audioFolder, audioFolderRef) => {
    let res = await fetch(audioUrl) //.then(r => r.blob());
    res = await res.blob()
    
    const snapshot = await messagesRef.add({
        ID: "you",
        name: "Federica",
        surname: "Giorgione",
        audio: true,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
    const file = res
    const filename = snapshot.id + ".mp3"
    await audioFolderRef.child(filename).put(file)
    const path = audioFolder + "/" + filename

    await snapshot.update({message: path})

}


function SendMessage({ match }) {
    const classes = useStyle()

    const [audio, setAudio] = useState(null)
    const [sendingMessage, setSendingMessage] = useState(false)

    const { course_id, h_id } = match.params;
    //const [className, course] = course_id.split("-")
    //const [homework] = h_id

    const firestore = firebase.firestore()
    const messagesRef = firestore.collection('courses')
        .doc(course_id)
        .collection("homework")
        .doc(h_id)
        .collection("comments")

    const [formValue, setFormValue] = useState('');

    const storageRef = firebase.storage().ref();
    const audioFolder = `/courses/${course_id}/homework/${h_id}/comments`;
    const audioFolderRef = storageRef.child(`/courses/${course_id}/homework/${h_id}/comments`);

     useEffect( () => {
        if(audio){
            send(audio, messagesRef, audioFolder, audioFolderRef)
        } 
    }, [audio])  


    const [isRecording, setIsRecording] = useState(false)
    const textRecordingDisplay = isRecording ? 'block' : 'none'
    const textFieldDisplay = isRecording ? 'none' : 'block'

    return (
        <Container className={classes.root}>
            <div className={classes.inputForm} style={{ backgroundColor: 'white', margin: '10px', borderRadius: '8px', flexGrow: '4' }}>
                <Typography
                  style={{color: 'red', width: '80%', marginTop: 6, display: textRecordingDisplay}}
                >Recording...</Typography>
                <TextField onChange={(e) => { setFormValue(e.target.value) }}
                    style={{display: textFieldDisplay}}
                    value={formValue}
                    placeholder="Type your message"
                    variant="outlined"
                    size="small"
                    //multiline
                    className={classes.inputText}
                    InputProps={{
                        endAdornment: <InputAdornment position="end"><Button onClick={async (e) => {
                            e.preventDefault();

                            if (sendingMessage) {
                                return
                            }

                            setSendingMessage(true)
                            await messagesRef.add({
                                ID: "you",
                                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                                message: formValue,
                                name: "Federica",
                                surname: "Giorgione",
                                audio: false
                            })
                            setSendingMessage(false)

                            // resetting form value and scrolling to bottom
                            setFormValue('')
                        }} disabled={formValue === "" || sendingMessage}><SendIcon className={classes.icon} /></Button></InputAdornment>
                    }}
                />

            </div>
            <div>
                <AudioRecorder  setAudio={setAudio} setIsRecording={setIsRecording} />
            </div>
        </Container>
    )
}

export default SendMessage
