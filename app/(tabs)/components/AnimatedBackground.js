// AnimatedBackground.js
import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';

const AnimatedBackground = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = () => {
      animatedValue.setValue(0);
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 10000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => animate());
    };

    animate();

    return () => animatedValue.stopAnimation();
  }, [animatedValue]);

  const rotate = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.background}>
      <Animated.View style={[styles.shape1, { transform: [{ rotate }] }]} />
      <Animated.View style={[styles.shape2, { transform: [{ rotate }] }]} />
      <Animated.View style={[styles.shape3, { transform: [{ rotate }] }]} />
      <Animated.View style={[styles.shape4, { transform: [{ rotate }] }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shape1: {
    width: 300,
    height: 300,
    backgroundColor: 'rgba(255, 107, 107, 0.5)',
    borderRadius: 30,
    position: 'absolute',
    top: -50,
    left: -50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 20,
  },
  shape2: {
    width: 200,
    height: 200,
    backgroundColor: 'rgba(255, 217, 61, 0.5)',
    borderRadius: 20,
    position: 'absolute',
    top: 150,
    right: -50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 20,
  },
  shape3: {
    width: 150,
    height: 150,
    backgroundColor: 'rgba(107, 203, 119, 0.5)',
    borderRadius: 15,
    position: 'absolute',
    bottom: -50,
    left: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 20,
  },
  shape4: {
    width: 250,
    height: 250,
    backgroundColor: 'rgba(102, 153, 255, 0.5)',
    borderRadius: 25,
    position: 'absolute',
    bottom: 150,
    right: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 20,
  },
});

export default AnimatedBackground;
