import React from 'react';
import { Text, View, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const DATA = [
  {
    index: 0,
    title: 'ESP-EM-235641',
  },
  {
    index: 2,
    title: 'ESP-EM-453654',
  },
  {
    index: 3,
    title: 'ESP-EM-883467d',
  },
  {
    index: 4,
    title: 'ESP-EM-883467',
  },
  {
    index: 5,
    title: 'ESP-EM-883467',
  },
  {
    index: 6,
    title: 'ESP-EM-883467',
  },
];

type ItemProps = { title: string, index: number };

const Item = ({ title, index }: ItemProps) => (
  <View style={[styles.itemContainer, index !== 0 && styles.itemBorder]}>
    <Text style={styles.itemText} numberOfLines={1} ellipsizeMode="tail">
      {title}
    </Text>
    <TouchableOpacity
      touchSoundDisabled={false}
      onPress={() => alert('Button Pressed')}
      style={styles.connectButton}
    >
      <Text style={styles.connectButtonText}>Connect</Text>
    </TouchableOpacity>
  </View>
);

export default function Connect() {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        touchSoundDisabled={false}
        onPress={() => alert('Button Pressed')}
        style={styles.scanButton}
      >
        <Text style={styles.scanButtonText}>Disconnect</Text>
      </TouchableOpacity>
      <FlatList
        style={styles.deviceList}
        data={DATA}
        renderItem={({ item }) => <Item title={item.title} index={item.index} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  scanButton: {
    backgroundColor: 'black',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  scanButtonText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
  deviceList: {
    marginTop: 10,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  itemBorder: {
    borderTopColor: 'black',
    borderTopWidth: 1,
  },
  itemText: {
    fontSize: 20,
  },
  connectButton: {
    backgroundColor: 'black',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  connectButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
  },
});
