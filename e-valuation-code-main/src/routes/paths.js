const paths = {
  courses: '/',
  course: '/course/:course_id',
  newHomework: '/course/:course_id/homework/create',
  editHomework: '/course/:course_id/homework/:h_id/edit',
  showHomework: '/course/:course_id/homework/:h_id',
  commentsHomework: '/course/:course_id/homework/:h_id/comments',
  papersHomework:  '/course/:course_id/homework/:h_id/papers',
  studentSolution: '/course/:course_id/homework/:h_id/:student_id',
  help : '/help',
  pageNotFound: '/page-not-found',

  // course id: classname.toLowerCase() + "-" + course.toLowerCase()
  // homework id: title.toLowerCase().split(" ").join("-")
  // student id: surname.toLowerCase() + "-" + name.toLowerCase()





}

export default paths
