import React, {ReactElement, RefObject, useCallback, useState} from 'react';
import BottomSheet from 'reanimated-bottom-sheet';
import {
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Modal,
  Alert,
  Dimensions,
} from 'react-native';

interface BSheetProps {
  withDismissOverlay?: boolean;
  innerRef?: RefObject<BottomSheet>;
  children: ReactElement | ReactElement[];
  onClose?: () => void;
  onOverlayPress?: () => void;
  isOpen: boolean;
  paymentBottom?: boolean;
  backGroundDarkOverLay?: boolean;
}

export default function BSheet(props: BSheetProps) {
  const {
    withDismissOverlay,
    innerRef,
    children,
    onClose,
    onOverlayPress,
    isOpen = false,
    backGroundDarkOverLay,
  } = props;
  const [height, setHeight] = useState();
  const onLayout = useCallback(e => setHeight(e.nativeEvent.layout.height), []);
  const renderContent = useCallback(
    () => <View onLayout={onLayout}>{children}</View>, //
    [children, onLayout],
  );
  console.log('height of bottom sheet is:#@#@#@', height);
  return (
    <>
      {!!withDismissOverlay && isOpen && (
        <TouchableWithoutFeedback onPress={onOverlayPress}>
          <View
            style={{
              ...styles.overlay,
              backgroundColor:
                props?.paymentBottom &&
                height &&
                parseInt(height) > Dimensions.get('window').height / 2 &&
                backGroundDarkOverLay
                  ? '#333333'
                  : '#00000',
            }}
          />
        </TouchableWithoutFeedback>
      )}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          // height: '100%',
        }}>
        {renderContent()}
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  overlay: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
});
