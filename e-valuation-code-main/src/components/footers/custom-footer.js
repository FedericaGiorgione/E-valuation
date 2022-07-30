import React from 'react'
import 'firebase/firestore'
import { makeStyles } from '@material-ui/core'
import AssignmentIcon from '@material-ui/icons/Assignment'
import { BottomNavigation, BottomNavigationAction, Divider } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useTheme } from "@material-ui/core/styles"
import ChatIcon from '@material-ui/icons/Chat'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import Badge from '@material-ui/core/Badge'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { firestore } from '../../firebase'
import useNewMessages from '../../hooks/useNewMessages'

const useStyle = makeStyles(theme => ({
  root: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    left: 0,
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    backgroundColor: theme.palette.primary.main,
    position: 'sticky',
  },
}
))


function CustomFooter({ section, course_id, h_id }) {

  const classes = useStyle()

  const [value, setValue] = React.useState(0);

  const theme = useTheme()

  const [, newMessagesCounter] = useNewMessages(course_id, h_id)

  return (

    <div className={classes.root}>
      <BottomNavigation showLabels={true} className={classes.footer} position='static' value={value} onChange={() => {
        setValue(section);
      }}>
        <BottomNavigationAction
          component={Link}
          to={`/course/${course_id}/homework/${h_id}`}
          label="Preview"
          icon={<MenuBookIcon />}
          style={{ color: (section === 0) ? 'white' : theme.palette.primary.light, flex: '1 1 auto' }} />
        <Divider orientation="vertical" flexItem />
        <BottomNavigationAction
          component={Link}
          to={`/course/${course_id}/homework/${h_id}/papers`}
          label="Solutions"
          icon={<AssignmentIcon />}
          style={{ color: (section === 1) ? 'white' : theme.palette.primary.light, flex: '1 1 auto' }} />
        <Divider orientation="vertical" flexItem />
        <BottomNavigationAction
          component={Link}
          to={`/course/${course_id}/homework/${h_id}/comments`}
          label="Comments"
          icon={<Badge badgeContent={newMessagesCounter} color='secondary'><ChatIcon /></Badge>}
          style={{ color: (section === 2) ? 'white' : theme.palette.primary.light, flex: '1 1 auto' }} />
      </BottomNavigation>
    </div>
  )
}

export default CustomFooter
