import { useEffect } from 'react';

export default function useUpdateLogger(variable, callback = console.info) {
  useEffect(() => callback(variable), [variable, callback]);
  // useEffect(() => callback(`%c ${variable}`, 'background:#000; color:#fff'),[variable,callback]);
}
