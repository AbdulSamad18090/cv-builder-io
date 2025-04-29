import React, { useEffect, useRef } from 'react'

const Standard = ({ letterData, sendDataToParent }) => {
  const printRef = useRef();

  useEffect(() => {
      sendDataToParent(printRef);
    }, [printRef]);

  return (
    <div ref={printRef}>
      Standard
    </div>
  )
}

export default Standard
