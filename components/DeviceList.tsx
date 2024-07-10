import React from 'react';
import { FlatList, Text, View, StyleSheet, RefreshControl } from 'react-native';
import DeviceItem from './DeviceItem';

export interface BLEDevice {
  id: string;
  name: string;
  rssi: number;
}

interface DeviceListProps {
  devices: BLEDevice[];
  onRefresh: () => void;
  isRefreshing: boolean;
}

const DeviceList: React.FC<DeviceListProps> = ({ devices, onRefresh, isRefreshing }) => {
  if (devices.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.text}>No devices found</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={devices}
      renderItem={({ item }) => <DeviceItem device={item} />}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <Text style={styles.text}>Found {devices.length} devices:</Text>
      }
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          colors={['#0000ff']} // Blue color for the refresh spinner
          tintColor="#0000ff" // Blue color for iOS
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#000000',
    fontSize: 16,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DeviceList;