import * as SecureStore from 'expo-secure-store';

const ACCESS_KEY = 'access-token';
const REFRESH_KEY = 'refresh-token';
const ONBOARDING_SEEN_KEY = 'has-seen-onboarding';


export const saveToken = async (accessToken: string, refreshToken: string) => {
  try {
    await SecureStore.setItemAsync(ACCESS_KEY, accessToken);
    await SecureStore.setItemAsync(REFRESH_KEY, refreshToken);
  } catch (error) {
    console.error("Error saving token:", error);
  }
};


export const getAccessToken = async () => {
  try {
    const token = await SecureStore.getItemAsync(ACCESS_KEY);
    return token; 
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
};


export const getRefreshToken = async () => {
    try {
        const refreshToken = await SecureStore.getItemAsync(REFRESH_KEY);
        return refreshToken
    } catch (error) {
        console.log(error," Error getting refresh token")
    }
}

export const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(ACCESS_KEY);
    await SecureStore.deleteItemAsync(REFRESH_KEY)
  } catch (error) {
    console.error("Error deleting token:", error);
  }
};

export const setHasSeenOnboarding = async () => {
  try {
    await SecureStore.setItemAsync(ONBOARDING_SEEN_KEY, 'true');
  } catch (error) {
    console.error("Error saving onboarding flag:", error);
  }
};

export const getHasSeenOnboarding = async () => {
  try {
    return (await SecureStore.getItemAsync(ONBOARDING_SEEN_KEY)) === 'true';
  } catch (error) {
    console.error("Error reading onboarding flag:", error);
    return false;
  }
};
