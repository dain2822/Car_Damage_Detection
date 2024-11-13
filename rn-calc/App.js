
import React, { Component } from "react";
import { Button, SafeAreaView, StyleSheet, Alert, Text } from "react-native";

// Importing the installed libraries
import * as FS from "expo-file-system";
import * as ImagePicker from "expo-image-picker";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cameraRollPer: null,
      disableButton: false,
    };
  }

  async componentDidMount() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    this.setState({
      cameraRollPer: status === "granted",
      disableButton: false,
    });
  }

  uriToBase64 = async (uri) => {
    let base64 = await FS.readAsStringAsync(uri, {
      encoding: FS.EncodingType.Base64,
    });
    return base64;
  };

  pickFromGallery = async () => {
    this.setState({ disableButton: true });

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // 이미지로만 제한
      base64: true,
    });

    if (result.cancelled) {
      this.setState({ disableButton: false });
      return;
    }

    if (result.type === "image") {
      await this.toServer({
        type: result.type,
        base64: result.base64,
        uri: result.uri,
      });
    }

    this.setState({ disableButton: false });
  };

  openCamera = async () => {
    this.setState({ disableButton: true });

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // 이미지로만 제한
      base64: true,
    });

    if (result.cancelled) {
      this.setState({ disableButton: false });
      return;
    }

    if (result.type === "image") {
      await this.toServer({
        type: result.type,
        base64: result.base64,
        uri: result.uri,
      });
    }

    this.setState({ disableButton: false });
  };

  toServer = async (mediaFile) => {
    let type = mediaFile.type;
    let schema = "http://";
    let host = "192.168.1.6";
    let route = "";
    let port = "5000";
    let url = "";
    let content_type = "";
    type === "image"
      ? ((route = "/image"), (content_type = "image/jpeg"))
      : ((route = "/video"), (content_type = "video/mp4"));
    url = schema + host + ":" + port + route;

    let response = await FS.uploadAsync(url, mediaFile.uri, {
      headers: {
        "content-type": content_type,
      },
      httpMethod: "POST",
      uploadType: FS.FileSystemUploadType.BINARY_CONTENT,
    });

    console.log(response.headers);
    console.log(response.body);
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.state.cameraRollPer ? (
          <>
            <Button
              title="Pick From Gallery"
              disabled={this.state.disableButton}
              onPress={async () => {
                await this.pickFromGallery();
              }}
            />
            <Button
              title="Open Camera"
              disabled={this.state.disableButton}
              onPress={async () => {
                await this.openCamera();
              }}
            />
          </>
        ) : (
          <Text>Camera Roll Permission Required!</Text>
        )}
      </SafeAreaView>
    );
  }
}

// 클래스 외부에서 styles 객체 정의
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});