import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function BottomTabs({ activeTab }: { activeTab: 'home' | 'jobs' | 'apps' | 'profile' }) {
  const router = useRouter();

  return (
    <View style={styles.tabBar}>
      <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/home')}>
        <Ionicons name="home" size={24} color={activeTab === 'home' ? '#183C6B' : '#6B7280'} />
        <Text style={[styles.tabText, activeTab === 'home' && styles.tabTextActive]}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/jobs')}>
        <Ionicons name="briefcase-outline" size={24} color={activeTab === 'jobs' ? '#183C6B' : '#6B7280'} />
        <Text style={[styles.tabText, activeTab === 'jobs' && styles.tabTextActive]}>Jobs</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/apps')}>
        <Ionicons name="grid-outline" size={24} color={activeTab === 'apps' ? '#183C6B' : '#6B7280'} />
        <Text style={[styles.tabText, activeTab === 'apps' && styles.tabTextActive]}>Apps</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/profile')}>
        <Ionicons name="person-outline" size={24} color={activeTab === 'profile' ? '#183C6B' : '#6B7280'} />
        <Text style={[styles.tabText, activeTab === 'profile' && styles.tabTextActive]}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: Platform.OS === 'ios' ? 85 : 70,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  tabItem: {
    alignItems: 'center',
  },
  tabText: {
    fontSize: 11,
    marginTop: 4,
    color: '#6B7280',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#1A1A1A',
  }
});
