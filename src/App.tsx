import React from 'react';
import Title from './components/title';
import UploadForm from './components/UploadForm';
import ImageGrid from './components/ImageGrid';

const App = () => (
  <div>
    <Title />
    <UploadForm />
    <ImageGrid />
  </div>
);

export default App;

// window.addEventListener(
//   'scroll',
//   () => {
//     setScroll({ ...scroll, x: window.scrollX, y: window.scrollY });
//   },
//   false,
// );
