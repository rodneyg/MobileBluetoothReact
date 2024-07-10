import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import DeviceItem from './DeviceItem';
import { BLEDevice } from '../utils/fakeBLEData';

interface DeviceListProps {
  devices: BLEDevice[];
}

const DeviceList: React.FC<DeviceListProps> = ({ devices }) => {
  return (
    <FlatList
      data={devices}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <DeviceItem device={item} />}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    marginTop: 16,
  },
});

export default DeviceList;