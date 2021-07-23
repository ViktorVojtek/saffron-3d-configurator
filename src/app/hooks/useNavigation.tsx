import React, {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useState
} from 'react';

export const NavigationContext = createContext<{
  active: number;
  dispatch: Dispatch<number>;
}>({
  active: 0,
  dispatch: () => null,
});

type NavigationProviderProps = {
  children: ReactNode;
}
export const NavigationProvider = (props: NavigationProviderProps) => {
  const { children } = props;
  const [active, dispatch] = useState(0);

  return (
    <NavigationContext.Provider value={{ active, dispatch }}>
      {children}
    </NavigationContext.Provider>
  );
}

export default function useNavigation(): [
  number,
  Dispatch<number>
] {
  const { active, dispatch } = useContext(NavigationContext);

  return [active, dispatch];
}
