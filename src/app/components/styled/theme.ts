// theme.ts
import { DefaultTheme } from 'styled-components';

export const defaultTheme: DefaultTheme = {
  borderRadius: '4px',
  palette: {
    common: {
      black: '#222831',
      grey: '#f6f6f6',
      silver: '#ddd',
      white: '#ffffff'
    },
    primary: {
      main: '#726a95',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#709fb0',
      contrastText: '#ffffff'
    }
  }
}