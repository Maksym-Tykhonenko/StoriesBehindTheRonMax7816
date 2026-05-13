import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEYS = {
  savedStories: 'savedStories',
  savedFacts: 'savedFacts',
  usedSituations: 'usedSituations',
  onboardingCompleted: 'isonboardingCompleted',
} as const;

export async function readJson<T>(key: string, fallback: T): Promise<T> {
  const raw = await AsyncStorage.getItem(key);
  if (!raw) {
    return fallback;
  }

  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export async function writeJson(key: string, value: unknown): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}
