import React from 'react'
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core'
import InfoIcon from '@material-ui/icons/Info'
import { IconButton } from '@material-ui/core'
import { Link } from 'react-router-dom'

const useStyle = makeStyles(theme => ({
  root: {
    display: "flex",
    flexGrow: '1 2 1',
    justifyContent: 'space-between',
  },
  subHeader: {
    backgroundColor: theme.palette.primary.light
  }
}))
// serve ancora questo component con il subtitle? subtitle non è da togliere?
function Header({title, subTitle}) {
  const classes = useStyle()
  return (
    <div >
      <AppBar position='static'>
        <Toolbar className={classes.root}>
          <Typography variant='h6'>
            {title}
          </Typography>
          <Link to="/help" style={{ color: "inherit" }}>
            <IconButton color="inherit" style={{ paddingRight: 0 }} >
                <InfoIcon style={{ fontSize: 32 }} />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
      { (subTitle) ? (
        <AppBar className={classes.subHeader} position='static'>
        <Toolbar>
          <Typography variant='subtitle1'>
            {subTitle} 
          </Typography>
        </Toolbar>
      </AppBar>
       ) : null
    }
    </div>
  )
}

export default Header
