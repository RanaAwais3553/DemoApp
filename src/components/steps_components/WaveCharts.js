import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart, Grid } from 'react-native-svg-charts';
import * as shape from 'd3-shape';

const WaveChart = ({currentDay,stepsDays,isShowGraph}) => {
    const data = stepsDays && [stepsDays[0]?.steps, stepsDays[1]?.steps, stepsDays[2]?.steps, stepsDays[3]?.steps, stepsDays[4]?.steps, stepsDays[5]?.steps, stepsDays[6]?.steps]; // Sample data points for the wave

    return (
        <View style={styles.container}>
           {isShowGraph && !!data ? <LineChart
                style={styles.chart}
                data={data}
                curve={shape.curveNatural}
                svg={{ stroke: 'rgba(104, 66, 255, 0.9)' }}
                contentInset={{ top: 10, bottom: 10 }}
            >
                <Grid />
            </LineChart>
            :
            <>
            <View style={{height:1,width:'100%',marginBottom:22, backgroundColor:'#f2f2f2'}}/>
            <View style={{height:1,width:'100%',marginBottom:22,backgroundColor:'#f2f2f2'}}/>
            <View style={{height:1,width:'100%',marginBottom:22,backgroundColor:'#f2f2f2'}}/>
            <View style={{height:1,width:'100%',marginBottom:22,backgroundColor:'#f2f2f2'}}/>
            <View style={{height:1,width:'100%',marginBottom:22,backgroundColor:'#f2f2f2'}}/>
            </>
        }
            <View style={styles.dayLabels}>
                {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day, index) => (
                    <Text
                        key={index}
                        style={[styles.dayLabel, currentDay?.toLowerCase().startsWith(day?.toLowerCase()) && styles.currentDay]}
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
