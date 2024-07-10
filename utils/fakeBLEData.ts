export interface BLEDevice {
    id: string;
    name: string;
    rssi: number;
  }
  
  const generateFakeDevice = (id: number): BLEDevice => ({
    id: id.toString(),
    name: `Device ${id}`,
    rssi: Math.floor(Math.random() * (-30 - (-90) + 1)) + (-90),
  });
  
  export const getFakeBLEDevices = (): BLEDevice[] => {
    const numberOfDevices = Math.floor(Math.random() * 10) + 1;
    return Array.from({ length: numberOfDevices }, (_, i) => generateFakeDevice(i + 1));
  };
  
  // Remove this line as it's not needed and causing the error
  // export default { BLEDevice, getFakeBLEDevices };