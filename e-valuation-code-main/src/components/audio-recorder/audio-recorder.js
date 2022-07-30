import React, {useState, useRef, useEffect, useCallback} from 'react'
import Mp3Recorder from 'react-mp3-recorder'
import MicIcon from '@material-ui/icons/Mic';
import StopIcon from '@material-ui/icons/Stop';
import { makeStyles } from '@material-ui/core'
import { Fab } from '@material-ui/core'

const useStyle = makeStyles(theme => ({
  icon: {
      color: theme.palette.primary.dark,
  }
}
))



function Recorder ({setAudio, setRecord, setIsRecording}){ //, onRecordingError}) {
  const classes = useStyle()
  const recorderRef = useRef()
  const [isBlocked, setBlocked] =useState(true)
  const [isPressingRecord, setPressingRecord] = useState(false)
  const [isRecording, setIsRecordingLocal] = useState(false)

  const setRecording = useCallback(value => {
    setIsRecording(value)
    setIsRecordingLocal(value)
  }, [setIsRecording, setIsRecordingLocal])

  const tryToRecord = () => {
    setPressingRecord(true)
    if (isBlocked) {
      checkPermissionForAudio()
    } else {
      startRecording()
    }
  }
  

  const startRecording = useCallback(() => {
    if (!isPressingRecord) {
      return
    }

    if (!isRecording) {
      setRecording(true)
      recorderRef.current._onMouseDown()
    }
  }, [isPressingRecord, isRecording, recorderRef, setRecording])

  const stopRecording = () => {
    if (isRecording) {
      setRecording(false)
      recorderRef.current._onMouseUp()
    }
    setPressingRecord(false)
  }

  useEffect(() => {
    if (!isBlocked && isPressingRecord) {
      startRecording()
    }
  }, [isBlocked, startRecording, isPressingRecord])

  const checkPermissionForAudio = () => {
    if (navigator.mediaDevices === undefined) {
      navigator.mediaDevices = {};
    }
    if (navigator.mediaDevices.getUserMedia === undefined) {
      navigator.mediaDevices.getUserMedia = function(constraints) {
        // First get ahold of the legacy getUserMedia, if present
        var getUserMedia =
          // navigator.getUserMedia ||
          navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        // Some browsers just don't implement it - return a rejected promise with an error
        // to keep a consistent interface
        if (!getUserMedia) {
          return Promise.reject(
            new Error("getUserMedia is not implemented in this browser")
          );
        }

        // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
        return new Promise(function(resolve, reject) {
          getUserMedia.call(navigator, constraints, resolve, reject);
        });
      };
    }
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(stream => {
        setBlocked(false)
      })
      .catch(err => {
        setBlocked(true)
        console.log("Please give permission for the microphone to record audio.");      
        console.log(err.name + ": " + err.message);
      });
  }


  //const {setAudio} = this.props

  return (
    <>

    <Fab
      key={1}
      size={'small'}
      style={{ backgroundColor: 'white', marginTop: '10px' }}

      onTouchStart={tryToRecord}
      onTouchEnd={stopRecording}
      onTouchCancel={stopRecording}
      >
              
        <Mp3Recorder
          style={{display: 'none'}}
          ref={recorderRef}

          //onRecordingError={onRecordingError}
          onRecordingComplete={res => {
            setAudio(URL.createObjectURL(res))
          }
        }
        />

      { /*isRecording ? <StopIcon style={{color: 'red'}}/> :*/ <MicIcon className={classes.icon}/> }
    </Fab>
    </>
  )
}

export default Recorder
