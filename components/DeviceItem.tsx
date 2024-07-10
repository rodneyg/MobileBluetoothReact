import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BLEDevice } from './DeviceList';

interface DeviceItemProps {
  device: BLEDevice;
}

const DeviceItem: React.FC<DeviceItemProps> = ({ device }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{device.name || 'Unknown Device'}</Text>
      <Text style={styles.info}>ID: {device.id}</Text>
      <Text style={styles.info}>Signal: {device.rssi}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#f0f0f0',
    marginVertical: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000', // Black color
  },
  info: {
    fontSize: 14,
    color: '#333333', // Dark gray color
  },
});

export default DeviceItem;