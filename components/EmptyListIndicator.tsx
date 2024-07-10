// components/EmptyListIndicator.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EmptyListIndicator = () => (
  <View style={styles.container}>
    <Text style={styles.text}>No devices found</Text>
    <Text style={styles.subText}>Pull down to scan for devices</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 10,
  },
  subText: {
    fontSize: 14,
    color: '#888',
  },
});

export default EmptyListIndicator;