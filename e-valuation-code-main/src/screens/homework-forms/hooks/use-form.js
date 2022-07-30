import {useState, useEffect} from 'react'
import useValidator from './use-validator'

function useForm(initialValues, onSubmit, fileNumber) {
  const [values, setValues] = useState(initialValues)
  const [submitting, setSubmitting] = useState(false)
  // strictly coupled, should be injected
  const {errors, validate, clearErrors} = useValidator({...values, fileNumber})
  // console.log('file number: ', fileNumber)

  const handleChanges = (name, value) => {
    clearErrors(name)
    setValues({
      ...values,
      [name]: value,
    })
  }

  const handleSubmit = (event) => {
    //event.preventDefault()
    validate()
    setSubmitting(true)
  }

  useEffect(() => {
    if (submitting && errors.valid) {
      onSubmit(values)
      setSubmitting(false)
    }
  }, [values, submitting, errors, onSubmit])

  // initial values change
  useEffect(() => {
    setValues(initialValues)
  }, [initialValues])

  return {
    handleChanges,
    handleSubmit,
    values,
    errors,
    clearErrors,
  }
}

export default useForm
