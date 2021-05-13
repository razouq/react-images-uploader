import React, { useState } from 'react';

const App = () => {
  const [images, setImages] = useState([]);

  const onSubmit = e => {
    e.preventDefault();
    console.log(e.target.images.files);
    console.log(typeof e.target.images.files);
    setImages(e.target.images.files);
  };

  return (
    <div>
      {images.length}
      <form onSubmit={onSubmit} encType='multipart/form-data'>
        <input name='images' type='file' multiple />
        <input type='submit' value='submit' />
      </form>
      <div>
        {Object.values(images).map(image => (
          <img key={image.name} src={URL.createObjectURL(image)} alt='pic' />
        ))}
      </div>
    </div>
  );
};

export default App;
