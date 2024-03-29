import React from 'react';
import {StyleSheet, Text, View, Image, Platform} from 'react-native';
import moment from 'moment';

const Result = ({route}) => {
  const {selfieData, selfieMeta, landmarkData, landmarkMeta} = route.params;
  console.log('metaData :', selfieMeta);

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={{uri: `file://${selfieData.path}`}}
          style={{height: 200, width: 200}}
        />
        <View
          style={{
            position: 'absolute',
            top: 150,
            right: 20,
            transform: [{scale: 0.6}],
          }}>
          <Text
            style={{
              color: '#ff8c00',
            }}>{`latitude : ${selfieMeta.latitude}`}</Text>
          <Text
            style={{
              color: '#ff8c00',
            }}>{`longitude : ${selfieMeta.longitude}`}</Text>
          <Text style={{color: '#ff8c00'}}>{`timestamp : ${moment(
            selfieMeta.timestamp,
          ).format('DD MMM YYYY hh:mm a')}`}</Text>
        </View>
      </View>

      <View>
        <Image
          source={{uri: `file://${landmarkData.path}`}}
          style={{height: 200, width: 200}}
        />

        <View
          style={{
            position: 'absolute',
            top: 150,
            right: 20,
            transform: [{scale: 0.6}],
          }}>
          <Text
            style={{
              color: '#ff8c00',
            }}>{`latitude : ${landmarkMeta.latitude}`}</Text>
          <Text
            style={{
              color: '#ff8c00',
            }}>{`longitude : ${landmarkMeta.longitude}`}</Text>
          <Text style={{color: '#ff8c00'}}>{`timestamp : ${moment(
            landmarkMeta.timestamp,
          ).format('DD MMM YYYY hh:mm a')}`}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
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

export default Result;
