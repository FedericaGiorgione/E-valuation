import {useState} from 'react'

function validateTitle(title) {
  if (!title || title === '') {
    return 'Please, insert a title'
  }

  return null
}

function validateExpiryDate(expiryDate) {
  if(!expiryDate) {
    return 'Please, insert a date'
  }

  return null
}

function validateFileNumber(fileNumber) {
    if(!fileNumber || fileNumber <= 0) {
      return 'Please, attach a file'
    }
  }

function useValidator({title, expiryDate, fileNumber}) {
  // const [titleTouched, setTitleTouched] = useState(false)
  const [errors, setErrors] = useState({})

  // useEffect(() => {
  //   if (titleTouched) {
  //
  //   } else {
  //     setTitleTouched()
  //   }
  // }, [titleTouched, title])

  const validate = () => {
    const titleError = validateTitle(title)
    const expDayError = validateExpiryDate(expiryDate)
    const fileNumberError = validateFileNumber(fileNumber)
    const err = {}

    // set title error if defined
    if (titleError) {
      err['title'] = titleError
    }

    // set exp date error if defined
    if (expDayError) {
      err['expiryDate'] = expDayError
    }

    if (fileNumberError) {
      err['fileNumber'] = fileNumberError
    }

    setErrors({
      ...err,
      // if both errors does not exist => valid form
      valid: !err.title && !err.expiryDate && !err.fileNumber
    })
  }

  const clearErrors = (name) => {
    // if name is defined, clear error.name
    if (name) {
      setErrors({
        ...errors,
        [name]: undefined
      })
    }
    // else clear all errors
    else {
      setErrors({})
    }
  }

  return {
    errors,
    validate,
    clearErrors,
  }
}

export default useValidator
