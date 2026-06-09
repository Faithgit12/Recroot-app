import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthStore } from '../store/authStore';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const router = useRouter();

  const topWaveAnim = useRef(new Animated.Value(0)).current;
  const bottomWaveAnim = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(logoScale, {
        toValue: 1, // Normal scale
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    const animateWaves = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(topWaveAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(topWaveAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();

      Animated.loop(
        Animated.sequence([
          Animated.timing(bottomWaveAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(bottomWaveAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    animateWaves();

    let timer: ReturnType<typeof setTimeout>;
    const checkInitialRoute = async () => {
      try {
        const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');

        timer = setTimeout(() => {
          if (!hasSeenOnboarding) {
            router.replace('/onboarding');
          } else {
            router.replace('/login');
          }
        }, 3500);
      } catch (error) {
        timer = setTimeout(() => {
          router.replace('/login');
        }, 3500);
      }
    };

    checkInitialRoute();

    return () => clearTimeout(timer);
  }, []);

  const topWaveTranslateX = topWaveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 45] 
  });
  const topWaveTranslateY = topWaveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 45]
  });

  const bottomWaveTranslateX = bottomWaveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -45]
  });
  const bottomWaveTranslateY = bottomWaveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -45]
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assets/images/splash/top_wave.png')}
        style={[
          styles.topWave,
          {
            transform: [
              { translateX: topWaveTranslateX },
              { translateY: topWaveTranslateY },
            ]
          }
        ]}
        resizeMode="contain"
      />

      <Animated.Image
        source={require('../assets/images/splash/logo.png')}
        style={[
          styles.logo,
          {
            opacity: logoOpacity,
            transform: [{ scale: logoScale }]
          }
        ]}
        resizeMode="contain"
      />

      <Animated.Image
        source={require('../assets/images/splash/bottom_wave.png')}
        style={[
          styles.bottomWave,
          {
            transform: [
              { translateX: bottomWaveTranslateX },
              { translateY: bottomWaveTranslateY },
            ]
          }
        ]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F5F9', // Matches the light greyish blue background
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: width * 0.65,
    height: 120,
  },
  topWave: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width * 0.7,
    height: width * 0.5,
  },
  bottomWave: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: width * 0.7,
    height: width * 0.5,
  }
});
