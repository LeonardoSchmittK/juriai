import { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  Animated,
} from 'react-native';
import useStore from '../stores/store';
import { useTheme } from 'react-native-paper';

export function UserWriting() {
  const { colors } = useTheme();

  const [text, setText] = useState('');
  const { openWritingContainer, setopenResultContainer } = useStore();

  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {

    if (openWritingContainer) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          friction: 7,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [openWritingContainer]);

  const handleSubmit = () => {
    setopenResultContainer(false);

    if (!text.trim()) {
      Alert.alert('Campo vazio', 'Por favor, escreva sua defesa ou acusação.');
      return;
    }

    setopenResultContainer(true);
    Keyboard.dismiss();
  };

  if (!openWritingContainer) return null;

  return (
    <SafeAreaView style={[styles.safeArea,{borderColor:colors.outline}]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={60}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View style={[styles.card, { opacity, transform: [{ scale }],backgroundColor:colors.background }]}>
            <Text style={[styles.description, {color:colors.primary}]}>
              Um indivíduo foi preso por portar 15g de substância entorpecente. A
              defesa alega uso pessoal. O MP quer enquadrar como tráfico. Faça a
              defesa ou acusação com base no{' '}
              <Text style={styles.bold}>Art. 33 da Lei de Drogas.</Text>
            </Text>

            <TextInput
              style={[styles.input,{color:colors.primary,borderColor:colors.outline}]}
              placeholder="Digite sua defesa ou acusação"
              multiline
              value={text}
              onChangeText={setText}
            />

            <Pressable style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Enviar para análise</Text>
            </Pressable>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    width:"100%",
    borderWidth: 1,
    borderRadius: 12,
  },

  scrollContainer: {
    height:"auto",
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  card: {
    width:"100%",
    borderRadius: 12,
    padding: 16,
  },
  description: {
    fontSize: 14,
    color: '#1f2937',
    marginBottom: 12,
  },
  bold: {
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
});
