import { useRef, useEffect } from 'react';

function useFocus() {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []); // The empty dependency array ensures it runs only on mount

  return ref;
}

export default useFocus;
