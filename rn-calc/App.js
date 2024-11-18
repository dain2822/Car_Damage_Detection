import React, { useState, useEffect } from 'react';
import { Button, Image, View, StyleSheet, Alert ,Text} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [predictionResult, setPredictionResult] = useState("");

    // 권한 요청 함수
    const requestPermission = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert(
                "Permission Required",
                "We need your permission to access your photo library."
            );
        }
    };

    // 권한 요청을 앱 시작 시 수행
    useEffect(() => {
        requestPermission();
    }, []);

    // 이미지 선택 함수
    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
            });

            if (!result.canceled) {
                setSelectedImage(result.assets[0].uri); // 선택한 이미지 URI 저장
                setPredictionResult(""); // 새로운 이미지를 선택할 때 결과 초기화
            }
        } catch (error) {
            console.error("Error picking image:", error);
            Alert.alert("Error", "Something went wrong while accessing the gallery.");
        }
    };
    

    // 이미지 업로드 함수
    const uploadImage = async () => {
        if (!selectedImage) {
            Alert.alert("No Image Selected", "Please select an image before uploading.");
            return;
        }

        let formData = new FormData();
        formData.append("image", {
            uri: selectedImage,
            type: "image/jpeg",
            name: "photo.jpg",
        });

        try {
            let response = await fetch("http://192.168.0.247:5000/upload", {
                method: "POST",
                body: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            let json = await response.json();
            if (response.ok) {
                Alert.alert("Upload Success", json.message);
                setPredictionResult(json.result); // 예측 결과 저장
            } else {
                Alert.alert("Upload Failed", json.error || "Unknown error occurred");
            }
        } catch (error) {
            console.error("Error:", error);
            Alert.alert("Error", "Failed to upload image.");
        }
    };

    return (
      <View style={styles.container}>
          <Button title="Choose an Image" onPress={pickImage} />
          {selectedImage && (
              <>
                  <Image source={{ uri: selectedImage }} style={styles.image} />
                  <Button title="Upload Image" onPress={uploadImage} />
                  {predictionResult ? (
                      <Text style={styles.resultText}>Prediction: {predictionResult}</Text>
                  ) : null}
              </>
          )}
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
  },
  image: {
      width: 200,
      height: 200,
      marginVertical: 10,
  },
  resultText: {
      marginTop: 20,
      fontSize: 18,
      fontWeight: 'bold',
  },
});
