import React, { useState } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton'
import { Link } from 'react-router-dom'
import CreateIcon from '@material-ui/icons/Create'
import DeleteIcon from '@material-ui/icons/Delete'
import { makeStyles } from '@material-ui/core'
import CustomDialog from "../../../components/dialogs/custom-dialog"
import Box from '@material-ui/core/Box';
import { firestore } from '../../../firebase'
import 'firebase/firestore'
import TimerOffIcon from '@material-ui/icons/TimerOff'
import CustomSnackbar from '../../../components/snackbars/custom-snackbar'
import { useTheme } from "@material-ui/core/styles"
import Badge from '@material-ui/core/Badge'
import useNewMessages from '../../../hooks/useNewMessages'


const useStyle = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
}
))


export default function HomeworkCard({ homework_id, title, expirationDate, is_expired, course_id, is_last, setVisibleSnackBar, visibleSnackBar }) {
    const classes = useStyle()
    const [visible, setVisible] = useState(false)

    const theme = useTheme()

    const homeworkRef = firestore.collection(`courses/${course_id}/homework/`);
    const [visibleSnackBarWarning, setVisibleSnackBarWarning] = useState(false)

    function removeHomework(homework_id) {

        homeworkRef.doc(homework_id).delete()
            .then(function () {
                //console.log("Document successfully deleted!");
                setVisibleSnackBar(true);
            }).catch(function (error) {
                console.error("Error removing document: ", error);
            });;
        setVisible(false);

        // delete subcollection solutions
        homeworkRef.doc(homework_id).collection("solutions").get().then(function(snapshot) {
            snapshot.forEach(function(doc) {
              doc.ref.delete();
            })
          })

        // delete subcollection comments
        homeworkRef.doc(homework_id).collection("comments").get().then(function(snapshot) {
            snapshot.forEach(function(doc) {
              doc.ref.delete();
            })
          })
    }

    const [, newMessagesCounter] = useNewMessages(course_id, homework_id)
    return (
        <Box m={1} pt={1} mb={is_last ? 3 : 1}>
            <Badge style={{
                position: 'absolute',
                display: 'block',
                right: theme.spacing(3),
            }} color='secondary' component='div' badgeContent={newMessagesCounter}/>
            <Card>
                <CardContent className={classes.root}>
                    <Link to={`/course/${course_id}/homework/${homework_id}`} style={{ textDecoration: 'none', flexGrow: "1" }}>
                        <div>
                            <Typography color="textSecondary">
                                {title}
                            </Typography>

                            <Typography color="textSecondary">
                                {expirationDate}
                            </Typography>
                        </div>
                    </Link >
                    <div>
                        { is_expired ?
                            <>
                            <IconButton size='small' onClick={() => setVisibleSnackBarWarning(true)}>
                                <TimerOffIcon style={{color: theme.palette.warning.main}} />
                            </IconButton>

                            <CustomSnackbar
                            visible={visibleSnackBarWarning}
                            setVisible={setVisibleSnackBarWarning}
                            title="The homework has expired, you cannot modify or delete it."
                            bottom={70}
                            severity="warning"
                            />

                            </>
                        :
                        <>
                            <Link to={`/course/${course_id}/homework/${homework_id}/edit`}>
                                <IconButton size='small'>
                                    <CreateIcon color='primary' />
                                </IconButton>
                            </Link>

                            <IconButton size='small' onClick={() => setVisible(true)}>
                                <DeleteIcon color='primary' />
                            </IconButton>
                        </>

                        }



                        <CustomDialog
                            title={"Delete Homework?"}
                            message="Permanently delete this homework?"
                            confirmLabel={"Delete"}
                            cancelLabel={"Don't Delete"}
                            visible={visible}
                            setVisible={(visible) => setVisible(visible)}
                            confirmFunction={() => { removeHomework(homework_id) }}
                            cancelFunction={() => { setVisible(false) }} />

                    </div>

                </CardContent >
            </Card >
        </Box>
    )

}
