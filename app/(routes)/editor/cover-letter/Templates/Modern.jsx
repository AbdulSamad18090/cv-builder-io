import React, { useEffect, useRef } from 'react'

const Modern = ({ letterData, sendDataToParent }) => {
  const printRef = useRef();
  
    useEffect(() => {
        sendDataToParent(printRef);
      }, [printRef]);

  return (
    <div ref={printRef}>
      Modern
    </div>
  )
}

export default Modern
