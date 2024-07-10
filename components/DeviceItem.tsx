import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BLEDevice } from './DeviceList';  // Import BLEDevice type from DeviceList

interface DeviceItemProps {
  device: BLEDevice;  // Change this to BLEDevice
}

const DeviceItem: React.FC<DeviceItemProps> = ({ device }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{device.name || 'Unknown Device'}</Text>
      <Text style={styles.info}>ID: {device.id}</Text>
      <Text style={styles.info}>RSSI: {device.rssi}</Text>
      {/* Remove or comment out any properties that aren't in BLEDevice */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 14,
  },
});

export default DeviceItem;