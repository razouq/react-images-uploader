import React, { useState } from 'react';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

import './App.css';

const App = () => {
  const [images, setImages] = useState({});

  const onSubmit = e => {
    e.preventDefault();
    console.log('submitted images Id', Object.keys(images));
  };

  const onChange = async e => {
    const newImages = _.mapKeys(e.target.files, () => uuidv4());
    setImages(prevImages => ({ ...prevImages, ...newImages }));

    const formData = new FormData();
    console.log('formdata');
    for (const [imageKey, Image] of Object.entries(newImages)) {
      formData.append('file', Image);
      formData.append('upload_preset', 'zjnbccsn');
      formData.append('public_id', imageKey);
      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/db1waj76f/image/upload`,
          formData,
        );
        console.log(response);
      } catch (err) {
        console.log(err.response);
      }
    }
  };

  const onRemove = imageKey => {
    const nextImages = { ...images };
    delete nextImages[imageKey];
    setImages(nextImages);
  };

  return (
    <div className='wrapper'>
      <div className='container'>
        <h1>Submit Images Form</h1>
        <form onSubmit={onSubmit} encType='multipart/form-data'>
          <input name='images' id='images' type='file' multiple onChange={onChange} />
          <label htmlFor="images">Choose Images</label>
          <div>
            <div className='images-container'>
              {Object.keys(images).map(ImageKey => (
                <div className='image-card'>
                  <img
                    key={ImageKey}
                    src={URL.createObjectURL(images[ImageKey])}
                    alt='pic'
                  />
                  <i
                    className='gg-close'
                    onClick={() => onRemove(ImageKey)}
                  ></i>
                </div>
              ))}
            </div>
          </div>
          <input type='submit' value='submit' />
          <p>submitted images ids : <br/> {'[' + Object.keys(images).join(', ') + ']'}</p>
        </form>
      </div>
    </div>
  );
};

export default App;
