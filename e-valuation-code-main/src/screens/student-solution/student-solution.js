import React from 'react'
import Fab from '@material-ui/core/Fab'
import GetAppIcon from '@material-ui/icons/GetApp'
import 'firebase/firestore'
//import CustomSnackbar from "../../components/snackbars/custom-snackbar.js"
import HeaderHomeBack from '../../components/header/header-home-back'
import firebase from 'firebase/app'
import 'firebase/firestore'
import format from 'date-fns/format'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { Card, CardContent } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import { useDownloadURL } from 'react-firebase-hooks/storage'
import LinearProgress from '@material-ui/core/LinearProgress'
import { openTab } from '../../helpers'
import { useHistory } from 'react-router-dom'
import useCourse from '../../hooks/use-course'


export default function StudentSolution({match}) {

    //const {width, height} = getWindowDimensions()

    const { course_id, h_id, student_id } = match.params
    //const [visible, setVisible] = useState(false)
    
    
    const filename = h_id + "-" + student_id +".png"

    const firestore = firebase.firestore()

    // return a single document
    const studentRef = firestore.collection('courses')
        .doc(course_id)
        .collection("homework")
        .doc(h_id)
        .collection("solutions")
        .doc(student_id)

    const student = useDocumentData(studentRef)[0]

    const name = student?.name
    const surname = student?.surname
    let deliveryDate = ""
    if (student?.deliveryDate){
        deliveryDate = format(student.deliveryDate.toDate(), "dd/MM/yyyy HH:mm")
    }
    else{
        deliveryDate = ""
    }

    const homeworkSol = student?.homework

    let storage = firebase.storage()
    const homeworkRef = storage.ref(homeworkSol)
    const homeworkDownload = useDownloadURL(homeworkRef)[0]

    const homeworkTitleRef = firestore.collection('courses')
        .doc(course_id)
        .collection("homework")
        .doc(h_id)
    const [homework, homeworkLoading] = useDocumentData(homeworkTitleRef)

    const handleDownload = async event => {
        event.preventDefault();
        const response = await fetch(homeworkDownload)
        if (response.status === 200) {
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          link.remove();
          return { success: true };
        }
      };


    const query_results = (homeworkDownload && homework && student)

    const history = useHistory()
    const [,,, courseNotFound] = useCourse(course_id)
    const homeworkNotFound = !(homework || homeworkLoading)
    if (courseNotFound || homeworkNotFound) {
      history.push('/page-not-found')
    }

    const homeworkDocRef = firestore.collection('courses')
    .doc(course_id)
    .collection("homework")
    .doc(h_id)
    const [homeworkDoc, homeworkDocLoading] = useDocumentData(homeworkDocRef)

    let expirationDate = ""
    if (homeworkDoc?.expirationDate) {
        expirationDate = format(homeworkDoc.expirationDate.toDate(), "dd/MM/yyyy")
    }
    else {
        expirationDate = ""
    }

    let isUpdated = true
    if (student?.deliveryDate){
        isUpdated = student?.deliveryDate.toDate().getTime() > homeworkDoc?.updatedAt.toDate().getTime()
    }
    console.log(isUpdated)
    return (
        
        <div>{query_results ? 

            <div style={{paddingTop: '120px'}}>
                
                <HeaderHomeBack title={`${homework?.title}`} 
                subTitle={`${surname} ${name}, ${deliveryDate}`} 
                backArrow={`/course/${course_id}/homework/${h_id}/papers`}
                isOld={!isUpdated} />

                <Box m={1.5} pt={1.5}>
                    <Card width="75%" height="75%" >
                        <CardContent style={{  justifyContent:'center' , display: 'flex' }}>
                        <img 
                            src={`${homeworkDownload}`}
                            width="95%" height="95%" 
                            onClick={() => openTab(`${homeworkDownload}`)} />
                        </CardContent>
                    </Card>
                </Box>
                


                <Fab color='secondary' /*onClick={() => setVisible(true)}*/ style={{ position: 'fixed', right: 10, bottom: 10 }}>
                    <GetAppIcon onClick={e => handleDownload(e)}/>
                </Fab>
                {/*<CustomSnackbar */}
                {/*    visible={visible} */}
                {/*    setVisible={(visible) => setVisible(visible)} */}
                {/*    bottom = {70}*/}
                {/*    title={"Solution successfully downloaded!"} >*/}
                {/*</CustomSnackbar>*/}
            </div> : 

            <div>
                <HeaderHomeBack title={` `} 
                subTitle={` `} 
                backArrow={`/course/${course_id}/homework/${h_id}`} />
                <LinearProgress style={{marginTop: 112}} color="secondary"/> 
                
            </div>

        }</div>
    )
}

