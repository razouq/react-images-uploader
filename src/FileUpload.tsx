import React, { useState } from 'react';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { mimeType } from './utils';

import './App.css';

interface FileUploadProps {
  extensions: string[];
}

interface ImagesDictionary {
  [key: string]: Blob;
}

const CLOUDINARY_UPLOAD_IMAGE_URL = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`;

const sendFiles = async (data: ImagesDictionary) => {
  const formData = new FormData();
  formData.append(
    'upload_preset',
    process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET as string,
  );

  const promises = Object.keys(data).map(async (imageId) => {
    formData.append('file', data[imageId]);
    formData.append('public_id', imageId);
    try {
      const response = await axios.post(CLOUDINARY_UPLOAD_IMAGE_URL, formData);
      console.log(response);
    } catch (err) {
      console.log(err.response);
    }
  });

  Promise.all(promises);
};

const FileUpload = ({ extensions }: FileUploadProps) => {
  const [images, setImages] = useState<ImagesDictionary>({});

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await sendFiles(images);
  };

  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newImages = _.mapKeys(event.target.files, () => uuidv4());
    // eslint-disable-next-line no-param-reassign
    event.target.value = '';
    setImages((prevImages) => ({ ...prevImages, ...newImages }));
  };

  const onRemove = (imageId: string) => {
    const nextImages = { ...images };
    delete nextImages[imageId];
    setImages(nextImages);
  };

  const dumpIds = () => `[${Object.keys(images).join(', ')}]`;
  const authorizedExtensions = extensions ?? ['*'];

  return (
    <div className="wrapper">
      <div className="container">
        <h1>Images Upload Example</h1>
        <form onSubmit={(e) => onSubmit(e)} encType="multipart/form-data">
          <label htmlFor="images">
            Choose Images
            <input
              name="images"
              id="images"
              type="file"
              accept={mimeType(extensions)}
              multiple
              onChange={(e) => onChange(e)}
            />
          </label>
          <span>
            Accepted extensions are : {authorizedExtensions.join(', ')}
          </span>

          <div>
            <div className="images-container">
              {Object.keys(images).map((imageId) => (
                <div className="image-card" key={imageId}>
                  <img
                    key={imageId}
                    src={URL.createObjectURL(images[imageId])}
                    alt="pic"
                  />
                  <i
                    className="gg-close"
                    onClick={() => onRemove(imageId)}
                    aria-hidden="true"
                  />
                </div>
              ))}
            </div>
          </div>
          <input type="submit" value="Submit" />
          <p>
            Submitted images IDs : <br /> {dumpIds()}
          </p>
        </form>
      </div>
    </div>
  );
};

export default FileUpload;
