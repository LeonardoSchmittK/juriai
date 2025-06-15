import { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';
import useStore from '../stores/store';
import { useTheme } from 'react-native-paper';
import { Logo } from '@/components/Logo';
import ThemeSwitcher from '@/components/ThemeSwitcher';

type Category = 'Penal' | 'Civil' | 'Constitucional';

export function Header() {
    const { colors } = useTheme();

  const { setopenWritingContainer,setopenResultContainer } = useStore();

  const [selected, setSelected] = useState<Category | null>(null);

  const categories: Category[] = ['Penal', 'Civil', 'Constitucional'];

  function selectCategory(category: Category) {
    setopenResultContainer(false);
    setSelected(category);
    setopenWritingContainer(true);
  }

  return (
      <SafeAreaView style={styles.container}>
        <Logo/>
        <ThemeSwitcher/>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',        
      justifyContent: 'space-between', 
      alignItems: 'center',            
    },
  });
