import React, { useState, useEffect, useCallback } from 'react';
import { View, Button, NativeEventEmitter, NativeModules, Platform, PermissionsAndroid, StyleSheet } from 'react-native';
import BleManager from 'react-native-ble-manager';
import DeviceList, { BLEDevice } from '../components/DeviceList';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const HomeScreen = () => {
  const [devices, setDevices] = useState<BLEDevice[]>([]);
  const [scanning, setScanning] = useState(false);

  const scanDevices = useCallback(async () => {
    const permissionsGranted = await requestBluetoothPermissions();
    if (permissionsGranted) {
      try {
        console.log('Starting scan...');
        setScanning(true);
        setDevices([]); // Clear existing devices
        await BleManager.scan([], 3, true); // Scan for 3 seconds
        console.log('Scan started successfully');
        
        // Set a timeout to stop scanning after 3 seconds
        setTimeout(() => {
          BleManager.stopScan().then(() => {
            console.log('Scan stopped');
            setScanning(false);
          });
        }, 3000);
      } catch (error) {
        console.error('Error during scan:', error);
        setScanning(false);
      }
    } else {
      console.log('Required permissions not granted');
    }
  }, []);

  useEffect(() => {
    // Start BLE Manager
    BleManager.start({showAlert: false});
  
    // Add event listener for discovered peripherals
    const discoverListener = bleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      (device) => {
        console.log('Discovered device:', device);
        setDevices((prevDevices) => {
          if (!prevDevices.some(d => d.id === device.id)) {
            return [...prevDevices, {
              id: device.id,
              name: device.name || 'Unknown Device',
              rssi: device.rssi
            }];
          }
          return prevDevices;
        });
      }
    );

    // Set up interval for scanning every 5 seconds
    const scanInterval = setInterval(() => {
      if (!scanning) {
        scanDevices();
      }
    }, 5000);
  
    // Clean up
    return () => {
      discoverListener.remove();
      clearInterval(scanInterval);
    };
  }, [scanDevices, scanning]);

  const requestBluetoothPermissions = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 31) {
      const bluetoothScan = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        {
          title: "Bluetooth Scan Permission",
          message: "This app needs access to scan for Bluetooth devices.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      const bluetoothConnect = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        {
          title: "Bluetooth Connect Permission",
          message: "This app needs access to connect to Bluetooth devices.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      const fineLocation = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message: "This app needs access to your location for Bluetooth scanning.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
  
      return bluetoothScan === 'granted' && bluetoothConnect === 'granted' && fineLocation === 'granted';
    }
    return true;
  };

  const handleRefresh = () => {
    scanDevices();
  };

  return (
    <View style={styles.container}>
      <Button 
        title={scanning ? 'Scanning...' : 'Scan for Devices'} 
        onPress={scanDevices} 
        disabled={scanning} 
      />
      <DeviceList 
        devices={devices} 
        onRefresh={handleRefresh} 
        isRefreshing={scanning} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
});

export default HomeScreen;