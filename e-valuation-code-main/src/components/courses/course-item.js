import React, { Component } from 'react'
import { Paper, Container, Typography } from '@material-ui/core'

const s = {
  paper: {
    padding: 20,
    margin: 15
  }
}

export default class CourseItem extends Component {
  render() {
    const { course, className } = this.props

    return (
      <Paper style={s.paper} elevation={1}>
        <Container>
          <Typography variant='h5'>{course}</Typography>
          <Typography variant='h6'>{className}</Typography>
        </Container>
      </Paper>
    )
  }
}
