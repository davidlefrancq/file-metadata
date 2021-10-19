function imageMetadata(file) {
  return new Promise((resolve, reject) => {
    if (isImage(file)) {

      try {
        const img = new Image();
        img.onload = function () {
          window.URL.revokeObjectURL(img.src);
          const {width, height} = img;
          resolve({
            width: width,
            height: height,
          });
        };
        img.src = URL.createObjectURL(file);
      } catch (err) {
        reject(err);
      }

    } else {
      reject(new Error("This image type not supported."));
    }
  });
}

function videoMetadata(file) {
  return new Promise((resolve, reject) => {
    if (isVideo(file)) {

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

    } else {
      reject(new Error("This video type not supported."));
    }
  });
}

function audioMetadata(file) {
  return new Promise((resolve, reject) => {
    if (isAudio(file)) {

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

    } else {
      reject(new Error("This audio type not supported."));
    }
  });
}

function isImage(file) {
  let result = false;
  const regex = /(image|x-(?:[0-9A-Za-z!#$%&'*+.^_`|~-]+))\/([0-9A-Za-z!#$%&'*+.^_`|~-]+)/g;
  const typeMatch = file.type.match(regex);
  if (typeMatch) {
    result = true;
  }
  return result;
}

function isVideo(file) {
  let result = false;
  const regex = /(video|x-(?:[0-9A-Za-z!#$%&'*+.^_`|~-]+))\/([0-9A-Za-z!#$%&'*+.^_`|~-]+)/g;
  const typeMatch = file.type.match(regex);
  if (typeMatch) {
    result = true;
  }
  return result;
}

function isAudio(file) {
  let result = false;
  const regex = /(audio|x-(?:[0-9A-Za-z!#$%&'*+.^_`|~-]+))\/([0-9A-Za-z!#$%&'*+.^_`|~-]+)/g;
  const typeMatch = file.type.match(regex);
  if (typeMatch) {
    result = true;
  }
  return result;
}

export {isAudio, isImage, isVideo, audioMetadata, imageMetadata, videoMetadata};