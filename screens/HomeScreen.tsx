import React, { useState, useEffect } from 'react';
import { View, Button, NativeEventEmitter, NativeModules, Platform, PermissionsAndroid } from 'react-native';
import BleManager from 'react-native-ble-manager';
import DeviceList, { BLEDevice } from '../components/DeviceList';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const HomeScreen = () => {
  const [devices, setDevices] = useState<BLEDevice[]>([]);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    BleManager.start({ showAlert: false });

    const discoverListener = bleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      (device) => {
        setDevices((prevDevices) => {
          if (!prevDevices.find((d) => d.id === device.id)) {
            return [...prevDevices, {
              id: device.id,
              name: device.name || 'Unknown',
              rssi: device.rssi,
            }];
          }
          return prevDevices;
        });
      }
    );

    return () => {
      discoverListener.remove();
    };
  }, []);

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

  const scanDevices = async () => {
    const bluetoothPermission = await requestBluetoothPermissions();
    if (bluetoothPermission) {
      setScanning(true);
      BleManager.scan([], 10, true).then(() => {
        console.log('Scanning...');
      });
  
      setTimeout(() => {
        BleManager.stopScan().then(() => {
          setScanning(false);
          console.log('Scan stopped');
        });
      }, 10000);
    } else {
      console.log('Bluetooth scan permission denied');
      // You might want to show an alert to the user here
    }
  };

  return (
    <View>
      <Button title={scanning ? 'Scanning...' : 'Scan for Devices'} onPress={scanDevices} disabled={scanning} />
      <DeviceList devices={devices} />
    </View>
  );
};

export default HomeScreen;