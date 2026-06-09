import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen() {
  const router = useRouter();
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const settingsItems = [
    { id: '1', title: 'Account Settings', route: '' },
    { id: '2', title: 'Privacy', route: '' },
    { id: '3', title: 'Notification Preferences', route: '' },
    { id: '4', title: 'Change Password', route: '' },
    { id: '5', title: 'Language', route: '' },
    { id: '6', title: 'Help & Support', route: '/profile/help-support' },
    { id: '7', title: 'About Us', route: '' },
  ];

  const handleLogout = async () => {
    try {
      setLogoutModalVisible(false);
      await AsyncStorage.removeItem('savedEmail');
      await AsyncStorage.removeItem('rememberMe');
      router.replace('/login');
    } catch (e) {
      console.error('Error logging out', e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 60 }}>
          
          <View style={styles.illustrationContainer}>
            <View style={styles.illustrationCircle}>
              <Ionicons name="settings" size={60} color="#3B82F6" />
              <View style={styles.decorativeElement1} />
              <View style={styles.decorativeElement2} />
            </View>
          </View>

          <View style={styles.listContainer}>
            {settingsItems.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={styles.listItem}
                onPress={() => {
                  if (item.route) {
                    router.push(item.route as any);
                  }
                }}
              >
                <Text style={styles.listItemText}>{item.title}</Text>
                <Ionicons name="chevron-forward" size={20} color="#6B7280" />
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={() => setLogoutModalVisible(true)}
          >
            <Ionicons name="log-out-outline" size={24} color="#EF4444" style={styles.logoutIcon} />
            <Text style={styles.logoutButtonText}>Log Out</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>

      <Modal
        visible={logoutModalVisible}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={() => setLogoutModalVisible(false)}
            >
              <Ionicons name="close" size={24} color="#1A1A1A" />
            </TouchableOpacity>

            <View style={styles.modalIconContainer}>
              <Ionicons name="log-out-outline" size={32} color="#EF4444" />
            </View>

            <Text style={styles.modalTitle}>Log out of Recroot?</Text>
            <Text style={styles.modalSubtitle}>You will be safely logged out from your account</Text>

            <TouchableOpacity style={styles.confirmLogoutButton} onPress={handleLogout}>
              <Text style={styles.confirmLogoutText}>Yes, Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF3F9',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  iconButton: {
    padding: 4,
    alignSelf: 'flex-start',
  },
  scrollArea: {
    flex: 1,
    paddingHorizontal: 24,
  },
  illustrationContainer: {
    alignItems: 'center',
    marginVertical: 32,
  },
  illustrationCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#DBEAFE',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  decorativeElement1: {
    position: 'absolute',
    bottom: 20,
    right: 10,
    width: 40,
    height: 40,
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  decorativeElement2: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 24,
    height: 4,
    backgroundColor: '#3B82F6',
    borderRadius: 2,
  },
  listContainer: {
    marginBottom: 24,
  },
  listItem: {
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
  listItemText: {
    fontSize: 14,
    color: '#1A1A1A',
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEE2E2',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(238, 243, 249, 0.95)', // Semi-transparent matching background
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '100%',
    padding: 24,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: -60,
    right: 24,
    padding: 8,
  },
  modalIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FCA5A5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#183C6B',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
  },
  confirmLogoutButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  confirmLogoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
