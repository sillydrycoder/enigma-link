import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import AntDesign from "@expo/vector-icons/AntDesign";

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={require('../assets/images/esp32.png')} style={styles.image} />
        <Text style={styles.title}>No Device Connected</Text>
        <Text style={styles.description}>
          No device is connected currently, please scan (<AntDesign name="link" size={12} color="black" />) for devices first.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    boxShadow: '0 1px 6px 0 rgba(0,0,0,0.34)',
    maxWidth: 300,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: 'black',
    borderWidth: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  description: {
    textAlign: 'center',
    marginTop: 20,
  },
});
