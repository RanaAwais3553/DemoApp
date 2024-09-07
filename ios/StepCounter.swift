//
//  StepCounter.swift
//  AwesomeProject
//
//  Created by Rana Awais Home on 24/08/2024.
//

import Foundation
import CoreMotion
import React

@objc(StepCounter)
class StepCounter: RCTEventEmitter {
    
    private let pedometer = CMPedometer()

    override static func requiresMainQueueSetup() -> Bool {
        return true
    }

  override  func supportedEvents() -> [String]! {
        return ["StepCount"]
    }

    @objc
    func startStepCounting() {
        requestMotionAuthorization()
    }

    @objc
    func stopStepCounting() {
        pedometer.stopUpdates()
    }

    private func requestMotionAuthorization() {
        if CMMotionActivityManager.authorizationStatus() == .authorized {
            // Permission already granted, start step counting
            startPedometerUpdates()
        } else if CMMotionActivityManager.authorizationStatus() == .notDetermined {
            // Permission has not been requested yet, request it now
            let motionManager = CMMotionActivityManager()
            motionManager.queryActivityStarting(from: Date(), to: Date(), to: .main) { _, _ in
                if CMMotionActivityManager.authorizationStatus() == .authorized {
                    self.startPedometerUpdates()
                } else {
                    print("Motion permission is not granted.")
                }
            }
        } else {
            // Permission denied or restricted
            print("Motion data is not authorized.")
        }
    }

    private func startPedometerUpdates() {
        if CMPedometer.isStepCountingAvailable() {
            pedometer.startUpdates(from: Date()) { [weak self] (data, error) in
                if let error = error {
                    print("Error: \(error.localizedDescription)")
                    return
                }
                
                if let stepData = data, let steps = stepData.numberOfSteps as? Int {
                    self?.sendStepsToReactNative(steps: steps)
                }
            }
        } else {
            print("Step counting is not available.")
        }
    }

    private func sendStepsToReactNative(steps: Int) {
//      self.sendEvent(withName: "StepCount", body: ["steps": steps])
        DispatchQueue.main.async {
          self.sendEvent(withName: "StepCount", body: ["steps": steps])
//            self.sendEvent(withName: "StepCount", body: ["steps": steps])
        }
    }
}

