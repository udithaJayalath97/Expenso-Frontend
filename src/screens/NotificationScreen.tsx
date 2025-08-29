import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Notifications, useUser } from '../contexts/UserContext'; // Import your UserContext
import FooterMenu from '../components/FooterMenu';

const NotificationScreen = () => {
  const { user, reloadUserContext } = useUser(); // Access user context
  const [notifications, setNotifications] = useState(user?.notifications || []);

  // Fetch notifications again if user data changes
  useEffect(() => {
    if (user) {
      setNotifications(user.notifications);
    }
  }, [user]);

  // Mark a notification as read and update in the backend
  const markAsRead = async (notificationId: number) => {
    try {
      // Send a request to the backend to update the read status
      const response = await fetch(`http://10.0.2.2:8080/api/notifications/mark-read/${notificationId}`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error(`Failed to update notification: ${response.status}`);
      }

      // Update the local state to reflect the change
      setNotifications((prevNotifications) =>
        prevNotifications.map((notifi) =>
          notifi.id === notificationId ? { ...notifi, readStatus: true } : notifi
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
      Alert.alert('Error', 'Could not update notification status');
    }
  };

  // Render each notification
  const renderItem = ({ item }: { item: Notifications }) => (
    <TouchableOpacity
      style={[
        styles.notificationItem,
        item.readStatus ? styles.readNotification : styles.unreadNotification,
      ]}
      onPress={() => !item.readStatus && markAsRead(item.id)} // Mark as read if not already read
    >
      <Text style={styles.notificationText}>{item.message}</Text>
      <Text style={styles.notificationTime}>
        {new Date(item.createdAt).toLocaleString()}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
  <Text style={styles.text}>Your Notifications</Text>
  {notifications && notifications.length > 0 ? (
    <FlatList
      data={notifications}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
    />
  ) : (
    <Text>No notifications available.</Text>  // Fallback message
  )}
  <FooterMenu />
</View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  text: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  notificationItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  unreadNotification: {
    borderLeftWidth: 5,
    borderLeftColor: '#007bff', // Blue color for unread notifications
    backgroundColor: '#e9f7fe', // Light blue background for unread notifications
  },
  readNotification: {
    borderLeftWidth: 5,
    borderLeftColor: '#6c757d', // Grey color for read notifications
    backgroundColor: '#f8f9fa', // Light gray background for read notifications
  },
  notificationText: {
    fontSize: 18,
    color: '#495057',
    fontWeight: 'bold',
  },
  notificationTime: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 5,
  },
});

export default NotificationScreen;
