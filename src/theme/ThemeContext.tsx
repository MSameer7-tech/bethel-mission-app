import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { lightColors, darkColors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';
import { radius } from './radius';
import { shadows as shadowGenerator } from './shadows';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface Theme {
  colors: typeof lightColors;
  typography: typeof typography;
  spacing: typeof spacing;
  radius: typeof radius;
  shadows: ReturnType<typeof getShadowsForMode>;
  mode: 'light' | 'dark';
}

function getShadowsForMode(isDark: boolean) {
  if (isDark) {
    return {
      sm: {},
      md: {},
      card: {
        backgroundColor: darkColors.surface,
        borderColor: darkColors.borderLight,
        borderWidth: 1,
      }
    };
  }
  return shadowGenerator;
}

interface ThemeContextType {
  theme: Theme;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeModeState] = useState<ThemeMode>('system');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const stored = await AsyncStorage.getItem('@theme_mode');
        if (stored) {
          setThemeModeState(stored as ThemeMode);
        }
      } catch (e) {
        // ignore error
      } finally {
        setIsReady(true);
      }
    };
    loadTheme();
  }, []);

  const setThemeMode = async (mode: ThemeMode) => {
    setThemeModeState(mode);
    try {
      await AsyncStorage.setItem('@theme_mode', mode);
    } catch (e) {
      // ignore
    }
  };

  const isDark = useMemo(() => {
    if (themeMode === 'system') return systemColorScheme === 'dark';
    return themeMode === 'dark';
  }, [themeMode, systemColorScheme]);

  const theme = useMemo<Theme>(() => ({
    colors: isDark ? darkColors : lightColors,
    typography,
    spacing,
    radius,
    shadows: getShadowsForMode(isDark),
    mode: isDark ? 'light' : 'dark', // wait, this should be isDark ? 'dark' : 'light'
  }), [isDark]);

  theme.mode = isDark ? 'dark' : 'light';

  if (!isReady) return null;

  return (
    <ThemeContext.Provider value={{ theme, themeMode, setThemeMode, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
