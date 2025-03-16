import React from 'react';
import { registerRootComponent } from 'expo';
import { ThemeProvider } from './app/ThemeContext';
import Perseus from './app/index';

const App = () => {
  return (
    <ThemeProvider>
      <Perseus />
    </ThemeProvider>
  );
};

registerRootComponent(App);