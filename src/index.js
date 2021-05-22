import React from 'react';
import ReactDOM from 'react-dom';

import FileUpload from './App';

ReactDOM.render(
    <FileUpload extensions={["jpeg", "gif", "png"]} />, 
    document.getElementById('root'));
