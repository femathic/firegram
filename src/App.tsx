import React from "react";
import UploadForm from "./components/UploadForm";
import ImageGrid from "./components/ImageGrid";

const App = (): JSX.Element => (
  <div>
    <h2 className="text-red-200 font-bold m-2 ml-8"> FireGram </h2>
    <h1 className="flex text-white justify-center font-bold text-3xl mt-10 mb-4">
      Your Pictures
    </h1>
    <h4 className="flex justify-center font-medium text-sm text-gray-600">
      Keep your pictures here and make memories today.
    </h4>
    <UploadForm />
    <ImageGrid />
  </div>
);

export default App;
