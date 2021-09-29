import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  AsyncStorage,
  RefreshControl,
  Alert,
  ScrollView
} from "react-native";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Fontisto,
} from "@expo/vector-icons";
import Constants from "expo-constants";
import LottieView from 'lottie-react-native';

export default function Tasks({ route, navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  const [user_name, setUserName] = React.useState("");
  const [user_token, setUserToken] = React.useState("");
  
  const [selected, SetSelected] = React.useState(1);
  const [status, SetStatus] = React.useState('active');
  const [cat_title, SetTitle] = React.useState('نشط الأن :');

  const [data, setData] = useState([]);


  useEffect(() => {
    _retrieveData();
  }, []);


  const _retrieveData = async () => {
    try {
      const user_token = await AsyncStorage.getItem("user_token");
      const user_name = await AsyncStorage.getItem("user_name");
      setUserToken(user_token);
      setUserName(user_name);
      let formData = new FormData();
      formData.append("tailor_token", user_token);
      formData.append("status", status);
      setLoading(true);
      fetch("https://stakfort.com/tailor/api/tasks/tasks.php", {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-type": "multipart/form-data;",
          "Accept-Encoding": "gzip, deflate, br",
          Connection: "keep-alive"
        },
        body: formData
      })
        .then(response => response.json())
        .then(json => setData(json))
        .finally(() => setLoading(false))
        .catch(error => console.error(error));
    } catch (error) {
      console.log(error);
    }
  };

    
  const get_categorey = (selected,status,title) => {
    SetSelected(selected);
    SetStatus(status);
    SetTitle(title);
    try {
      let formData = new FormData();
      formData.append("tailor_token", user_token);
      formData.append("status", status);
      setLoading(true);
      fetch("https://stakfort.com/tailor/api/tasks/tasks.php", {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-type": "multipart/form-data;",
          "Accept-Encoding": "gzip, deflate, br",
          Connection: "keep-alive"
        },
        body: formData
      })
        .then(response => response.json())
        .then(json => setData(json))
        .finally(() => setLoading(false))
        .catch(error => console.error(error));
    } catch (error) {
      console.log(error);
    }
    } 
  
  const createThreeButtonAlert = (task_id) =>
    Alert.alert(
      "تأكيد حذف المهمة",
      "هل أنت متأكد من حذف هذة المهمة ؟!",
      [
        {
          text: "الغاء",
          onPress: () => console.log("Ask me later pressed"),
        },
        {
          text: "تأكيد الحذف",
          onPress: () => deleteTask(task_id),
          style: "cancel",
        },
      ],
      { cancelable: false }
    );


    const deleteTask = (task_id) => {
      try {
    
        let formData = new FormData();
        formData.append("task_id", task_id);
        fetch("https://stakfort.com/tailor/api/tasks/delete_task.php", {
          method: "POST",
          headers: {
            Accept: "*/*",
            "Content-type": "multipart/form-data;",
            "Accept-Encoding": "gzip, deflate, br",
            Connection: "keep-alive"
          },
          body: formData
        })
        .then((response) =>  response.json())
				.then((responseJson) => {
				  if (responseJson.success == true) {
					alert(responseJson.data.message);
					navigation.navigate("Tasks");
				  }
				  else {
					alert(responseJson.data.message);
				  }
				})
      } catch (error) {
        console.log(error);
      }
    };
    

    const _handleEmptyFlatList = () => {
      return (
          <View style={{ flex: 1,justifyContent: "center",alignItems: "center" }}>
          <Image source={require('./../assets/snap.png')}/>
                  <Text style={{ fontFamily: 'Bold', color:"grey"}}>
                   لم يتم العثور علي مهام
                  </Text>
          </View>
      )
  }

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          paddingTop: Constants.statusBarHeight * 1.5,
          backgroundColor: "#922305",
          height: 120,
          top: 0,
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 10
        }}
      >
        <View style={{ justifyContent: "center", flexDirection: "row" }}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Fontisto name="right-align" size={30} color="#FFF" />
          </TouchableOpacity>
          <Text
            style={{
              textAlign: "center",
              fontFamily: "Bold",
              color: "#FFF",
              marginLeft: 20
            }}
          >
          المهام
          </Text>
        </View>

        <View style={{ justifyContent: "center", flexDirection: "row" }}>
          <Text style={{ fontFamily: "Bold", color: "#F9C227" }}>
            مرحبا, {user_name}
          </Text>
        </View>
      </View>

      <View>
      <View
                   
           style={{
            flexDirection: "row",
            justifyContent:"space-between",
            width: "100%",
            paddingHorizontal: 20,
            paddingBottom: 10,
            paddingTop: 5
          }}>
              <TouchableOpacity
                activeOpacity={0.8}
               onPress={() => get_categorey(1,'active','نشط الأن')}
              >
                <Text
                  style={
                    selected == 1
                      ? styles.SelectedcategoryText
                      : styles.categoryText
                  }
                >
           نشط الأن
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => get_categorey(2,'complete','مهام مكتملة')}
                >
                <Text
                  style={
                    selected == 2
                      ? styles.SelectedcategoryText
                      : styles.categoryText
                  }
                >
              مهام مكتملة
                </Text>
              </TouchableOpacity>



              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => get_categorey(3,'today','مهام اليوم')}
                >
                <Text
                  style={
                    selected == 3
                      ? styles.SelectedcategoryText
                      : styles.categoryText
                  }
                >
              اليوم
                </Text>
              </TouchableOpacity>



              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => get_categorey(4,'overdue','تجاوز الموعد')}
                >
                <Text
                  style={
                    selected == 4
                      ? styles.SelectedcategoryText
                      : styles.categoryText
                  }
                >
              تجاوز الموعد
                </Text>
              </TouchableOpacity>
         </View>
      </View>

   

      {isLoading == true ?
      (
        <View style={{flex: 1,
        justifyContent:"center",
        alignItems:"center",
         }}>
        		<View style={{ alignSelf: 'center' }}>
              <LottieView
             autoPlay
                style={{
                  width: 100,
                  height: 100,
                }}
                source={require('./../assets/load.json')}
                />
              </View>
        </View>
      ) : (
        <View style={{ flex: 1,paddingHorizontal: 20}}>
          <Text 
          style={{ 
          fontFamily: "Bold",
          textAlign:"center",
          color:"#922305",
          fontSize:20, 
          marginVertical:10
          
          }}>
            {cat_title}
            </Text>
        <FlatList
          contentContainerStyle={{
            width: "100%",
            paddingBottom: 10,
            paddingTop: 5
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={_retrieveData} />
          }
          data={data.data}
          ListEmptyComponent={_handleEmptyFlatList}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  height: 122,
                  borderWidth: 1,
                  borderColor: "black",
                  borderRadius: 10,
                  alignItems: "center",
                  marginBottom: 20
                }}
              >
                <View style={{ width: "30%" }}>
                  <Image
                    style={{
                      width: "100%",
                      maxHeight: 90,
                      borderRadius: 15,
                      resizeMode: "contain",
                      marginBottom: 10
                    }}
                    source={require("./../assets/task.png")}
                  />
                </View>
                <View style={{ width: "50%", paddingjustify: 10 }}>
                  <Text
                    style={{
                      fontFamily: "Bold",
                      textAlign: "justify",
                      fontSize: 20,
                      color: "grey"
                    }}
                  >
                    {item.task_name}
                  </Text>

                  <Text style={{ fontFamily: "Bold", textAlign: "justify" }}>
                    موعد التسليم :
                    {item.task_end}
                  </Text>
                </View>

                <TouchableOpacity
                onPress={() => createThreeButtonAlert(item.id)}
                  style={{
                    width: "20%",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "center"
                  }}
                >
                  <MaterialCommunityIcons
                    name="delete-forever"
                    size={50}
                    color="red"
                  />
                </TouchableOpacity>
              </View>
            );
          }}
        />
        </View>
      )}

      <TouchableOpacity
        onPress={() => navigation.navigate("TaskManagment")}
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: "#922305",
          position: "absolute",
          bottom: 30,
          right: 20,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <MaterialIcons name="add-alarm" size={33} color="#FFF" />
      </TouchableOpacity>
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
  },
  categoryContainer: {
    width: "100%",
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 15
  },

  categoryText: {
    color: "grey",
    borderRadius: 2,
    borderColor: "#F9C227",
    paddingBottom: 5,
    marginHorizontal: 6,
    fontFamily: "Bold"
  },

  SelectedcategoryText: {
    color: "#922305",
    borderBottomWidth: 3,
    borderRadius: 2,
    borderColor: "#F9C227",
    paddingBottom: 5,
    marginHorizontal: 6,
    fontFamily: "Bold"
  }
});
