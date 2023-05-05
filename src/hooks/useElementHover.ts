import { useState } from "react";

function useElementHover() {
  const [isHovered, setHovered] = useState(false);

  const onMouseOver = () => setHovered(true);

  const onMouseLeave = () => setHovered(false);

  return {
    isHovered,
    triggerHover: {
      onMouseOver,
      onMouseLeave,
      style: { cursor: isHovered ? "pointer" : "alias" },
    },
  };
}

export default useElementHover;
