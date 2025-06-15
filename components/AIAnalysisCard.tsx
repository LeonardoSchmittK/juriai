import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import useStore from '../stores/store';
import { useTheme } from 'react-native-paper';

export function AIAnalysisCard() {
  const { openResultContainer } = useStore();
  const { colors } = useTheme();

  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    if (openResultContainer) {
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
  }, [openResultContainer]);

  if (!openResultContainer) return null;

  return (
    <Animated.View
      style={[
        styles.card,
        {
          opacity,
          transform: [{ scale }],
          backgroundColor: colors.background,
          borderColor: colors.outline,
        },
      ]}
    >
      <Text style={[styles.title, { color: colors.primary }]}>Análise da IA</Text>

      <View style={styles.row}>
        <MaterialIcons name="check-circle" size={16} color="#22c55e" />
        <Text style={[styles.text, { color: colors.primary }]}>
          Você citou corretamente o Art. 33.
        </Text>
      </View>

      <View style={styles.row}>
        <MaterialIcons name="error" size={16} color="#facc15" />
        <Text style={[styles.text, { color: colors.primary }]}>
          Faltou abordar a Súmula 512 do STJ.
        </Text>
      </View>

      <View style={styles.row}>
        <Feather name="alert-circle" size={16} color="#f97316" />
        <Text style={[styles.text, { color: colors.primary }]}>
          Sugestão: enfatize a quantidade e ausência de prova de comércio
        </Text>
      </View>

      <Text style={[styles.grade, { color: colors.primary }]}>
        Nota: <Text style={[styles.bold, { color: colors.primary }]}>7,5 / 10</Text>
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    gap: 8,
  },
  title: {
    fontWeight: '600',
    marginBottom: 4,
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
  },
  text: {
    fontSize: 13,
    flex: 1,
  },
  grade: {
    marginTop: 8,
    fontSize: 13,
  },
  bold: {
    fontWeight: 'bold',
  },
});
