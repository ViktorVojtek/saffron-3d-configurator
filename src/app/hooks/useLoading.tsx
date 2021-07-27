import React, {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useState
} from 'react';

export const LoadingContext = createContext<{
  isLoading: boolean;
  dispatch: Dispatch<boolean>;
}>({
  isLoading: true,
  dispatch: () => null,
});

type LoadingProviderProps = {
  children: ReactNode;
}
export const LoadingProvider = (props: LoadingProviderProps) => {
  const { children } = props;
  const [isLoading, dispatch] = useState(true);

  return (
    <LoadingContext.Provider value={{ isLoading, dispatch }}>
      {children}
    </LoadingContext.Provider>
  );
}

export default function useLoading(): [
  boolean,
  Dispatch<boolean>
] {
  const { isLoading, dispatch } = useContext(LoadingContext);

  return [isLoading, dispatch];
}
