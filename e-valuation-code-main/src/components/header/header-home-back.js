import {React, useState} from 'react'
import {
    makeStyles,
    AppBar,
    Toolbar,
    Typography,
} from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import { Link } from 'react-router-dom'
import CreateIcon from '@material-ui/icons/Create'
import InfoIcon from '@material-ui/icons/Info'
import { useLocation } from 'react-router-dom';
import CustomSnackbar from '../../components/snackbars/custom-snackbar'
import WarningIcon from '@material-ui/icons/Warning'
import { useTheme } from "@material-ui/core/styles"


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
        backgroundColor: theme.palette.primary.light,
        marginTop: '56px',
    }
}))


function HeaderHomeBack({ title, subTitle, backArrow, edit, isFaq, isOld, course_id, h_id, backFunction }) {

    const location = useLocation();
    const [visible, setVisible] = useState(false)
    
    const classes = useStyle()
    const theme = useTheme()
    return (
        <div >
            <AppBar  >
                <Toolbar className={classes.root} >
                    {backFunction ?
                      (
                        <IconButton edge="start" color="inherit" className={classes.root} onClick={backFunction}>
                            <ArrowBackIosIcon />
                        </IconButton>
                      ) :
                      (
                          <Link to={backArrow} style={{ color: "inherit" }}>
                              <IconButton edge="start" color="inherit" className={classes.root}>
                                  <ArrowBackIosIcon />
                              </IconButton>
                          </Link>
                      )}


                    <Typography variant='h6' className={classes.title}>
                        {title}
                    </Typography>

                    
                    {edit ?
                         <Link to={`/course/${course_id}/homework/${h_id}/edit`} style={{ color: "inherit" }}>
                            <IconButton color="inherit"  style={{ paddingRight: 0 }}>
                                <CreateIcon style={{ fontSize: 32 }} />
                            </IconButton>
                        </Link>
                    : <> </>}

                    {isFaq ?
                        <> </>
                    : <Link to={{pathname: "/help", state: { prevPath: location.pathname }}} style={{ color: "inherit" }}>
                            <IconButton color="inherit" style={{ paddingRight: 0 }} >
                                <InfoIcon style={{ fontSize: 32 }} />
                            </IconButton>
                        </Link>}
                    

                    <Link to="/" style={{ color: "inherit" }}>
                        <IconButton color="inherit" style={{ paddingRight: 0 }} >
                            <HomeIcon style={{ fontSize: 32 }} />
                        </IconButton>
                    </Link>
                </Toolbar>
            </AppBar>
            {
                (subTitle) ? (
                    <>
                    <AppBar className={classes.subHeader} >
                        <Toolbar>
                            <Typography variant='subtitle1' className={classes.title}>
                                {subTitle}
                            </Typography>
                            {(isOld) ? (
                            <>
                                <IconButton color="inherit" style={{ paddingRight: 0 }} onClick={() => setVisible(true)}>
                                    <WarningIcon style={{ fontSize: 32, color: theme.palette.warning.main  }} />
                                </IconButton>
                                <CustomSnackbar
                                visible={visible}
                                setVisible={setVisible}
                                title="The solution refers to an old version of the homework."
                                bottom={70}
                                severity="warning"
                                />
                            </>
                        ) : null}
                        </Toolbar>
                        
                    </AppBar>
                    
                    </>
                ) : null
            }
        </div >
    )
}

export default HeaderHomeBack
