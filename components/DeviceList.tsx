import React from 'react';
import { FlatList } from 'react-native';
import DeviceItem from './DeviceItem';

export interface BLEDevice {
  id: string;
  name: string;
  rssi: number;
}

interface DeviceListProps {
  devices: BLEDevice[];
}

const DeviceList: React.FC<DeviceListProps> = ({ devices }) => {
  return (
    <FlatList
      data={devices}
      renderItem={({ item }) => <DeviceItem device={item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default DeviceList;