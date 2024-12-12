import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import requestBlePermissions from '@/utils/BLE';
import { BleManager, Device } from 'react-native-ble-plx';

const bleManager = new BleManager();

type ItemProps = { title: string, index: number };

const Item = ({ title, index }: ItemProps) => (
  <View style={[styles.itemContainer, index !== 0 && styles.itemBorder]}>
    <Text style={styles.itemText} numberOfLines={1} ellipsizeMode="tail">
      {title}
    </Text>
    <TouchableOpacity
      touchSoundDisabled={false}
      onPress={() => Alert.alert('Connect Button Pressed', `Connecting to ${title}`)}
      style={styles.connectButton}
    >
      <Text style={styles.connectButtonText}>Connect</Text>
    </TouchableOpacity>
  </View>
);

export default function Connect() {
  const [devices, setDevices] = useState<Device[]>([]);

  const isDuplicateDevice = (currentDevices: Device[], newDevice: Device) =>
    currentDevices.findIndex((device) => device.id === newDevice.id) > -1;

  const scanDevices = async () => {
    const hasPermission = await requestBlePermissions();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Bluetooth permissions are required.');
      return;
    }

    setDevices([]); // Clear the device list before scanning
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to start scanning for devices.');
        return;
      }

      if (
        device &&
        (device.localName || device.name) // Filter out devices with no name
      ) {
        setDevices((prevDevices) => {
          if (!isDuplicateDevice(prevDevices, device)) {
            return [...prevDevices, device];
          }
          return prevDevices;
        });
      }
    });

    // Stop scanning after 10 seconds
    setTimeout(() => {
      bleManager.stopDeviceScan();
      Alert.alert('Scanning Stopped', 'Finished scanning for devices.');
    }, 10000);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        touchSoundDisabled={false}
        onPress={scanDevices}
        style={styles.scanButton}
      >
        <Text style={styles.scanButtonText}>Scan Devices</Text>
      </TouchableOpacity>
      <FlatList
        style={styles.deviceList}
        data={devices}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <Item
            title={item.name || item.localName || 'Unknown Device'}
            index={index}
          />
        )}
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
