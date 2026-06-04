import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { styles } from './styles';
import { CustomInput } from './components/CustomInput';
import { CustomDropdown } from './components/CustomDropdown';

export default function ProfessionalStoryScreen() {
  const router = useRouter();

  const [experienceLevel, setExperienceLevel] = useState('');
  const [industry, setIndustry] = useState('');
  const [roleType, setRoleType] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [skills, setSkills] = useState('');
  const [linkedin, setLinkedin] = useState('');

  const handleContinue = () => {
    router.push('/profile/upload-resume');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#EEF3F9' }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Your Professional Story</Text>
        <Text style={styles.subtitle}>Let's set up your career profile</Text>

        <CustomDropdown
          label="Experience Level"
          value={experienceLevel}
          options={['Less than 1 year', '1 - 2 years', '3 - 5 years', '6 - 10 years', '10+ years']}
          onSelect={setExperienceLevel}
        />

        <CustomDropdown
          label="Industry"
          value={industry}
          options={['Healthcare', 'Education', 'Media & Communication', 'Retail & E-commerce', 'NGO/ Non-Profit', 'Government', 'Educational Institution', 'Other']}
          onSelect={setIndustry}
        />

        <CustomInput
          label="Role type"
          placeholder=""
          value={roleType}
          onChangeText={setRoleType}
        />

        <CustomDropdown
          label="Employment type"
          value={employmentType}
          options={['Full Time', 'Contract', 'Part Time', 'Freelance', 'Internship']}
          onSelect={setEmploymentType}
        />

        <CustomDropdown
          label="Skills"
          value={skills}
          options={['Digital Marketing', 'SEO & SEM', 'Social Media Marketing', 'Email Marketing', 'Data Visualization', 'Other']}
          onSelect={setSkills}
        />

        <CustomInput
          label="LinkedIn Link"
          placeholder=""
          value={linkedin}
          onChangeText={setLinkedin}
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
