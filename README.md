# MobileBluetoothReact App

This app scans for nearby Bluetooth Low Energy (BLE) devices, displays them in a list and supports both iOS and Android via ReactNative.

This README provides information for developers to set up and run the app, as well as for QA engineers to test the builds.

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- React Native CLI
- Xcode
- Android Studio
- A physical iOS or Android device for testing BLE functionality

## Dependencies

- react: 17.0.2
- react-native: 0.68.2
- react-native-ble-manager: ^8.0.2

For a complete list of dependencies, please refer to the `package.json` file.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/rodneyg/MobileBluetoothReact.git
   cd ble-scanner-app
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Install iOS dependencies:
   ```
   cd ios
   pod install
   cd ..
   ```

## Running the App on a Real Device

### iOS

1. Open the `ios/MobileBluetoothReact.xcodeproj` file in Xcode.
2. Connect your iOS device to your Mac.
3. In Xcode, select your device from the device dropdown in the top left corner.
4. Click the "Play" button or press `Cmd + R` to build and run the app on your device.

Note: You may need to run pod install for Cocoapods and to set up code signing in Xcode and trust the developer on your iOS device.

### Android

1. Enable Developer Options and USB Debugging on your Android device.
2. Connect your Android device to your computer via USB.
3. Open a terminal and run:
   ```
   npx react-native run-android
   ```

## For QA Engineers

If you're working with built app binaries:

### iOS
1. Install the `.ipa` file on your iOS device using Apple TestFlight or a similar service.
2. Ensure Bluetooth is enabled on your device.
3. Launch the app and grant necessary permissions when prompted.

### Android
1. Install the `.apk` file on your Android device.
2. Ensure Bluetooth is enabled on your device.
3. Launch the app and grant necessary permissions when prompted.

## Notes and Caveats

- BLE functionality requires testing on physical devices. Emulators/simulators will not work for BLE scanning.
- The app requires Bluetooth and Location permissions. On iOS, it will also ask for Local Network permissions.
- On Android 12 and above, the app needs additional permissions (BLUETOOTH_SCAN and BLUETOOTH_CONNECT).
- The scanning process times out after 10 seconds to conserve battery life.

## Dot Files and Configuration

- `.gitignore`: Specifies intentionally untracked files to ignore
- `.watchmanconfig`: Configuration file for Watchman
- `.eslintrc.js`: ESLint configuration
- `.prettierrc.js`: Prettier configuration
- `babel.config.js`: Babel configuration
- `metro.config.js`: Metro bundler configuration

## Troubleshooting

If you encounter any issues:

1. Ensure all permissions are granted to the app.
2. For Android, make sure Location Services are enabled on the device.
3. Clean and rebuild the project:
   - For iOS: In Xcode, go to Product > Clean Build Folder
   - For Android: `cd android && ./gradlew clean && cd ..`
