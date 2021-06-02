import React from 'react';
import ReactDOM from 'react-dom';

import FileUpload from './FileUpload';

ReactDOM.render(
  <FileUpload
    extensions={['jpeg', 'gif', 'png', 'webp']}
    initialImages={['7901e3a9-1b0a-4b35-9611-387d28b9a2c5']}
  />,
  document.getElementById('root'),
);
