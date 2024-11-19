import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, ImageBackground } from 'react-native';
import * as SplashScreen from 'expo-splash-screen'
export default function StartScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      async function prepare() {
        try {
          await SplashScreen.preventAutoHideAsync();
          await new Promise(resolve => setTimeout(resolve, 2000)); // 2초 대기
        } catch (e) {
          console.warn(e);
        } finally {
          await SplashScreen.hideAsync();
          setIsLoading(false);
        }
      }
      prepare();
    }, []);

    const handlePress = () => {
      navigation.navigate('Image'); 
    };
  
    if (isLoading) {
      return (
        <View style={styles.splashContainer}>
          <Text style={styles.splashText}>Loading...</Text>
        </View>
      );
    }
  
    return (
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={styles.background}>
          <ImageBackground
            source={require('../assets/PressToStart.png')} // 배경 이미지
            style={styles.background}
            resizeMode="cover" // 이미지를 화면에 맞게 조절
          >
            <View style={styles.overlay}>
              <Text style={styles.text}>                                                                                                                                                                                      </Text>
            </View>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    );
  }
  
  const styles = StyleSheet.create({
    background: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    splashContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    splashText: {
      fontSize: 24,
      fontWeight: 'bold',
    },
  });