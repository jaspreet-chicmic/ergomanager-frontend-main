import React, { useState } from "react";

const useModal = () => {
    const [isShowing, setIsShowing] = useState(false);
  
    function toggle() {
        console.log("jhvugjhblkbkjbij",isShowing)
      setIsShowing(!isShowing);
    }
  
    return {
      isShowing,
      toggle,
    }
  };

  export default useModal;