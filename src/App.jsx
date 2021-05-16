import React, { useState } from 'react';
import _ from 'lodash';
import axios from 'axios';
import { Image, Transformation } from 'cloudinary-react';

import './App.css';

const App = () => {
  const [images, setImages] = useState({});
  const [imgs, setImgs] = useState([]);

  const onSubmit = e => {
    e.preventDefault();
  };

  const onChange = async e => {
    console.log('change', e.target.files);
    const newFiles = _.mapKeys(e.target.files, value => value.name);
    setImages({ ...images, ...newFiles });
    console.log({ ...images, ...newFiles });

    const formData = new FormData();
    console.log('formdata');
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      console.log(i);
      let file = files[i];
      formData.append('file', file);
      formData.append('upload_preset', 'zjnbccsn');
      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/db1waj76f/image/upload`,
          formData,
        );
        setImgs([...imgs, response.data])
        console.log('response', response);
      } catch (err) {
        console.log(err.response);
      }
    }
  };

  const onRemove = name => {
    console.log('remove', name);
    const nextImages = { ...images };
    delete nextImages[name];
    setImages(nextImages);
  };

  return (
    <div>
      <form onSubmit={onSubmit} encType='multipart/form-data'>
        <input name='images' type='file' multiple onChange={onChange} />
        <input type='submit' value='submit' />
      </form>
      <div>
        <div className='images-container'>
          {Object.values(images).map(image => (
            <div className='image-card'>
              <img
                key={image.name}
                src={URL.createObjectURL(image)}
                alt='pic'
              />
              <i className='gg-close' onClick={() => onRemove(image.name)}></i>
            </div>
          ))}

          {/* <Image publicId='sample'>
            <Transformation width='200' crop='scale' angle='10' />
          </Image> */}
        </div>
        <div className='images-container'>
          {imgs.map(img => (
            <Image cloudName="db1waj76f" publicId={img.public_id} key={img.public_id}>
              <Transformation width='200' crop='scale' />
            </Image>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
