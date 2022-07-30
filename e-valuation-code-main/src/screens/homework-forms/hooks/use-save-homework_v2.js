import { useCallback, useState } from 'react'
import { firestore, storage } from '../../../firebase'

async function addDocument(courseId, homework) {
  const homeworkCollection = firestore.collection(`/courses/${courseId}/homework/`)

  let res = await homeworkCollection.add({
    updatedAt: homework.updatedAt,
    title: homework.title,
    expirationDate: homework.expiryDate
  })

  const studentCollection = firestore.collection("courses").doc(courseId).collection('students');

  studentCollection.get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        res.collection("solutions").doc(doc.id).set({
          name: doc.data().name,
          surname: doc.data().surname
        })

        //console.log(doc.id, " => ", doc.data().name);
    });
  });

  return res.id
  /*
  res.collection("students").add({
    return studentCollection.docs.map(doc => doc.name, doc.surname)
  })
  snapshot.add(studentCollection)
  console.log(snapshot) */
}

async function updateDocument(courseId, homeworkId, homework) {
  const homeworkRef = firestore.doc(`/courses/${courseId}/homework/${homeworkId}`)
  const hw = {
    title: homework.title,
    expirationDate: homework.expiryDate,
  }

  if (homework.updatedAt) {
    hw.updatedAt = homework.updatedAt
  }

  await homeworkRef.update(hw)
}

function uploadSingleFile(filePath, file, setUploadPercentage) {
  return new Promise((resolve, reject) => {
    const uploadTask = storage.ref(filePath).put(file)
    uploadTask.on(
      'state_changed',
      snapshot => {
        const {bytesTransferred, totalBytes} = snapshot
        const percentage = (bytesTransferred / totalBytes) * 100
        setUploadPercentage(percentage)
      },
      error => {
        reject(error)
      },
      () => {
        resolve()
      }
    )
  })
}

async function uploadFiles(prefixPath, files, setCurrentFileNumber, setUploadPercentage) {
  let i = 1
  for (let file of files) {
    setCurrentFileNumber(i++)
    await uploadSingleFile(`${prefixPath}/${file.name}`, file, setUploadPercentage)
  }
}

function deleteFiles(filesToDelete) {
  const deletePromises = filesToDelete.map(url => storage.refFromURL(url).delete())
  return Promise.all(deletePromises)
}

async function saveHomework(
  courseId,
  homeworkId,
  homework,
  files,
  setCurrentFileNumber,
  setUploadPercentage,
  filesToDelete
) {
  const isNew = !homeworkId
  let hid = homeworkId

  if (isNew) {
    hid = await addDocument(courseId, {...homework, updatedAt: new Date()})
  }
  else {
    const toUpdateTimestamp = (files && files.length > 0) || (filesToDelete && filesToDelete.length > 0)
    const hw = toUpdateTimestamp ? {...homework, updatedAt: new Date()} : homework
    await updateDocument(courseId, homeworkId, hw)
  }

  await uploadFiles(
    `courses/${courseId}/homework/${hid}/images`,
    files,
    setCurrentFileNumber,
    setUploadPercentage
  )

  // delete files
  await deleteFiles(filesToDelete)
}

function useSaveHomework (courseId, homeworkId) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [currentFileNumber, setCurrentFileNumber] = useState(1)
  const [currentUploadingPercentage, setCurrentUploadingPercentage] = useState(0)

  const save = useCallback((homework, filesToUpload, filesToDelete, onSuccess, onError) => {
    // initialization
    setError(null)
    setLoading(true)

    saveHomework(
      courseId,
      homeworkId,
      homework,
      filesToUpload,
      setCurrentFileNumber,
      setCurrentUploadingPercentage,
      filesToDelete,
    )
      .then(onSuccess)
      .catch(onError)
      .finally(() => {
        // finalization
        setLoading(false)
      })
  }, [courseId, homeworkId])

  return [save, loading, error, currentFileNumber, currentUploadingPercentage]
}

export default useSaveHomework
