import {useState, useCallback} from 'react'

function usePermissions(constraints) {
  const {audio, video} = constraints
  const [error, setError] = useState(null)

  // const onSuccessLocal = useCallback(res => {
  // }, [])

  const onErrorLocal = useCallback(err => {
    setError(err)
  }, [])

  const checkPermissions = useCallback((onSuccess, onError) => {
    const getUserMedia = navigator?.mediaDevices?.getUserMedia || navigator?.getUserMedia

    setError(null)
    if (getUserMedia) {
      navigator.mediaDevices.getUserMedia({audio, video})
        .then(res => {
          //onSuccessLocal(res)
          onSuccess && onSuccess(res)
        })
        .catch(err => {
          onErrorLocal(err)
          onError && onError(err)
        })
    }
    else {
      const err = {msg: 'User media not supported'}
      onErrorLocal(err)
      onError && onError(err)
    }
  }, [audio, video, onErrorLocal/*, onSuccessLocal*/])

  return [checkPermissions, error]
}

export default usePermissions
