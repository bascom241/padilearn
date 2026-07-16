import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useFonts } from "expo-font"
import { useColorScheme } from '@/hooks/use-color-scheme';
import { QueryClient, QueryClientProvider, focusManager } from "@tanstack/react-query"
import QueryProvider from '@/providers/QueryProvider';
import Toast from "react-native-toast-message"
export const unstable_settings = {
  anchor: '(tabs)',
};


const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } }
});

queryClient.setDefaultOptions({
  queries: {
    networkMode: "online"
  }
})

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({

    // Inter 
    InterBold: require("../assets/fonts/Inter/static/Inter_18pt-Bold.ttf"),
    InterLight: require("../assets/fonts/Inter/static/Inter_18pt-Light.ttf"),
    InterMedium: require('../assets/fonts/Inter/static/Inter_18pt-Medium.ttf'),


    PoppinsBold: require("../assets/fonts/Poppins/Poppins-Bold.ttf"),
    PoppinsLight: require("../assets/fonts/Poppins/Poppins-Light.ttf"),
    PoppinsNormal: require("../assets/fonts/Poppins/Poppins-Medium.ttf"),

    RobotoBold: require("../assets/fonts/Roboto/static/Roboto-Bold.ttf"),
    RobotoLight: require("../assets/fonts/Roboto/static/Roboto-Light.ttf"),
    RobotoNormal: require("../assets/fonts/Roboto/static/Roboto-Medium.ttf"),

    OnestBold: require("../assets/fonts/Onest/static/Onest-Bold.ttf"),
    OnestLight: require("../assets/fonts/Onest/static/Onest-Light.ttf"),
    OnestMedium: require("../assets/fonts/Onest/static/Onest-Medium.ttf")

  })

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <QueryProvider >


        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          <Stack.Screen name='index' options={{ headerShown: false }} />
          <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name='courses' options={{ headerShown: false }} />
          <Stack.Screen name='chat' options={{ headerShown: false }} />
        </Stack>
      </QueryProvider>
      <StatusBar style="auto" />
      <Toast />
    </ThemeProvider>
  );
}
