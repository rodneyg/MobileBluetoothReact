import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import DeviceList from '../components/DeviceList';
import { getFakeBLEDevices, BLEDevice } from '../utils/fakeBLEData';

const HomeScreen: React.FC = () => {
  const [devices, setDevices] = useState<BLEDevice[]>([]);
  const [isScanning, setIsScanning] = useState<boolean>(false);

  const scanDevices = useCallback(() => {
    setIsScanning(true);
    setTimeout(() => {
      const fakeDevices = getFakeBLEDevices();
      setDevices(fakeDevices);
      setIsScanning(false);
    }, 2000);
  }, []);

  useEffect(() => {
    scanDevices();
    const interval = setInterval(scanDevices, 5000);
    return () => clearInterval(interval);
  }, [scanDevices]);

  return (
    <View style={styles.container}>
      <Button
        title={isScanning ? 'Scanning...' : 'Scan for Devices'}
        onPress={scanDevices}
        disabled={isScanning}
      />
      <DeviceList devices={devices} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default HomeScreen;