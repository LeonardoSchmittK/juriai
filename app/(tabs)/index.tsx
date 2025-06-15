import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Logo } from '@/components/Logo';
import { ChooseCategory } from '@/components/ChooseCategory';
import { UserWriting } from '@/components/UserWriting';
import { AIAnalysisCard } from '@/components/AIAnalysisCard';
import { useEffect } from 'react';
import * as SystemUI from 'expo-system-ui';
import { useTheme } from 'react-native-paper';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { Header } from '@/components/Header';

export default function HomeScreen() {
  const { colors } = useTheme();
  return (
    <SafeAreaView style={[styles.stepContainer, { backgroundColor: colors.background}]}>
        <Header/>
        <ChooseCategory/>
        <UserWriting/>
        <AIAnalysisCard/>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  stepContainer: {
    width:"100%",
    flex:1,
    marginBottom: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    gap:12
  },

});
