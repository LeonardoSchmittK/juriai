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

type Category = 'Penal' | 'Civil' | 'Constitucional';

export function ChooseCategory() {
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
    <SafeAreaView style={[styles.container,{borderColor:colors.outline}]}>
      <Text style={[styles.title,{color:colors.primary,borderColor:colors.outline}]}>Escolha a área do Direito:</Text>
      <View style={styles.buttonGroup}>
        {categories.map((category) => (
          <Pressable
            key={category}
            style={[
              styles.button,
              selected === category && styles.buttonSelected,{backgroundColor:colors.background}
            ]}
            onPress={() => selectCategory(category)}
          >
            <View style={styles.circle}>
              {selected === category && <View style={styles.filledCircle} />}
            </View>
            <Text style={[styles.buttonText,{color:colors.primary}]}>{category}</Text>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderRadius: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  buttonSelected: {
    borderColor: '#2563eb', 
    backgroundColor: '#eef4ff',
  },
  buttonText: {
    marginLeft: 8,
    fontSize: 14,
  },
  circle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: '#9ecaff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filledCircle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2563eb',
  },
});
