import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { LineChart, BarChart } from "react-native-chart-kit";
import Constants from "expo-constants";

export default function Tasks({ route, navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          paddingTop: Constants.statusBarHeight * 1.5,
          backgroundColor: "#922305",
          height: 120,
          top: 0,
          flexDirection: "row",
          justifyContent: "flex-start",
          paddingHorizontal: 10
        }}
      >
        <View style={{ justifyContent: "center", flexDirection: "row" }}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <SimpleLineIcons
              name="arrow-right"
              size={30}
              color="#FFF"
              style={{ paddingHorizontal: 10 }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{ justifyContent: "center", flexDirection: "row", width: 300 }}
        >
          <Text style={{ fontFamily: "ExtraBold", color: "#FFF" }}>
            اجمالي المبيعات
          </Text>
        </View>
      </View>

      <View>
        <Text
          style={{
            textAlign: "center",
            fontFamily: "Bold",
            marginVertical: 10
          }}
        >
          تقارير دفعيات شهرية
        </Text>
        <LineChart
          data={{
            labels: ["January", "February", "March", "April", "May", "June"],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100
                ]
              }
            ]
          }}
          width={Dimensions.get("window").width} // from react-native
          height={220}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#FFF",
            backgroundGradientFrom: "grey",
            backgroundGradientTo: "#FFF",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />

        <BarChart
          data={{
            labels: ["January", "February", "March", "April", "May", "June"],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100
                ]
              }
            ]
          }}
          width={Dimensions.get("window").width} // from react-native
          height={220}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "grey",
            backgroundGradientFrom: "yellow",
            backgroundGradientTo: "#FFF",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7"
  },
  listItem: {
    margin: 10,
    padding: 10,
    backgroundColor: "#FFF",
    width: "95%",
    flex: 1,
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 5,
    justifyContent: "center"
  }
});
