import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';
import { useAuth } from '../AuthContext';

const SplashScreen = ({ navigation }) => {
  const { login, isLoggedIn } = useAuth();

  // Animation setup using useRef and Animated.Value
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity for the logo
  const leftLineAnim = useRef(new Animated.Value(0)).current; // Initial opacity for the left line
  const rightLineAnim = useRef(new Animated.Value(0)).current; // Initial opacity for the right line
  const bgColorAnim = useRef(new Animated.Value(0)).current; // Initial background color value

  useEffect(() => {
    // Parallel animations for fade in, lines, and background color change
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000, // Animation duration in milliseconds
        useNativeDriver: true, // To use native driver for performance
      }),
      Animated.timing(leftLineAnim, {
        toValue: 1,
        duration: 2000, // Animation duration in milliseconds
        useNativeDriver: true, // To use native driver for performance
      }),
      Animated.timing(rightLineAnim, {
        toValue: 1,
        duration: 2000, // Animation duration in milliseconds
        useNativeDriver: true, // To use native driver for performance
      }),
      Animated.timing(bgColorAnim, {
        toValue: 2, // We need 2 to create the black -> gray -> white effect
        duration: 2000, // Animation duration in milliseconds
        useNativeDriver: false, // Background color animation doesn't use native driver
      }),
    ]).start(() => {
      // After the animation, check if the user is logged in
      if (isLoggedIn) {
        navigation.replace('MainApp');
      } else {
        navigation.replace('AuthStack');
      }
    });
  }, [fadeAnim, leftLineAnim, rightLineAnim, bgColorAnim, isLoggedIn, navigation]);

  // Interpolating the background color from black to gray to white
  const backgroundColor = bgColorAnim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: ['#000000', '#808080', '#ffffff'] // Black to Gray to White
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor }]}>
      <View style={styles.loaderDiv}>
        <View style={styles.grid}>
          <Animated.View style={[styles.leftDiv, { opacity: leftLineAnim }]}>
            <View style={styles.leftAnimationLineDiv} />
          </Animated.View>
          <Animated.View style={{ opacity: fadeAnim }}>
            <Image
              source={require('../assets/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </Animated.View>
          <Animated.View style={[styles.rightDiv, { opacity: rightLineAnim }]}>
            <View style={styles.rightAnimationLineDiv} />
          </Animated.View>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderDiv: {
    display: 'flex',
    opacity: 1,
  },
  grid: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  leftDiv: {
    transform: [
      { translateX: '0%' },
      { translateY: 0 },
      { scale: 1 },
      { rotateX: '0deg' },
      { rotateY: '0deg' },
      { rotateZ: '0deg' },
      { skewX: '0deg' },
      { skewY: '0deg' }
    ],
  },
  leftAnimationLineDiv: {
    width: 100, // Adjust width as needed
    height: 2,
    backgroundColor: '#000', // Adjust color as needed
  },
  logo: {
    width: 150,
    height: 150, // Adjust these dimensions to fit your needs
  },
  rightDiv: {
    transform: [
      { translateX: '0%' },
      { translateY: 0 },
      { scale: 1 },
      { rotateX: '0deg' },
      { rotateY: '0deg' },
      { rotateZ: '0deg' },
      { skewX: '0deg' },
      { skewY: '0deg' }
    ],
  },
  rightAnimationLineDiv: {
    width: 100, // Adjust width as needed
    height: 2,
    backgroundColor: '#000', // Adjust color as needed
  },
});

export default SplashScreen;
