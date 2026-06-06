import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import BottomTabs from '../_components/BottomTabs';

export default function ProfileScreen() {
  const router = useRouter();

  const menuItems = [
    { id: '1', title: 'Personal Information', route: '/profile/personal-info' },
    { id: '2', title: 'Work Experience', route: '/profile/work-experience' },
    { id: '3', title: 'Education', route: '/profile/education' },
    { id: '4', title: 'Skills', route: '/profile/skills' },
    { id: '5', title: 'Resume', route: '/resume' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/home')}>
          <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Profile</Text>
        
        <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/profile/settings')}>
          <Ionicons name="settings-outline" size={24} color="#1A1A1A" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.userInfoRow}>
            <View style={styles.avatarContainer}>
              {/* Fallback avatar if no image is present */}
              <Ionicons name="person-circle" size={54} color="#CBD5E1" />
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>Alex Joshua</Text>
              <Text style={styles.userRole}>Candidate</Text>
            </View>
          </View>

          <View style={styles.profileStrengthContainer}>
            <View style={styles.profileStrengthHeader}>
              <Text style={styles.profileStrengthLabel}>Profile Strength</Text>
              <Text style={styles.profileStrengthValue}>96%</Text>
            </View>
            <View style={styles.progressBarBackground}>
              <View style={[styles.progressBarFill, { width: '96%' }]} />
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.menuItem}
              onPress={() => {
                if (item.route) {
                  router.push(item.route as any);
                }
              }}
            >
              <Text style={styles.menuItemText}>{item.title}</Text>
              <Ionicons name="chevron-forward" size={20} color="#6B7280" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Edit Profile Button */}
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* Bottom Navigation */}
      <BottomTabs activeTab="profile" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF3F9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  iconButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#183C6B',
  },
  scrollArea: {
    flex: 1,
    paddingHorizontal: 24,
  },
  profileCard: {
    backgroundColor: '#EEF3F9',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    padding: 16,
    marginBottom: 24,
    marginTop: 16,
  },
  userInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    overflow: 'hidden',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1A1A1A',
  },
  userRole: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  profileStrengthContainer: {
    width: '100%',
  },
  profileStrengthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  profileStrengthLabel: {
    fontSize: 14,
    color: '#1A1A1A',
  },
  profileStrengthValue: {
    fontSize: 14,
    color: '#1A1A1A',
  },
  progressBarBackground: {
    height: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 5,
  },
  menuContainer: {
    marginBottom: 24,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  menuItemText: {
    fontSize: 14,
    color: '#1A1A1A',
    fontWeight: '500',
  },
  editButton: {
    backgroundColor: '#183C6B',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 32,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
