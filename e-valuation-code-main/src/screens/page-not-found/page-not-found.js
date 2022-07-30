import React from 'react'
import HeaderHomeBack from '../../components/header/header-home-back'
import { Container } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import {useHistory} from 'react-router-dom'

function PageNotFound() {
  const history = useHistory()
  return (
    <>
      <HeaderHomeBack
        title='Page Not Found'
        backFunction={() => history.go(-2)}
      />
      <Container style={{paddingTop: 80}}>
        <Typography variant='h4'>
          Page Not Found
        </Typography>
      </Container>
    </>
  )
}

export default PageNotFound
