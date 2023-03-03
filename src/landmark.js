import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  SafeAreaView,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import Geolocation from '@react-native-community/geolocation';

const Landmark = ({navigation, route}) => {
  const [landmark, setLandmark] = useState(null);
  const [stage, setStage] = useState(0);
  const [loader, setLoader] = useState(false);

  const {selfieData, selfieMeta} = route.params;

  const takePicture = async type => {
    if (cameraRef.current) {
      const options = {quality: 0.5, base64: false};
      const data = await cameraRef.current.takePictureAsync(options);
      if (type === 'selfie') {
        setSelfie(data);
        console.log('data ', data);
      } else {
        setLandmark(data);
      }
      setLoader(false);
    }
  };

  const retakePicture = type => {
    if (type === 'selfie') {
      setSelfie(null);
    } else {
      setLandmark(null);
    }
  };

  const addMetadata = async data => {
    Geolocation.getCurrentPosition(
      async position => {
        const metadata = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          timestamp: new Date().getTime(),
        };
        setLoader(false);
        navigation.navigate('result', {
          selfieData: selfieData,
          selfieMeta: selfieMeta,
          landmarkData: landmark,
          landmarkMeta: metadata,
        });
        const processedData = await processImage(data, metadata);
        // Save processedData to permanent storage here
      },
      error => {
        console.log(error);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  const processImage = async (data, metadata) => {
    // Add metadata to the image here using a library like react-native-exif or react-native-image-marker
    return processedData;
  };

  const cameraRef = React.useRef(null);

  return (
    <View style={styles.container}>
      {/* <SafeAreaView style={{flex: 1}}> */}
      <View style={styles.cameraContainer}>
        {landmark && stage === 1 ? (
          <View style={styles.imageContainer}>
            <Image
              source={{uri: landmark.uri}}
              style={{height: 200, width: 200}}
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => {
                retakePicture('landmark');
                setStage(0);
              }}>
              <Text style={styles.retakeButtonText}>Retake</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.submitButton, {backgroundColor: 'gray'}]}
              onPress={() => {
                addMetadata('landmark');
                setLoader(true);
              }}>
              {!loader ? (
                <Text style={styles.captureButtonText}>Submit</Text>
              ) : (
                <ActivityIndicator size={'large'} />
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <RNCamera
              ref={cameraRef}
              style={styles.camera}
              type={'back'}
              autoFocus={'on'}
              flashMode={'off'}
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => {
                setLoader(true);
                takePicture('back');
                setStage(1);
              }}>
              {/* <Text style={styles.retakeButtonText}>landmark</Text> */}
              {!loader ? (
                <Text style={styles.retakeButtonText}>landmark</Text>
              ) : (
                <ActivityIndicator size={'large'} />
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>
      {/* <View style={styles.cameraContainer}>
        <RNCamera
          ref={cameraRef}
          style={styles.camera}
          type={'back'}
          autoFocus={'on'}
          flashMode={'off'}
        />
        {landmark && (
          <View style={styles.imageContainer}>
            <Image source={{uri: landmark.uri}} style={styles.image} />
            <TouchableOpacity
              style={styles.retakeButton}
              onPress={() => retakePicture('landmark')}>
              <Text style={styles.retakeButtonText}>Retake</Text>
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity
          style={styles.captureButton}
          onPress={() => takePicture('landmark')}>
          <Text style={styles.captureButtonText}>Landmark</Text>
        </TouchableOpacity>
      </View> */}
      {/* <TouchableOpacity
        style={styles.submitButton}
        onPress={() => {
          addMetadata(selfie);
          addMetadata(landmark);
        }}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity> */}
      {/* </SafeAreaView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  camera: {
    flex: 1,
  },
  captureButton: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    marginBottom: Platform.select({ios: 50, android: 30}),
    backgroundColor: '#fff',
    borderRadius: 50,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonText: {
    fontSize: 14,
    color: '#000',
  },
  retakeButton: {
    position: 'absolute',
    top: 10,
    right: 100,
    bottom: 100,
    backgroundColor: '#fff',
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  retakeButtonText: {
    fontSize: 12,
    color: '#000',
  },
  imageContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: 'gray',
    borderRadius: 50,
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 18,
    color: '#000',
  },
});

export default Landmark;
