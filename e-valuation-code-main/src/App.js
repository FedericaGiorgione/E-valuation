import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import routes from './routes/routes'
import './App.css'
import paths from './routes/paths'
import HomeworkForms from './screens/homework-forms/homework-forms'
import Course from './screens/course/course'
import HomeworkShow from './screens/homework-forms/homework-show'

const useStyle = makeStyles(theme => ({
  root: {
    height: '100%',
    backgroundColor: theme.palette.background.default
  }
}))

function App() {
  const classes = useStyle()
  const [homeworkCreated, setHomeworkCreated] = useState(false)
  const [homeworkEdited, setHomeworkEdited] = useState(false)

  return (
    <Router>
      <div className={classes.root}>
        <Switch>
          <Route exact path={paths.newHomework} render={props => <HomeworkForms {...props} setHomeworkCreated={setHomeworkCreated}/>}/>
          <Route exact path={paths.editHomework} render={props => <HomeworkForms {...props} setHomeworkEdited={setHomeworkEdited}/>}/>
        {routes.map(({path, component, exact}) => (
          <Route key={path} exact={!!exact} path={path} component={component} />
        ))}
          <Route exact path={paths.course} render={props =>
            <Course
              {...props}
              homeworkCreated={homeworkCreated}
              setHomeworkCreated={setHomeworkCreated}
              homeworkEdited={homeworkEdited}
              setHomeworkEdited={setHomeworkEdited}
            />} />
          <Route exact path={paths.showHomework} render={props =>
            <HomeworkShow
              {...props}
              homeworkEdited={homeworkEdited}
              setHomeworkEdited={setHomeworkEdited}
            />}/>
        </Switch>
      </div>
    </Router>
  )
}

export default App;
