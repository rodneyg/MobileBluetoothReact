// components/DeviceList.tsx
import React from 'react';
import { FlatList, Text, View, StyleSheet, RefreshControl } from 'react-native';
import DeviceItem from './DeviceItem';
import EmptyListIndicator from './EmptyListIndicator';

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
  return (
    <FlatList
      data={devices}
      renderItem={({ item }) => <DeviceItem device={item} />}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        devices.length > 0 ? (
          <Text style={styles.headerText}>Found {devices.length} devices:</Text>
        ) : null
      }
      ListEmptyComponent={<EmptyListIndicator />}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          colors={['#0000ff']} // Blue color for the refresh spinner
          tintColor="#0000ff" // Blue color for iOS
        />
      }
      contentContainerStyle={devices.length === 0 ? styles.emptyList : null}
    />
  );
};

const styles = StyleSheet.create({
  headerText: {
    color: '#000000',
    fontSize: 16,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DeviceList;