import logo from './logo.svg';
import './App.css';
import FileMetadata from "./FileMetadata";
import {useState} from "react";
import Metadata from "./Metadata";

function App() {

  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);
  const [duration, setDuration] = useState(null);

  const reset = () => {
    setWidth(null);
    setHeight(null);
    setDuration(null);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    reset();

    const file = event.target.imageFile.files[0];

    if (FileMetadata.isAudio(file)) {
      FileMetadata.audioMetadata(file).then(({duration}) => {
        console.log("audio", {duration})
        setDuration(duration);
      }).catch((err) => {
        console.error(err)
      });
    }

    if (FileMetadata.isImage(file)) {
      FileMetadata.imageMetadata(file).then(({width, height}) => {
        console.log("image", {width, height})
        setWidth(width);
        setHeight(height);
      }).catch((err) => {
        console.error(err)
      });
    }

    if (FileMetadata.isVideo(file)) {
      FileMetadata.videoMetadata(file).then(({width, height, duration}) => {
        console.log("video", {width, height, duration})
        setWidth(width);
        setHeight(height);
        setDuration(duration);
      }).catch((err) => {
        console.error(err)
      });
    }

  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <h1>FileMetadata</h1>
      </header>

      <div className={"container mt-5"}>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <input type={"file"} className={"form-control"} name={"imageFile"} aria-label="Upload"/>
            <button type={"submit"} className="btn btn-outline-secondary">
              Submit
            </button>
          </div>

        </form>

      </div>

      <div className={"container mt-5"}>
        <Metadata width={width} height={height} duration={duration}/>
      </div>


    </div>
  );
}

export default App;
