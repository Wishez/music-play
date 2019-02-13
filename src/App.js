import React, { useState, useEffect } from 'react';
import Loader from './Loader'
import MediaFile from './MediaFile'
import './App.css';
import { API_HOST } from './config'

const loadFile = (e, updateAudioList) => {
  const files = e.target.files
  const fileReader = new FileReader()
  fileReader.readAsDataURL(files[0])

  fileReader.onload = (e) => {
    const formData = new FormData()
    formData.append('file', files[0])
    fetch(`${API_HOST}/api/media/upload`, {
      method: 'POST',
      body: formData,
    })
      .then(updateAudioList)
      .catch(error => console.error(error))
  }

}

function App() {
  const [mediaList, setMediaList] = useState([])
  const [isDataLoading, setIsDataLoading] = useState(true)
  const [isDataNotFetched, setIsDataNotFetched] = useState(true)
  useEffect(() => {
    if (isDataNotFetched) {
      fetch(`${API_HOST}/api/audio-list`)
        .then(res => res.json())
        .then(data => {
          setMediaList(data.mediaList)
          setIsDataLoading(false)
        })
        .catch(error => console.error(error))

      setIsDataNotFetched(false)
    }
  })
  const updateAudioList = () => {
    setIsDataNotFetched(true)
    setIsDataLoading(true)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>MusicPlay</h1>

        {isDataLoading
        ? <Loader />
        : (
          <> 
            <button type="button" onClick={() => updateAudioList()}>
              Update list
            </button>

            <input 
              className="button" 
              name="mediaFile" 
              type="file" 
              onChange={(e) => loadFile(e, updateAudioList)} />

            <ul className="mediaFiles">
              {mediaList.map((mediaFile, index) => (
                <MediaFile updateAudioList={updateAudioList} mediaFile={mediaFile} key={index} />
              ))}
            </ul>
          </>
        )}

      </header>
    </div>
  );
}

export default App;
