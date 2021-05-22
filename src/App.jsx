import React, { useState } from 'react';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

import './App.css';

const CLOUDINARY_UPLOAD_IMAGE_URL = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`;

const sendFiles = async (data) => {
  const formData = new FormData();
  formData.append(
    'upload_preset',
    process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
  );
  for (const [imageId, image] of Object.entries(data)) {
    formData.append('file', image);
    formData.append('public_id', imageId);
    try {
      const response = await axios.post(
        CLOUDINARY_UPLOAD_IMAGE_URL,
        formData,
      );
      console.log(response);
    } catch (err) {
      console.log(err.response);
    }
  }
};
const App = () => {
  const [images, setImages] = useState({});

  const onSubmit = async e => {
    e.preventDefault();
    console.log(images);
    await sendFiles(images);

    // console.log('submitted images Id', Object.keys(images));
  };

  const onChange = async e => {
    const newImages = _.mapKeys(e.target.files, () => uuidv4());
    e.target.value = null;
    setImages(prevImages => ({ ...prevImages, ...newImages }));

  };

  const onRemove = imageId => {
    const nextImages = { ...images };
    delete nextImages[imageId];
    setImages(nextImages);
  };

  const dumpIds = () => '[' + Object.keys(images).join(', ') + ']';

  return (
    <div className='wrapper'>
      <div className='container'>
        <h1>Submit Images Form</h1>
        <form onSubmit={onSubmit} encType='multipart/form-data'>
          <label htmlFor='images'>Choose Images</label>
          <input
            name='images'
            id='images'
            type='file'
            multiple
            onChange={onChange}
          />
          <div>
            <div className='images-container'>
              {Object.keys(images).map(imageId => (
                <div className='image-card' key={imageId}>
                  <img
                    key={imageId}
                    src={URL.createObjectURL(images[imageId])}
                    alt='pic'
                  />
                  <i className='gg-close' onClick={() => onRemove(imageId)}></i>
                </div>
              ))}
            </div>
          </div>
          <input type='submit' value='Submit' />
          <p>
            submitted images ids : <br /> {dumpIds(images)}
          </p>
        </form>
      </div>
    </div>
  );
};

export default App;
