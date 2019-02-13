import React from 'react'
import MaterialIcon from 'material-icons-react'
import { API_HOST } from './config'

const deleteFile = (filePath, updateAudioList) => {
  fetch(`${API_HOST}/api/media`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ filePath }),
  })
    .then(updateAudioList)
    .catch(error => console.error(error))
}

function MediaFile(props) {
  const { mediaFile, TagName = 'li', updateAudioList } = props
  const { name, fileName, url } = mediaFile

  return (
    <TagName className="mediaFile">
      <h2 className="mediaFile__fileName">{name}</h2>

      <audio className="mediaFile__audioController" controls="controls">
        <source src={url} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <button
        type="button"
        className="deleteButton"
        onClick={() => deleteFile(`./media/${fileName}`, updateAudioList)}
      >
        <MaterialIcon icon="delete" />
      </button>

      
    </TagName>
  )
}

export default MediaFile
