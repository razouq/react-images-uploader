import React from 'react';
import ReactDOM from 'react-dom';

import FileUpload from './App';

ReactDOM.render(
    <FileUpload mimeTypes={"image/png, image/jpeg, image/gif" } />, 
    document.getElementById('root'));
