import paths from './paths'
import Courses from '../screens/courses/courses'
import Course from '../screens/course/course'
import Homework from '../screens/solutions/homework'
import HomeworkForms from '../screens/homework-forms/homework-forms'
import HomeworkShow from '../screens/homework-forms/homework-show'
import StudentSolution from '../screens/student-solution/student-solution'
import Comments from '../screens/comments/comments'
import Help from '../screens/help/help'
import PageNotFound from '../screens/page-not-found/page-not-found'

const routes = [
  {
    path: paths.courses,
    component: Courses,
    // component: HomeworkForms,
    exact: true
  },
  // {
  //   path: paths.course,
  //   component: Course,
  //   exact: true
  // },
  {
    path: paths.commentsHomework,
    component: Comments,
    exact: true
  },
  // {
  //   path: paths.newHomework,
  //   component: HomeworkForms,
  //   exact: true
  // },
  // {
  //   path: paths.editHomework,
  //   component: HomeworkForms,
  //   exact: true,
  // },
  // {
  //   path: paths.showHomework,
  //   component: HomeworkShow,
  //   exact: true
  // },
  {
    path: paths.papersHomework,
    component: Homework,
    exact: true
  },
  {
    path: paths.commentsHomework,
    component: Comments,
    exact: true
  },
  {
    path: paths.studentSolution,
    component: StudentSolution,
    exact: true
  },
  {
    path: paths.help,
    component: Help,
    exact: true
  },
  {
    path: paths.pageNotFound,
    component: PageNotFound,
    exact: true
  },
]

export default routes
