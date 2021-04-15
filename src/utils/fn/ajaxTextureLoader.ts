import { Cache, FileLoader, TextureLoader } from 'three';

export function AjaxTextureLoader(): TextureLoader & {
  load: (url: string, onLoad: () => void, onProgress: () => void, onError: (event: ErrorEvent) => void) => void;
} {
  const cache = Cache;

  // Turn on shared caching for FileLoader, ImageLoader and TextureLoader
  cache.enabled = true;

  const textureLoader = new TextureLoader();
  const fileLoader = new FileLoader();

  fileLoader.setResponseType('blob');

  function load(url: string, onLoad: () => void, onProgress: () => void, onError: (event: ErrorEvent) => void) {
    fileLoader.load(url, (file: string | ArrayBuffer) => {
      if (file instanceof Blob) {
        cacheImage(file);
      } else {
        loadImageAsTexture();
      }
    }, onProgress, onError);

    function cacheImage(blob: any) {
      // ObjectURLs should be released as soon as is safe, to free memory
      const reader: FileReader = new FileReader();

      reader.readAsDataURL(blob);

      reader.onloadend = () => {
        const base64data: string | ArrayBuffer = reader.result;
        
        const objUrl = base64data;
        const image = document.createElement('img') as HTMLImageElement;

        image.onload = () => {
          cache.add(url, image);
          document.body.removeChild(image);
          loadImageAsTexture();
        };

        (image as any).src = objUrl;
        image.style.visibility = 'hidden';
        document.body.appendChild(image);
      };
    }

    function loadImageAsTexture() {
      textureLoader.load(url, onLoad, () => {}, onError);
    }
  }

  return Object.assign({}, textureLoader, { load });
}