import {useEffect, useState} from 'react'
import {storage } from '../../../firebase'

function getDownloadURLsFromFileList(fileList) {
  const downloadURLPromises = fileList.items
    .map(item => item.getDownloadURL())
  return Promise.all(downloadURLPromises)
}

async function fetchDownloadURLs(directoryPath) {
  const listResult = await storage.ref(directoryPath).listAll()
  return await getDownloadURLsFromFileList(listResult)
}

function useDownloadURLs(directoryPath) {
  const [downloadURLs, setDownloadURLs] = useState([])

  useEffect(() => {

    fetchDownloadURLs(directoryPath, setDownloadURLs)
      .then(urls => setDownloadURLs(urls))
      .catch()

  }, [directoryPath])

  return [downloadURLs, setDownloadURLs]
}

export default useDownloadURLs
