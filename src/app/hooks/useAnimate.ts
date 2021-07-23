import animate from '../three/utils/animate';

export default function useAnimate(): () => void {
  return animate;
}
