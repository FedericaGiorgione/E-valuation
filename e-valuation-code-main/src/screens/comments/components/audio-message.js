import {React} from 'react'
import { makeStyles } from '@material-ui/core'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { useDownloadURL } from 'react-firebase-hooks/storage'
import AudioPlayer from 'material-ui-audio-player';
import format from 'date-fns/format'

const useStyles = makeStyles((theme) => {
    return {
    root: {
        color: theme.palette.primary.light, //'white',
        backgroundColor: 'white', //theme.palette.primary.light,
        display: 'inline-flex',
        padding: '3px',
        borderRadius: '8px',
        lineHeight: '24px',
        width: "250px",
        height: "60px",
        margin: "0px"
        },
    commonContainer: {
        color: theme.palette.primary.light,
        height: "20px",
        padding: "5px"
    },
    sliderContainerWrapper: {
        height: "10px"
    },
    slider: {
        padding: "0px"
    },
    playIcon: {
        color: theme.palette.primary.dark,
    },
    pauseIcon: {
        color: theme.palette.primary.dark,
    },
    progressTime: {
        color: theme.palette.primary.dark,
    },
    };
  }); 

function AudioMessage({ msg, messageSender }) {

    const storage = firebase.storage();
    const audioRef = storage.ref(msg.message)
    const audioUrlFs = useDownloadURL(audioRef)[0]
    /*let audioUrl = ""
    const handleDownload = async event => {
        event.preventDefault();
        const response = await fetch(audioUrlFs)
        console.log("Status ", response.status)
        if (response.status === 200) {
            const blob = await response.blob();
            audioUrl = URL.createObjectURL(blob);
            console.log("url ", audioUrl)
        } } */

    return(
        <ul style={{ textAlign: (msg.ID === 'you') ? 'right' : 'left', listStyle: 'none' }}>
            <li key={msg.id}>
                { 
                    <>
                    <div className={messageSender} style={{ opacity: (msg.ID === 'you') ? '0.6' : '1'}}>
                        {(msg.ID === 'you') ? 'you' : (msg.name + ' ' + msg.surname)}
                    </div>
                    
                        {/*msg.message */}
                        { /* console.log("url ", audioUrlFs) */ }
                        <AudioPlayer  useStyles={useStyles} src={audioUrlFs}  variation="primary" volume={false}/> 
                        <div style={{fontSize: "13.5px", color: "darkgray", textAlign: "right"}}>
                            { msg.createdAt ? format(msg?.createdAt.toDate(), "HH:mm") : "" }
                        </div>
                    </>}

            </li>
        </ul>
    )

}

export default AudioMessage