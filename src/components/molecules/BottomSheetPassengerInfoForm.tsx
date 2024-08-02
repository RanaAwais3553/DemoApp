import React, {useRef, useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import BSheet from '../atoms/BottomSheetV2';
import PassengerInfoCard from '../atoms/PassengerInfoCard';
const screenHeight = Dimensions.get('window').height;
let timeout: number = 500;

const BottomSheetPassengerInfoForm = ({navigation, route}) => {
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const onOverlayPress = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <BSheet
        withDismissOverlay={true}
        isOpen={true}
        onOverlayPress={onOverlayPress}
        innerRef={bottomSheetRef}>
        <PassengerInfoCard navigation={navigation} />
      </BSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    height: screenHeight * 0.5,
  },
});

export default BottomSheetPassengerInfoForm;
