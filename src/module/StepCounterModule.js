import { NativeModules, NativeEventEmitter } from 'react-native';

const { StepCounter } = NativeModules;
const stepCounterEmitter = new NativeEventEmitter(StepCounter);

export const startStepCounting = () => {
    console.log("StepCounter in module",StepCounter)
  StepCounter.startStepCounting();
};

export const stopStepCounting = () => {
  StepCounter.stopStepCounting();
};

export const subscribeToStepCount = (callback) => {
  return stepCounterEmitter.addListener('StepCount', callback);
};

export const unsubscribeFromStepCount = (subscription) => {
  subscription;
};
