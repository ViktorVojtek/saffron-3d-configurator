import { useState, useEffect } from 'react';

export default function useRadians(
  progress: number,
  ref: React.MutableRefObject<any>
): [number, number] {
  const [radians, setRadians] = useState([0, 250]);

  useEffect(() => {
    const radius: number = +ref.current.r.baseVal.value;
    const circumference = Math.round(radius * 2 * Math.PI);
    const offset = Math.round(circumference - (progress / 100) * circumference);

    setRadians([circumference, offset]);
  }, [progress]);

  return radians as [number, number];
}
