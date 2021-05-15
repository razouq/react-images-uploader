import React, { useState } from 'react';
import _ from 'lodash';

import './App.css';

const App = () => {
  const [images, setImages] = useState({});

  const onSubmit = e => {
    e.preventDefault();
  };

  const onChange = e => {
    console.log('change', e.target.files);
    const newFiles = _.mapKeys(e.target.files, value => value.name);
    setImages({ ...images, ...newFiles });
    console.log({ ...images, ...newFiles });
  };

  const onRemove = (name) => {
    console.log('remove', name)
    const nextImages = {...images};
    delete nextImages[name]
    setImages(nextImages);
  }

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
              <i className="gg-close" onClick={() => onRemove(image.name)}></i>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
