import {
  AmbientLight,
  HemisphereLight,
  DirectionalLight,
  Group,
  Object3D,
} from 'three';

export default function (): Object3D {
  const ambientLight: AmbientLight = new AmbientLight(0xfff4e5, 1.25);
  const hemisphereLight: HemisphereLight = new HemisphereLight(
    0xfff4e5,
    0xaaaaaa,
    3.5
  );
  hemisphereLight.position.set(0, 1, -1.5);

  const directionalLight: DirectionalLight = new DirectionalLight(
    0xffffff,
    0.5
  );

  directionalLight.castShadow = true;
  directionalLight.position.set(2, 10, 5);
  
  directionalLight.shadow.mapSize.width = 4096;
  directionalLight.shadow.mapSize.height = 4096;
  directionalLight.shadow.camera.near = 1;
  directionalLight.shadow.camera.far = 5000;
  directionalLight.shadow.camera.left = -10;
  directionalLight.shadow.camera.right = 10;
  directionalLight.shadow.camera.top = 10;
  directionalLight.shadow.camera.bottom = -10;

  const group: Object3D = new Group();

  group.name = 'Lights';
  group.add(ambientLight);
  group.add(hemisphereLight);
  group.add(directionalLight);

  return group;
}
