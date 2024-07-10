import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BLEDevice } from '../utils/fakeBLEData';

interface DeviceItemProps {
  device: BLEDevice;
}

const DeviceItem: React.FC<DeviceItemProps> = ({ device }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{device.name}</Text>
      <Text style={styles.rssi}>RSSI: {device.rssi}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  rssi: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});

export default DeviceItem;