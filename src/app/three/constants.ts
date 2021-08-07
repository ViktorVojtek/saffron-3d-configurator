export type CameraPosType = {
  x: number;
  y: number;
  z: number;
};

export { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
export const appWrapperId: string = 'App'; 
export const canvasWrapperId: string = 'canvasWrapper';
export const containerId: string = 'canvas';
export const vendor: string = 'saffron';

// const protocol: string = process.env.NODE_ENV === 'production' ? 'https' : 'http';
// const domainName: string = process.env.NODE_ENV === 'production' ? 'enli.technology' : 'localhost:9000';
// export const domainUri: string = `${protocol}://${process.env.NODE_ENV === 'production' ? vendor + '.' : ''}${domainName}`;

type CameraPosition = {
  start: {
    x: number;
    y: number;
    z: number;
  };
  change: {
    x: number;
    y: number;
    z: number;
  };
}

export const cameraPosition: CameraPosition = {
  start: {
    x: 3, y: 2.25, z: 8,
  },
  change: {
    x: 0, y: 1.25, z: 8,
  },
};

type CameraTarget = {
  x: number;
  y: number;
  z: number;
};

export const cameraTarget: CameraTarget = { x: 0, y: 0.9, z: 0};
export const sceneName = 'Saffron';
