import { useState, useCallback } from 'react'
import { extractElementFromArray } from '../../../helpers'
import useDownloadURLs from './use-download-urls'

function useFileLists(directoryPath, maxFileNumber) {
  const [remoteURLs, setRemoteURLs] = useDownloadURLs(directoryPath)
  const [localFileList, setLocalFileList] = useState([])
  const [toDeleteURLs, setToDeleteURLs] = useState([])

  const addFile = useCallback(file => {
    if (localFileList.length + remoteURLs.length >= maxFileNumber) {
    // @todo error message
      return
    }
    setLocalFileList([...localFileList, file])
  }, [localFileList, remoteURLs, maxFileNumber, setLocalFileList])

  const deleteFile = useCallback(index => {
    if (index < remoteURLs.length) {
      // removes from db
      // extracting element at index
      const [removedElement, updatedRemoteURLs] = extractElementFromArray(remoteURLs, index)
      // setting new values
      setRemoteURLs(updatedRemoteURLs)
      setToDeleteURLs(prevState => [...prevState, removedElement])
    }
    else {
      // remove from local list
      // computing index of local list
      const localIndex = index - remoteURLs.length
      // extracting element at index
      const [, updatedLocalFileList] = extractElementFromArray(localFileList, localIndex)
      // setting new value
      setLocalFileList(updatedLocalFileList)
    }
  }, [remoteURLs, localFileList, setRemoteURLs])

  return [remoteURLs, localFileList, toDeleteURLs, addFile, deleteFile]
}

export default useFileLists
