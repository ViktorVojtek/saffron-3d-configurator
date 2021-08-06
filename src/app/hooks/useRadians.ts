import { MutableRefObject, useState, useEffect } from 'react';

export default function useRadians(
  progress: number,
  ref: MutableRefObject<any>
): [number, number] {
  const [radians, setRadians] = useState([0, 250]);

  useEffect(() => {
    if (!ref.current || !progress) {
      return;
    }

    const radius: number = +ref.current?.r?.baseVal?.value;
    const circumference: number = Math.round(radius * 2 * Math.PI);
    const offset: number = Math.round(circumference - (progress / 100) * circumference);

    setRadians([circumference, offset]);
  }, [progress, ref.current]);

  return radians as [number, number];
}
