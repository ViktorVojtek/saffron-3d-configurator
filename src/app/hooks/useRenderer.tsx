import React, { createContext, useContext, ReactNode } from 'react';
import { WebGLRenderer } from 'three';

const RendererContext = createContext<{
  renderer: WebGLRenderer;
}>({
  renderer: new WebGLRenderer({
    antialias: true,
    alpha: true,
    preserveDrawingBuffer: true,
    powerPreference: 'high-performance'
  })
});

type Props = {
  children: ReactNode;
}

export function RendererProvider(props: Props): JSX.Element {
  const { children } = props;
  const { renderer } = useContext(RendererContext);

  return (
    <RendererContext.Provider value={{ renderer }}>
      {children}
    </RendererContext.Provider>
  );
}

export default function useRenderer(): [
  WebGLRenderer
] {
  const { renderer } = useContext(RendererContext);

  return [renderer];
}
