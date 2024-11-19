import React, { useState, useEffect } from 'react';
import { Button, Image, View, StyleSheet, Alert, Text, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Camera from 'expo-camera';

export default function App() {
    const [selectedImages, setSelectedImages] = useState([]);
    const [predictionResults, setPredictionResults] = useState([]);

    // 권한 요청 함수
    const requestPermission = async () => {
        const { status: mediaLibraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
        if (mediaLibraryStatus !== 'granted' || cameraStatus !== 'granted') {
            Alert.alert(
                "Permission Required",
                "We need your permission to access your photo library and camera."
            );
        }
    };

    // 권한 요청을 앱 시작 시 수행
    useEffect(() => {
        requestPermission();
    }, []);

    // 이미지 선택 함수
    const pickImages = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
                allowsMultipleSelection: true,
            });

            if (!result.canceled) {
                setSelectedImages(result.assets.map(asset => asset.uri)); // 선택한 이미지 URI 배열로 저장
                setPredictionResults([]); // 새로운 이미지를 선택할 때 결과 초기화
            }
        } catch (error) {
            console.error("Error picking images:", error);
            Alert.alert("Error", "Something went wrong while accessing the gallery.");
        }
    };

    // 카메라로 사진 촬영 함수
    const takePhoto = async () => {
        try {
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
            });

            if (!result.canceled) {
                setSelectedImages(prevImages => [...prevImages, result.assets[0].uri]); // 촬영한 이미지 추가
                setPredictionResults([]); // 새로운 이미지를 선택할 때 결과 초기화
            }
        } catch (error) {
            console.error("Error taking photo:", error);
            Alert.alert("Error", "Something went wrong while accessing the camera.");
        }
    };

    // 이미지 업로드 함수
    const uploadImages = async () => {
        if (!selectedImages || selectedImages.length === 0) {
            Alert.alert("No Images Selected", "Please select images before uploading.");
            return;
        }

        let formData = new FormData();
        selectedImages.forEach((image, index) => {
            formData.append("images", {
                uri: image,
                type: "image/jpeg",
                name: `photo_${index}.jpg`,
            });
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
                setPredictionResults(json.results); // 예측 결과 저장 (여러 이미지에 대한 결과)
            } else {
                Alert.alert("Upload Failed", json.error || "Unknown error occurred");
            }
        } catch (error) {
            console.error("Error:", error);
            Alert.alert("Error", "Failed to upload images.");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                {selectedImages && selectedImages.length > 0 ? (
                    <ScrollView horizontal={true} contentContainerStyle={styles.scrollView}>
                        {selectedImages.map((image, index) => (
                            <View key={index} style={styles.imageWrapper}>
                                <Image source={{ uri: image }} style={styles.image} />
                                {predictionResults[index] && (
                                    <Text style={styles.resultText}>Prediction: {predictionResults[index]}</Text>
                                )}
                            </View>
                        ))}
                    </ScrollView>
                ) : (
                    <Text style={styles.placeholderText}>No Images Selected</Text>
                )}
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Choose Images" onPress={pickImages} />
                <Button title="Take a Photo" onPress={takePhoto} />
                <Button title="Upload Images" onPress={uploadImages} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
    },
    imageContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    scrollView: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    imageWrapper: {
        alignItems: 'center',
        marginHorizontal: 10,
    },
    image: {
        width: 200,
        height: 200,
    },
    resultText: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    placeholderText: {
        fontSize: 18,
        color: 'gray',
    },
    buttonContainer: {
        flex: 1,
        width: '90%',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
});