import { Intersection } from 'three';
import {
  camera,
  mouse,
  raycaster,
  renderer,
  scene,
} from '../constants';

export function onDocumentMouseDown(
  event: MouseEvent
): void {
  event.preventDefault();
  intersectEvent(event, false);
}

export function onDocumentTouchDown(
  event: TouchEvent
): void {
  event.preventDefault();
  intersectEvent(event, true);
}

function intersectEvent(
  event: MouseEvent | TouchEvent,
  touch: boolean
) {

  const clientX = touch
    ? (event as TouchEvent).targetTouches[0].pageX
    : (event as MouseEvent).clientX;
  const clientY = touch
    ? (event as TouchEvent).targetTouches[0].pageY
    : (event as MouseEvent).clientY;

  const canvasBounds: DOMRect = (renderer.getContext().canvas as HTMLCanvasElement).getBoundingClientRect();
  
  mouse.x = ( ( clientX - canvasBounds.left ) / ( canvasBounds.right - canvasBounds.left ) ) * 2 - 1;
  mouse.y = - ( ( clientY - canvasBounds.top ) / ( canvasBounds.bottom - canvasBounds.top) ) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects: Intersection[] = raycaster.intersectObjects(scene.children, true);

  if (intersects.length > 0) {
    if (
      (intersects[0].object as any).callback &&
      typeof (intersects[0].object as any).callback === 'function'
    ) {
      (intersects[0].object as any).callback();
    } else if (
      (intersects[0].object as any).parent &&
      (intersects[0].object as any).parent.callback &&
      typeof (intersects[0].object as any).parent.callback == 'function'
    ) {
      (intersects[0].object as any).parent.callback();
    }
  }
}