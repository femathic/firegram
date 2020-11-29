import React, { useEffect } from 'react';

const Title = ({ darkMode, setDarkMode }: { darkMode: boolean, setDarkMode: Function }) => {
  useEffect(() => {
    const metaColor: any = document.querySelector('meta[name="theme-color"]');
    if (darkMode) {
      metaColor.setAttribute('content', '#4a5568');
    } else {
      metaColor.setAttribute('content', '#FB5C00');
    }
  }, [darkMode]);

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-red-700 dark:text-red-600 font-bold text-lg p-2 ml-8">FireGram</h1>
        <label htmlFor="toggle" className="flex justify-between cursor-pointer my-2 w-32 mr-3 p-1 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-400 shadow-inner">
          <p className="transition duration-400 ease-in bg-gray-400 dark:bg-transparent p-1 text-xs w-full font-semibold text-center rounded-lg">Light</p>
          <p className="transition duration-400 ease-in bg-transparent dark:bg-gray-600 text-xs p-1 w-full font-semibold text-center rounded-lg">Dark</p>
          <input
            type="checkbox"
            id="toggle"
            className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer hidden"
            onChange={() => setDarkMode(!darkMode)}
          />
        </label>
      </div>

      <h2 className="text-center text-gray-900 dark:text-gray-500 font-bold text-3xl mt-10 mb-4">Your Pictures</h2>
      <h3 className="text-center font-medium text-normal text-gray-700 mx-3">
        Create picture albums, make memories and share with friends.
      </h3>
    </div>
  );
};

export default Title;
