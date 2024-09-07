//
//  StepCounter.m
//  AwesomeProject
//
//  Created by Rana Awais Home on 24/08/2024.
//

#import <React/RCTEventEmitter.h>
#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(StepCounter, RCTEventEmitter)
RCT_EXTERN_METHOD(startStepCounting)
RCT_EXTERN_METHOD(stopStepCounting)

@end
