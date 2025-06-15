import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import useStore from '@/stores/store';
import { useColorScheme } from '@/hooks/useColorScheme';
import {
  MD3DarkTheme as PaperDarkTheme,
  MD3LightTheme as PaperLightTheme,
  PaperProvider,
} from 'react-native-paper';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const { isDark } = useStore(); // Move useStore before any early return

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // Define themes after all hooks
  const CombinedDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: "#111a25",
      outline: "#12253a",
      primary: "#fff",
    },
  };

  const CombinedLightTheme = {
    ...NavigationDefaultTheme,
    ...PaperLightTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperLightTheme.colors,
      background: "#fff",
      primary: "#090e14",
      outline: "#e5e7eb",
    },
  };

  const theme = isDark === true ? CombinedDarkTheme : CombinedLightTheme;

  // Early return after all hooks
  if (!loaded) return null;

  return (
    <PaperProvider theme={theme}>
      <ThemeProvider value={theme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
          <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        </Stack>
      </ThemeProvider>
    </PaperProvider>
  );
}