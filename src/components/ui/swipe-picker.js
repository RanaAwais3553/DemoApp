import React, { useRef } from "react";

import { FlatList, StyleSheet, View } from "react-native";

import Text from "./text";

import LinearGradient from 'react-native-linear-gradient';

const ListItem = React.memo(({ label, style }) => (
  <View style={style}>
    <Text
      label={label}
      size="xl_3"
      font="bold"
      style={{ textAlign: "center", color: "#6842FF" }}
    />
  </View>
));

const SwipePicker = ({
  items,
  onChange,
  initialSelectedIndex = null,
  width,
  height,
}) => {
  let itemHeight = 40;
  let listHeight = 200;

  if (height) {
    listHeight = height;
    itemHeight = listHeight / 5;
  }

  const styles = StyleSheet.create({
    list: {
      height: listHeight,
      width: width,
    },
    listItem: {
      height: itemHeight,
      alignItems: "center",
      justifyContent: "center",
      fontSize: itemHeight / 2,
    },
    pickerGradient: {
      position: "absolute",
      height: 2 * itemHeight,
      width: "100%",
    },
    topGradient: {
      top: 0,
    },
    bottomGradient: {
      bottom: 0,
    },
  });

  const flatList = useRef(null);

  let extendedItems = [
    {
      value: -11,
      label: "",
    },
    {
      value: -12,
      label: "",
    },
    ...items,
    {
      value: -21,
      label: "",
    },
    {
      value: -22,
      label: "",
    },
  ];

  return (
    <View style={styles.list}>
      <FlatList
        showsVerticalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          let index = Math.round(
            event.nativeEvent.contentOffset.y / itemHeight
          );
          onChange({ index, item: items[index] });
        }}
        initialScrollIndex={initialSelectedIndex}
        ref={flatList}
        data={extendedItems.map((item) => ({
          key: item.value.toString(),
          ...item,
        }))}
        renderItem={(item) => (
          <ListItem label={item.item.label} style={styles.listItem} />
        )}
        getItemLayout={(_, index) => ({
          length: itemHeight,
          offset: index * itemHeight,
          index,
        })}
        snapToInterval={itemHeight}
        ListEmptyComponent={() => (
          <Text label={"No Item"} font="bold" style={{ textAlign: "center" }} />
        )}
      />
      <LinearGradient
        colors={[
          "rgba( 255, 255, 255, 1 )",
          "rgba( 255, 255, 255, 0.9 )",
          "rgba( 255, 255, 255, 0.7 )",
          "rgba( 255, 255, 255, 0.5 )",
        ]}
        style={[styles.pickerGradient, styles.topGradient]}
        pointerEvents="none"
      />
      <LinearGradient
        colors={[
          "rgba( 255, 255, 255, 0.5 )",
          "rgba( 255, 255, 255, 0.7 )",
          "rgba( 255, 255, 255, 0.9 )",
          "rgba( 255, 255, 255, 1 )",
        ]}
        style={[styles.pickerGradient, styles.bottomGradient]}
        pointerEvents="none"
      />
    </View>
  );
};

export default SwipePicker;
