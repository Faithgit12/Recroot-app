import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { fetchUserActivities, ActivitySource } from '../../services/api/reports';
import { useReportStore } from '../../store/reportStore';

export default function CreateReportScreen() {
  const router = useRouter();
  
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  
  const { recentActivities, setActivities } = useReportStore();
  
  const [isLoading, setIsLoading] = useState(recentActivities.length === 0);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const data = await fetchUserActivities();
        setActivities(data); // This automatically keeps the last 10
      } catch (error) {
        console.error("Error loading activities:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadActivities();
  }, []);

  const reportTypes = [
    {
      id: 'Match Report',
      title: 'Match Report',
      subtitle: 'Detailed Match score and skills analysis',
      icon: 'document-text-outline',
      iconColor: '#183C6B'
    },
    {
      id: 'Interview Prep Report',
      title: 'Interview Prep Report',
      subtitle: 'Questions and preparation guide',
      icon: 'calendar-outline',
      iconColor: '#EF4444' // Red color matching design
    }
  ];



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <Text style={styles.pageTitle}>Create New Report</Text>
        <Text style={styles.pageSubtitle}>Choose the type of report you want to generate</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll} contentContainerStyle={styles.reportTypesContainer}>
          {reportTypes.map((type) => (
            <TouchableOpacity 
              key={type.id} 
              style={[
                styles.typeCard, 
                selectedType === type.id && styles.typeCardSelected
              ]}
              onPress={() => setSelectedType(type.id)}
            >
              <View style={styles.typeIconContainer}>
                <Ionicons name={type.icon as any} size={28} color={type.iconColor} />
              </View>
              <Text style={styles.typeTitle}>{type.title}</Text>
              <Text style={styles.typeSubtitle}>{type.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {selectedType && (
          <>
            <Text style={styles.sectionTitle}>Select Source</Text>

            <View style={styles.sourcesContainer}>
              {isLoading ? (
                <View style={{ padding: 24, alignItems: 'center' }}>
                  <ActivityIndicator size="large" color="#183C6B" />
                  <Text style={{ marginTop: 12, color: '#6B7280' }}>Loading past activities...</Text>
                </View>
              ) : (
                recentActivities
                  .filter((source) => {
                    if (selectedType === 'Interview Prep Report') return source.type === 'interview';
                    if (selectedType === 'Match Report') return source.type === 'match' || source.type === 'job';
                    return true;
                  })
                  .map((source) => (
                  <TouchableOpacity 
                    key={source.id} 
                    style={[
                      styles.sourceCard,
                      selectedSource === source.id && styles.sourceCardSelected
                    ]}
                    onPress={() => setSelectedSource(source.id)}
                  >
                    <View style={styles.sourceIconContainer}>
                      <Ionicons name={source.icon as any} size={24} color="#6B7280" />
                    </View>
                    <View style={styles.sourceTextContainer}>
                      <Text style={styles.sourceTitle}>{source.title}</Text>
                      <Text style={styles.sourceSubtitle}>{source.subtitle}</Text>
                    </View>
                  </TouchableOpacity>
                ))
              )}
            </View>

            <TouchableOpacity 
              style={[styles.continueButton, !selectedSource && { backgroundColor: '#94A3B8' }]} 
              onPress={() => {
                if (selectedSource) {
                  const sourceObj = recentActivities.find(s => s.id === selectedSource);
                  router.push({ 
                    pathname: '/report/export', 
                    params: { 
                      type: selectedType, 
                      sourceId: selectedSource,
                      questions: sourceObj?.questions ? JSON.stringify(sourceObj.questions) : undefined,
                      rawData: sourceObj?.rawData ? JSON.stringify(sourceObj.rawData) : undefined
                    } 
                  } as any);
                }
              }}
              disabled={!selectedSource}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </>
        )}

      </ScrollView>
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
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#183C6B',
    marginBottom: 8,
  },
  pageSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 24,
  },
  horizontalScroll: {
    marginBottom: 32,
    marginHorizontal: -24, // bleed to edges
  },
  reportTypesContainer: {
    paddingHorizontal: 24,
    gap: 16,
  },
  typeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    width: 160,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  typeCardSelected: {
    borderColor: '#183C6B',
    backgroundColor: '#F8FAFC',
  },
  typeIconContainer: {
    marginBottom: 12,
  },
  typeTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 8,
  },
  typeSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  sourcesContainer: {
    marginBottom: 32,
  },
  sourceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  sourceCardSelected: {
    borderColor: '#183C6B',
    backgroundColor: '#F0F4F8',
  },
  sourceIconContainer: {
    marginRight: 16,
  },
  sourceTextContainer: {
    flex: 1,
  },
  sourceTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  sourceSubtitle: {
    fontSize: 13,
    color: '#6B7280',
  },
  continueButton: {
    backgroundColor: '#183C6B',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
