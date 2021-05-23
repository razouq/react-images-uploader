import React from 'react';
import ReactDOM from 'react-dom';

import FileUpload from './FileUpload';

ReactDOM.render(
  <FileUpload extensions={['jpeg', 'gif', 'png', 'webp']} />,
  document.getElementById('root'),
);
