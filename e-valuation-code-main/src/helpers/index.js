export function capitalizeString(stringToCapitalize) {
  // first character upper case + other characters lower case
  return stringToCapitalize.charAt(0).toUpperCase() +
         stringToCapitalize.slice(1).toLowerCase()
}

export function fileNameFromUrl(url) {
  return url.substring(url.lastIndexOf('/')+1)
}

export function openTab(url) {
  window.open(url)
}

export function spaceToDashes(s, toLowerCase=true) {
  let stringToModify = s
  if (toLowerCase) {
    stringToModify = stringToModify.toLowerCase()
  }
  return stringToModify.split(' ').join('-')
}

export function extractDataFromDocumentSnapshot(doc) {
  return {
    id: doc.id,
    ...doc.data()
  }
}

export function extractElementFromArray(array, index) {
  const updatedArray = [...array]
  const extractedValue = updatedArray.splice(index, 1)

  return [extractedValue, updatedArray]
}

export function extractFileExtensionFromName(fileName) {
  const split = fileName.split('.')
  return split[split.length - 1].toLowerCase()
}
