import React from 'react'
import { makeStyles, Typography, Button } from '@material-ui/core'
import {  openTab } from '../../../helpers'

const useStyle = makeStyles(theme => ({
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    maxHeight: '90%',
    maxWidth: '93%',
  },
}))

function Image({className, url, isCentral}) {
  return (
    <>
    {isCentral ? 
      <img className={className} src={url} onClick={() => openTab(url)}/>
    :
      <img className={className} src={url}/>
    }
  </>
  )
}

function Pdf({className, url, isCentral, enabled, name}) {
  return (
    <div className={className}>
      <Typography>
        {name}:
      </Typography>
      {isCentral ? 
      <Button
        variant='contained'
        color='primary'
        onClick={() => openTab(url)}
      >
        Open
      </Button>
      :
      <Button
        variant='contained'
        color='primary'
      >
        Open
      </Button>
      }
    </div>
  )
}

function FileCard({url, type, isCentral, enabled, file}) {

  // silvia: enabled serve ancora? 

  const classes = useStyle()
  const isImage = type === 'image'
  const isPdf = type === 'pdf'

  // useEffect(() => {
  //   if (!isPdf) {
  //     return
  //   }
  //   fetch(url)
  //     .then(f => console.log('file: ', f))
  // }, [url, isPdf])

  let name = file?.file?.name

  if (isPdf && !name) {
    const url = new URL(file.url)
    const pathnameSplit = url.pathname.split('/')
    const filePtr = pathnameSplit[pathnameSplit.length - 1].split('%2F')
    name = filePtr[filePtr.length - 1]
    //name = fileName//.split('%').join(' ')
  }

  return (
    <div className={classes.root}>
      {isImage ?
        <Image
          className={classes.image}
          url={url}
          isCentral={isCentral}
        />
      : isPdf ?
        <Pdf
          className={classes.root}
          url={url}
          isCentral={isCentral}
          enabled={enabled}
          name={name}
        />
      : null}
    </div>
  )
}

export default FileCard
