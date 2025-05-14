import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';



export default function RootLayout() {
  
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    
      <Stack screenOptions={{ headerShown: false }}>
      
      <Stack.Screen name="(auth)"  />
      <Stack.Screen name="(tabs)"  />
      <Stack.Screen name="status"  />
      <Stack.Screen name="friendProfile"  />
      <Stack.Screen name="editProfile"  />
      <Stack.Screen name="bottom" />
      <Stack.Screen name="createPost"  />
      <Stack.Screen name="search"  />
      <Stack.Screen name="+not-found" />
    </Stack>
      
   
  );
}
