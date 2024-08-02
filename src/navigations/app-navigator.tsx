import React, {useState, useEffect, useRef} from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import {
  View,
  Button,
  I18nManager,
  Linking,
  Image,
  StyleSheet,
  Platform,
} from 'react-native';
import Home from '../screens/home/Home';
import MyTabs from './tab-navigator';
import SearchScreen from '../screens/searchform/SearchScreen';
import BottomSheetCalendar from '../components/molecules/BottomSheetCalender';
import BottomSheetPassengerInfoForm from '../components/molecules/BottomSheetPassengerInfoForm';
const HomeStack = createStackNavigator();

const AppNavigator = () => {
  const BackIcon = () => {
    return (
      <View style={Platform.OS === 'ios' && styles.backIconContainerIOS}>
        {/* <Image
                    style={styles.backIcon}
                    source={R.images.arrowLeftIcon}
                /> */}
      </View>
    );
  };

  const bottomSheetConfig = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };
  const TransitionScreenOptions = {
    ...TransitionPresets.SlideFromRightIOS, // This is where the transition happens
  };
  return (
    <HomeStack.Navigator
      detachInactiveScreens={false}
      screenOptions={{
        // headerBackImage: () => <BackIcon />,
        headerBackTitleVisible: false,
        headerTitleStyle: {
          //   fontFamily: FONT_FAMILY,
          fontWeight: 'bold',
        },
        ...TransitionScreenOptions,
      }}>
      <HomeStack.Screen
        name={'Home'}
        component={MyTabs}
        options={{
          headerShown: true,
          headerTitle: 'Direct',
          headerTitleStyle: {color: '#ffffff'},
          headerStyle: {backgroundColor: '#fc8b32'},
        }}
      />
      <HomeStack.Screen
        name={'SearchScreen'}
        component={SearchScreen}
        options={{
          headerShown: true,
          headerTitle: '',
          headerTitleStyle: {color: '#ffffff'},
          headerStyle: {
            backgroundColor: '#fc8b32',
            elevation: 0, // Remove shadow on Android
            shadowOpacity: 0, // Remove shadow on iOS
            borderBottomWidth: 0, // Remove bottom border on iOS and Android
          },
          headerLeft: () => null,
        }}
      />
      <HomeStack.Screen
        name={'BottomSheetCalendar'}
        component={BottomSheetCalendar}
        options={{
          transitionSpec: {
            open: bottomSheetConfig,
            close: bottomSheetConfig,
          },
          cardStyleInterpolator: CardStyleInterpolators.forBottomSheetAndroid,
          cardOverlayEnabled: true,
          headerShown: false,
          presentation: 'transparentModal',
          headerLeft: () => null,
        }}
      />
      <HomeStack.Screen
        name={'BottomSheetPassengerInfoForm'}
        component={BottomSheetPassengerInfoForm}
        options={{
          transitionSpec: {
            open: bottomSheetConfig,
            close: bottomSheetConfig,
          },
          cardStyleInterpolator: CardStyleInterpolators.forBottomSheetAndroid,
          cardOverlayEnabled: true,
          headerShown: false,
          presentation: 'transparentModal',
          headerLeft: () => null,
        }}
      />
      {/* BottomSheetPassengerInfoForm */}
    </HomeStack.Navigator>
  );
};

const styles = StyleSheet.create({
  backIconContainerIOS: {
    width: 56,
    height: 46,
    justifyContent: 'center',
  },
  loadingView: {
    flex: 1,
    backgroundColor: 'white',
  },
  backIcon: {
    alignSelf: 'center',
    // tintColor: R.colors.primary,
    transform: I18nManager.isRTL ? [{rotate: '180deg'}] : [{rotate: '0deg'}],
  },
});

export default AppNavigator;
