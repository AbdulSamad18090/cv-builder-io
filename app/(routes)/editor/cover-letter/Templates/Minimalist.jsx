import React, { useEffect, useRef } from 'react'

const Minimalist = ({ letterData, sendDataToParent }) => {
  const printRef = useRef();
  
    useEffect(() => {
        sendDataToParent(printRef);
      }, [printRef]);

  return (
    <div ref={printRef}>
      Minimalist
    </div>
  )
}

export default Minimalist
