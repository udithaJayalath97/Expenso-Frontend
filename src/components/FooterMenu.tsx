// components/FooterMenu.tsx
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/auth'; 
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

const FooterMenu: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home')}>
        <Ionicons name="home-outline" size={24} color="#007bff" />
        <Text style={styles.menuText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Notifications')}>
      <Ionicons name="notifications-outline" size={24} color="#007bff" />
      <Text style={styles.menuText}>Notifications</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Activity')}>
        <MaterialCommunityIcons name="chart-timeline-variant" size={24} color="#007bff" />
        <Text style={styles.menuText}>Activity</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Account')}>
        <FontAwesome5 name="user-circle" size={24} color="#007bff" />
        <Text style={styles.menuText}>Account</Text>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
  },
  menuItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 6,
  },
  menuText: {
    color: '#007bff',
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 2,
  },
});

export default FooterMenu;
