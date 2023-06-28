import { useLayoutEffect, useState } from "react";

export default function useMousePosition() {
  const [position, setPosition] = useState({x: 0, y: 0});

  useLayoutEffect(() => {
    function updatePosition(e: { clientX: any; clientY: any; }) {
      setPosition({ x: e.clientX, y: e.clientY });
    }

    document.addEventListener("mousemove", updatePosition);
    return () => document.removeEventListener("mousemove", updatePosition);
  }, []);

  return position;
}
