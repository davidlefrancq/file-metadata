class FileMetadata {

  static imageMetadata(file) {
    return new Promise((resolve, reject) => {
      if(this.isImage(file)){

        try {
          const img = new Image();
          img.onload = function () {
            window.URL.revokeObjectURL(img.src);
            resolve({
              width: this.width,
              height: this.height,
            });
          };
          img.src = URL.createObjectURL(file);
        } catch (err) {
          reject(err);
        }

      }else{
        reject(new Error("This image type not supported."));
      }
    });
  }

  static videoMetadata(file) {
    return new Promise((resolve, reject) => {
      if(this.isVideo(file)){

        try {
          const videoElement = document.createElement('video');
          videoElement.preload = 'metadata';
          videoElement.onloadedmetadata = function () {
            window.URL.revokeObjectURL(videoElement.src);
            const {duration, videoWidth, videoHeight} = videoElement;
            resolve({
              duration: duration,
              width: videoWidth,
              height: videoHeight,
            });
          }
          videoElement.src = URL.createObjectURL(file);
        } catch (err) {
          reject(err);
        }

      }else{
        reject(new Error("This video type not supported."));
      }
    });
  }

  static audioMetadata(file) {
    return new Promise((resolve, reject) => {
      if(this.isAudio(file)){

        try {
          const audioElement = document.createElement('audio');
          audioElement.preload = 'metadata';
          audioElement.onloadedmetadata = function () {
            window.URL.revokeObjectURL(audioElement.src);
            const {duration} = audioElement;
            resolve({
              duration: duration,
            });
          }
          audioElement.src = URL.createObjectURL(file);
        } catch (err) {
          reject(err);
        }

      }else{
        reject(new Error("This audio type not supported."));
      }
    });
  }

  static isImage(file) {
    let result = false;
    const regex = /(image|x-(?:[0-9A-Za-z!#$%&'*+.^_`|~-]+))\/([0-9A-Za-z!#$%&'*+.^_`|~-]+)/g;
    const typeMatch = file.type.match(regex);
    if (typeMatch) {
      result = true;
    }
    return result;
  }

  static isVideo(file) {
    let result = false;
    const regex = /(video|x-(?:[0-9A-Za-z!#$%&'*+.^_`|~-]+))\/([0-9A-Za-z!#$%&'*+.^_`|~-]+)/g;
    const typeMatch = file.type.match(regex);
    if (typeMatch) {
      result = true;
    }
    return result;
  }

  static isAudio(file) {
    let result = false;
    const regex = /(audio|x-(?:[0-9A-Za-z!#$%&'*+.^_`|~-]+))\/([0-9A-Za-z!#$%&'*+.^_`|~-]+)/g;
    const typeMatch = file.type.match(regex);
    if (typeMatch) {
      result = true;
    }
    return result;
  }


}

export default FileMetadata;