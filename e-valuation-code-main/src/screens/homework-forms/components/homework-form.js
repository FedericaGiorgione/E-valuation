import React from 'react'
import { Card, CardContent, InputAdornment, TextField, makeStyles } from '@material-ui/core'
import { CalendarToday as CalendarTodayIcon, Create as CreateIcon } from '@material-ui/icons'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import {addDays} from 'date-fns/fp'


const useStyle = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(3)
  },

  textField: {
    marginBottom: theme.spacing(3)
  },

  datePicker: {
    width: '100%'
  },
}))

function HomeworkForm (props) {
  // extract props
  const {
    title,
    setTitle,
    titleError,
    expiryDate,
    setExpiryDate,
    expiryDateError,
  } = props
  const classes = useStyle()

  const handleTitleChange = value => {
    // max 20 char
    if (value.length >= 20) {
      return
    }

    setTitle(value)
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <TextField
          className={classes.textField}
          label='Title'
          variant='outlined'
          value={title}
          onChange={event => handleTitleChange(event.target.value)}
          fullWidth
          InputProps={{
            endAdornment:
              <InputAdornment position='end'>
                <CreateIcon color='action'/>
              </InputAdornment>
          }}
          error={!!titleError}
          helperText={titleError}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            className={classes.datePicker}
            value={expiryDate}
            onChange={date => setExpiryDate(date)}
            variant=''
            inputVariant='outlined'
            format="dd/MM/yyyy"
            label="Expiry Date"
            disablePast
            maxDate={addDays(60, new Date())}
            error={!!expiryDateError}
            helperText={expiryDateError}
            InputProps={{
              endAdornment:
                <InputAdornment position='end'>
                  <CalendarTodayIcon color='action'/>
                </InputAdornment>
            }}
          />
        </MuiPickersUtilsProvider>
      </CardContent>
    </Card>
  )
}

export default HomeworkForm
