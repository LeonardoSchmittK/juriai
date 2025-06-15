import React from 'react';
import { View, Text, Switch, StyleSheet, useColorScheme } from 'react-native';
import useStore from '@/stores/store';
import { useTheme } from 'react-native-paper';

export default function ThemeSwitcher() {
  const colorScheme = useColorScheme();
  const isDark = useStore((state) => state.isDark);
  const {toggleTheme} = useStore()
  const { colors } = useTheme();

  

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.primary }]}>{isDark? "Ativar Modo claro" : "Ativar Modo escuro"}</Text>
      <Switch
        value={isDark}
        onValueChange={toggleTheme}
        thumbColor={isDark ? '#fff' : '#1976d2'}
        trackColor={{ false: '#ccc', true: '#444' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    padding: 16,
  },
  label: {
    fontSize: 16,
  },
});
