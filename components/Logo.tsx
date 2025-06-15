import { Image, StyleSheet, View } from 'react-native';

export function Logo() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={require('../assets/images/logo-juriai.png')}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tinyLogo: {
    width: 120,
    height: 50,
  },
});
