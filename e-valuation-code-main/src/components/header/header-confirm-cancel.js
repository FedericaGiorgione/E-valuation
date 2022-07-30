import { React, useState } from 'react'
import {
    makeStyles,
    AppBar,
    Toolbar,
    Typography,
} from '@material-ui/core'
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
//import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import SaveIcon from '@material-ui/icons/Save';
//import { Link } from 'react-router-dom';
import CustomDialog from "../dialogs/custom-dialog"



const useStyle = makeStyles(theme => ({
    root: {
        display: "flex",
        flexGrow: '1 2 1',
        justifyContent: 'space-between',
    },
    back: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    subHeader: {
        backgroundColor: theme.palette.primary.light
    }
}))





function HeaderConfirmCancel({ title, subTitle, onConfirm, onCancel, confirmMessage }) {

    const classes = useStyle()
    const [visibleCancel, setVisibleCancel] = useState(false)
    const [visibleUpload, setVisibleUpload] = useState(false)


    return (
        <div >
            <AppBar position='static' >
                <Toolbar className={classes.root} >
                    <IconButton edge="start" color="inherit" className={classes.root} onClick={() => setVisibleCancel(true)}>


                        <CloseIcon style={{ fontSize: 32 }}/>

                    </IconButton>
                    <CustomDialog
                        title={"Leave the homework?"}
                        message="Your changes will not be saved."
                        confirmLabel={"Leave"}
                        cancelLabel={"Stay"}
                        visible={visibleCancel}
                        setVisible={(visibleCancel) => setVisibleCancel(visibleCancel)}
                        confirmFunction={() => {
                            onCancel()
                            setVisibleCancel(false)
                        }}
                        cancelFunction={() => { setVisibleCancel(false) }}
                    />

                    <Typography variant='h6' className={classes.title}>
                        {title}
                    </Typography>
                    <IconButton color="inherit" style={{ paddingRight: 0 }} onClick={() => setVisibleUpload(true)} >

                        <SaveIcon style={{ fontSize: 32 }} />

                    </IconButton>
                    <CustomDialog
                        title={"Save Homework"}
                        message={confirmMessage}
                        confirmLabel={"Save"}
                        cancelLabel={"Back"}
                        visible={visibleUpload}
                        setVisible={(visibleUpload) => setVisibleUpload(visibleUpload)}
                        confirmFunction={() => {
                            onConfirm()
                            //console.log("Homework mandato correttamente");
                            setVisibleUpload(false)
                        
                        }}
                        cancelFunction={() => { setVisibleUpload(false) }}

                    />
                </Toolbar>
            </AppBar>
            {
                (subTitle) ? (
                    <AppBar className={classes.subHeader} position='static'>
                        <Toolbar>
                            <Typography variant='subtitle1'>
                                {subTitle}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                ) : null
            }
        </div >
    )
}

export default HeaderConfirmCancel
