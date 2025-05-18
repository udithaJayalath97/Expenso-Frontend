import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FooterMenu from '../components/FooterMenu';

const AccountScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Account Screen</Text>
    <FooterMenu />
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 24 }
});

export default AccountScreen;