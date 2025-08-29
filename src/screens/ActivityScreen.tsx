import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import FooterMenu from '../components/FooterMenu';
import { useUser } from '../contexts/UserContext'; // Import the custom hook for user context

const ActivityScreen = () => {
  const { user } = useUser();
  const [activities, setActivities] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('All Activities'); // Tab state to track the active tab

  // Load activities when user data changes
  useEffect(() => {
    if (user) {
      // Add readStatus to each activity item
      setActivities(user.activity.map((act) => ({
        ...act,
        readStatus: false // Set default readStatus as false
      })));
    }
  }, [user]);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading activities...</Text>
      </View>
    );
  }

  
  // Function to render activities with bullet points or numbering
  const renderActivity = (item: any, index: number) => {
    const displayText = activeTab === 'Numbered Activities'
      ? `${index + 1}. ${item.description}` // Numbered
      : `• ${item.description}`; // Bulleted

    return (
      <TouchableOpacity
        style={[
          styles.activityContainer,
          item.readStatus ? styles.readNotification : styles.unreadNotification,
        ]}
        onPress={() => !item.readStatus} 
      >
        <Text style={styles.activityText}>{displayText}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Your Activities</Text>

      {/* Tabs for Activity Types */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'All Activities' && styles.activeTab]}
          onPress={() => setActiveTab('All Activities')}
        >
          <Text style={styles.tabText}>All Activities</Text>
        </TouchableOpacity>

        
      </View>

      {/* List of Activities */}
      <FlatList
        data={activities.filter((activity) =>
          activeTab === 'All Activities'
            ? true
            : activeTab === 'Created Activities'
            ? activity.description.includes('created') // Assuming activity description includes "created"
            : activeTab === 'Updated Activities'
            ? activity.description.includes('updated') // Assuming activity description includes "updated"
            : false
        )}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => renderActivity(item, index)}
      />

      <FooterMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa', // Light background color
  },
  text: {
    fontSize: 28,
    fontWeight: '600',
    color: '#343a40', // Darker text color for better contrast
    marginBottom: 20,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tab: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 5,
    backgroundColor: '#dee2e6',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ced4da',
  },
  activeTab: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  tabText: {
    color: '#495057',
    fontSize: 16,
  },
  activityText: {
    fontSize: 18,
    lineHeight: 24,  // Better line spacing for readability
    color: '#495057',  // A subtle dark color for text
    paddingVertical: 8,  // Padding between each item
    width: '100%',  // Full width to align with the container
    backgroundColor: '#ffffff',  // White background for each activity
    borderRadius: 8,  // Rounded corners for each activity item
    marginBottom: 12,  // Margin between items
    paddingHorizontal: 15,  // Padding for text inside each activity box
    shadowColor: '#000',  // Soft shadow for elevation
    shadowOffset: { width: 0, height: 2 },  // Shadow direction
    shadowOpacity: 0.1,  // Slight shadow opacity
    shadowRadius: 4,  // Shadow blur
  },
  activityContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',  // Align the number and text at the top
    marginBottom: 15,  // Spacing between activity items
    width: '100%',  // Full width for each activity item
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
});

export default ActivityScreen;
