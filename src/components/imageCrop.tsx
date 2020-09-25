import React from 'react';

const ImageCrop = ({ file, setFile }: { file: object, setFile: Function }) => {
  console.log(file, setFile);
  return (
    <div className="fixed w-full h-100 inset-0 z-50 overflow-hidden flex justify-center items-center" style={{ background: 'rgba(0,0,0,.7)' }}>
      <div className="border border-red-100 shadow-lg modal-container bg-white w-11/12 md:max-w-lg mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="py-4 text-left px-6">
          <div className="flex justify-between items-center pb-3">
            <p className="text-2xl font-bold">Header</p>
            <button type="button" className="cursor-pointer active:border-0 active:border-0 z-50" onClick={() => setFile(null)}>
              <i className="fas fa-times" />
            </button>
          </div>
          <p className="my-5">Inliberali Persius Multi iustitia pronuntiaret expeteretur sanos didicisset desiderent.?</p>
          <div className="flex justify-end pt-2">
            <button type="button" className="focus:outline-none modal-close px-4 bg-gray-400 p-3 rounded-lg text-black hover:bg-gray-300">Cancel</button>
            <button type="button" className="focus:outline-none px-4 bg-teal-500 p-3 ml-3 rounded-lg text-white hover:bg-teal-400">Confirm</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCrop;
