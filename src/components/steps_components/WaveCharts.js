import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart, Grid } from 'react-native-svg-charts';
import * as shape from 'd3-shape';

const WaveChart = () => {
    const data = [50, 10, 40, 65, 35, 91, 35]; // Sample data points for the wave

    return (
        <View style={styles.container}>
            <LineChart
                style={styles.chart}
                data={data}
                curve={shape.curveNatural}
                svg={{ stroke: 'rgba(104, 66, 255, 0.9)' }}
                contentInset={{ top: 10, bottom: 10 }}
            >
                <Grid />
            </LineChart>
            <View style={styles.dayLabels}>
                {['MON', 'TUE', 'WED', 'THR', 'FRI', 'SAT', 'SUN'].map((day, index) => (
                    <Text
                        key={index}
                        style={[styles.dayLabel, index === 6 && styles.currentDay]}
                    >
                        {day}
                    </Text>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 157,
        paddingHorizontal: 10,
    },
    chart: {
        height: 120,
    },
    dayLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
    },
    dayLabel: {
        fontSize: 12,
        color: '#888',
    },
    currentDay: {
        fontWeight: 'bold',
        color: '#000',
    },
});

export default WaveChart;
