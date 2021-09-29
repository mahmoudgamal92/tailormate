import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  AsyncStorage,
  Linking,
  ScrollView,
  Modal,
  TextInput
} from "react-native";
import {
  MaterialCommunityIcons,
  Feather,
  AntDesign,
  SimpleLineIcons,
  Foundation,
  Fontisto,
  MaterialIcons,
  Ionicons
} from "@expo/vector-icons";
import * as Print from "expo-print";
import LottieView from "lottie-react-native";
import { RadioButton, Switch } from "react-native-paper";
export default function OrderDetails({ route, navigation }) {
  const { order_id } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [checked, setChecked] = React.useState("first");
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [store, setStore] = useState([]);

  useEffect(() => {
    _retrieveData();
  }, []);

  const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var hours = new Date().getHours();
    var minutes = new Date().getMinutes();
    var seconds = new Date().getSeconds();
    return (
      date +
      "-" +
      month +
      "-" +
      year +
      "\xa0\xa0" +
      hours +
      " : " +
      minutes +
      " : " +
      seconds
    );
  };

  const _retrieveData = async () => {
    try {
      const user_token = await AsyncStorage.getItem("user_token");
      let formData = new FormData();
      formData.append("order_id", order_id);
      fetch("https://stakfort.com/tailor/api/get_order.php", {
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
        .then(json => {
          setData(json.data);
          setStore(json.data.store);
        })
        .finally(() => setLoading(false))
        .catch(error => console.error(error));
    } catch (error) {
      console.log(error);
    }
  };

  const edit_order = async () => {
    try {
      const user_token = await AsyncStorage.getItem("user_token");
      let formData = new FormData();
      formData.append("order_id", order_id);
      formData.append("tailor_token", user_token);
      formData.append("order_status", checked);
      fetch("https://stakfort.com/tailor/api/edit_order.php", {
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
        .then(responseJson => {
          if (responseJson.success == true) {
            alert(responseJson.data.message);
            //navigation.navigate("Tasks");
          } else {
            alert(responseJson.data.message);
          }
        })
        .finally(() => _retrieveData())
        .catch(error => console.error(error));
    } catch (error) {
      console.log(error);
    }
  };

  const htmlString =
    `
    <!DOCTYPE html>
    <html>
    
    <head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.bundle.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <style type="text/css">
        @import url('https://fonts.googleapis.com/css2?family=Almarai:wght@700&display=swap');
    
        * {
            font-family: 'Almarai', sans-serif !important;
        }
            body,
            table,
            td,
            a {
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
            }
    
            table,
            td {
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
            }
    
            img {
                -ms-interpolation-mode: bicubic;
            }
    
            img {
                border: 0;
                height: auto;
                line-height: 100%;
                outline: none;
                text-decoration: none;
            }
    
            table {
                border-collapse: collapse !important;
            }
    
            body {
                height: 100% !important;
                margin: 0 !important;
                padding: 0 !important;
                width: 100% !important;
            }
    
            a[x-apple-data-detectors] {
                color: inherit !important;
                text-decoration: none !important;
                font-size: inherit !important;
                font-family: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
            }
    
            @media screen and (max-width: 480px) {
                .mobile-hide {
                    display: none !important;
                }
    
                .mobile-center {
                    text-align: center !important;
                }
            }
        </style>
    
    <body style="margin: 0 !important; padding: 0 !important; background-color: #FFF;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
                <td align="center" style="background-color: #eeeeee;" bgcolor="#eeeeee">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                            <td align="center" valign="top" style="font-size:0; 
                                padding: 35px;" bgcolor="#92230">

                                <div style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;"
                                class="mobile-hide">
                                <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:330px;">
                                    <tr>
                                        <td align="right" valign="top"
                                            style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; line-height: 48px;">
                                            <table cellspacing="0" cellpadding="0" border="0" align="right">
                                                <tr>
                                                    <td
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400;">
                                                        <p
                                                            style="font-size: 20px; font-weight: 400; margin: 0; color: #ffffff;">
                                                            <a href="#" target="_blank"
                                                                style="color: #ffffff; text-decoration: none;">` +
    getCurrentDate() +
    `
                                                            </a></p>
                                                    </td>

                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </div>

                                <div
                                    style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;">
                                    <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%"
                                        style="max-width:330px;">
                                        <tr>
                                            <td align="left" valign="top"
                                                style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 36px; font-weight: 800; line-height: 48px;"
                                                class="mobile-center">
                                                <h1 style="font-size: 36px; font-weight: 800; margin: 0; color: #ffffff;">
                                                    Tailor Mate App
                                                </h1>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                   
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style="padding: 35px 35px 20px 35px; background-color: #ffffff;"
                                bgcolor="#ffffff">
                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
                                    style="max-width:600px;">
                                    <tr>
                                        <td align="center"
                                            style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 25px;">
                                            <img src="` +
    store.logo +
    `"
                                                width="150" height="150" style="display: block; border: 0px;" /><br>
                                            <h2
                                                style="font-size: 30px; font-weight: 800; line-height: 36px; color: #333333; margin: 0;">
                                                ` +
    store.store_name +
    `
                                                </h2>
                                            </td>
                                    </tr>
                                    <tr>
                                        <td align="left"
                                            style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 10px;">
                                            <p
                                                style="font-size: 16px; font-weight: 400; line-height: 24px; color: #777777;text-align:right">
                                                يعتبر برنامج (الخياط) البرنامج الأول من نوعه حيث يقوم بإدارة محلات الخياطة بشكل كامل . يقوم البرنامج بالتعامل مع العملاء، الحسابات ، ويقوم بتخزين كافة التفاصيل عن العملاء للرجوع إليها مستقبلاً بكل بساطة.


                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left" style="padding-top: 20px;">
                                            <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                                <tr>
                                                <td width="50%" align="left" bgcolor="#eeeeee"
                                                style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;text-align:center">
                                                ` +
    data.id +
    `
                                            </td>

                                                    <td width="50%" align="left" bgcolor="#eeeeee"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;text-align:center">
                                                        رقم الطلب # </td>
                                                  
                                                </tr>

                                                
                                                <tr>
                                                
                                                <td width="25%" align="left"
                                                    style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;text-align:center;direction:rtl">
                                                    ` +
    data.count +
    `  ثوب</td>

                                                    <td width="75%" align="left"
                                                    style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;text-align:center;direction:rtl">
                                                   العدد  :
                                                </td>

                                            </tr>

                                                <tr>
                                                    <td width="25%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;text-align:center;direction:rtl">
                                                        ` +
    data.price +
    ` ريال سعودي</td>

                                                        <td width="75%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;text-align:center;direction:rtl">
                                                       سعر الثوب  :
                                                    </td>
                                                </tr>


                                            <tr>
                                                
                                            <td width="25%" align="left"
                                                style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;text-align:center;direction:rtl">
                                                ` +
    "%15" +
    `  </td>

                                                <td width="75%" align="left"
                                                style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;text-align:center;direction:rtl">
                                                الضريبة :
                                            </td>

                                        </tr>


                                                <tr>
                                                
                                                    <td width="25%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;text-align:center;direction:rtl">
                                                        ` +
    data.total_price +
    ` ريال سعودي</td>

                                                        <td width="75%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;text-align:center;direction:rtl">
                                                       تكلفة التفصيل  :
                                                    </td>

                                                </tr>

                                                
                                                <tr>
                                                
                                                    <td width="50%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;text-align:center;direction:rtl">
                                                        ` +
                                                        data.price_after_tax +
                                                        ` ريال سعودي</td>

                                                        <td width="50%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;text-align:center;direction:rtl">
                                                       السعر بعد الضريبة :
                                                    </td>

                                                </tr>



                                                <tr>
                                                
                                                <td width="50%" align="left"
                                                    style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;text-align:center;direction:rtl">
                                                    ` +
                                                    data.paid +
                                                    ` ريال سعودي</td>

                                                    <td width="50%" align="left"
                                                    style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;text-align:center;direction:rtl">
                                                    المبلغ المدفوع  :
                                                </td>

                                            </tr>
  
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left" style="padding-top: 20px;">
                                            <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                                <tr>
                                                   
                                                    <td width="50%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;text-align:center;direction:rtl">
                                                        ` +
                                              (data.price_after_tax - data.paid) +
                                                ` ريال سعودي
                                                    </td>

                                                    <td width="50%" align="left"
                                                    style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;text-align:center;direction:rtl">
                                                    السعر النهائي :
                                                     </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>

                                    
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td align="center" height="100%" valign="top" width="100%"
                                style="padding: 0 35px 35px 35px; background-color: #ffffff;" bgcolor="#ffffff">
                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
                                    style="max-width:660px;">
                                    <tr>
                                        <td align="center" valign="top" style="font-size:0;">
                                 
                                            <div
                                                style="display:inline-block; max-width:50%; min-width:240px; vertical-align:top; width:100%;">
                                                <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%"
                                                    style="max-width:300px;">
                                                    <tr>
                                                        <td align="left" valign="top"
                                                            style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px;">
                                                            <p style="font-weight: 800;direction:rtl;text-align:right">
                                                          الموعد المحدد للتسليم :
                                                            </p>
                                                            <p style="direction:rtl;text-align:right">` +
    data.deliver_date +
    `</p>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>

                                            <div
                                            style="display:inline-block; max-width:50%; min-width:240px; vertical-align:top; width:100%;">
                                            <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%"
                                                style="max-width:300px;">
                                                <tr>
                                                    <td align="left" valign="top"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px;">
                                                        <p style="font-weight: 800;direction:rtl;text-align:right">
                                                            تاريخ بدء التنفيذ:
                                                        </p>
                                                        <p style="direction:rtl;text-align:right"> ` +
    data.date_added +
    `</p>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style=" padding: 35px; background-color: #922305;" bgcolor="#922305">
                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td align="center"
                                            style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 25px;text-align:right">
                                            <h2
                                                style="font-size: 24px; font-weight: 800; line-height: 30px; color: #ffffff; margin: 0;">
                                                رقم هاتف المتجر :
                                              ` +
    store.store_number +
    `
                                            </h2>
                                        </td>
                                    </tr>

                                    <tr>
                                    <td align="center"
                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 25px;text-align:right">
                                        <h2
                                            style="font-size: 24px; font-weight: 800; line-height: 30px; color: #ffffff; margin: 0;text-align:right;direction:rtl">
                                            البريد الألكتروني المتجر :
                                          ` +
    store.store_email +
    `
                                        </h2>
                                    </td>
                                </tr>


                                
                                <tr>
                                <td align="center"
                                    style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 25px;text-align:right">
                                    <h2
                                        style="font-size: 24px; font-weight: 800; line-height: 30px; color: #ffffff; margin: 0;text-align:right;direction:rtl">
                                       الرقم الضريبي  :
                                      ` +
    store.tax_number +
    `
                                    </h2>
                                </td>
                            </tr>


                                <tr>
                                <td align="center"
                                    style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 25px;text-align:right">
                                    <h2
                                        style="font-size: 24px; font-weight: 800; line-height: 30px; color: #ffffff; margin: 0;text-align:right;direction:rtl">
                                         العنوان:
                                      ` +
    store.country +
    " , " +
    store.city +
    " , " +
    store.area +
    `
                                    </h2>
                                </td>
                            </tr>


                              
    
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        </td>
        </tr>
        </table>
    </body>
    
    </html>
    `;

  return (
    <View style={{ flex: 1 }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
              style={{ alignItems: "flex-start" }}
            >
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.modalText}>تغيير حالة الطلب</Text>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <RadioButton
                value="active"
                status={checked === "active" ? "checked" : "unchecked"}
                onPress={() => setChecked("active")}
              />
              <Text style={{ fontFamily: "Bold" }}>قيد التنفيذ</Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <RadioButton
                value="complete"
                status={checked === "complete" ? "checked" : "unchecked"}
                onPress={() => setChecked("complete")}
              />
              <Text style={{ fontFamily: "Bold" }}>مكتمل</Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <RadioButton
                value="delivered"
                status={checked === "delivered" ? "checked" : "unchecked"}
                onPress={() => setChecked("delivered")}
              />
              <Text style={{ fontFamily: "Bold" }}>تم التوصيل</Text>
            </View>

            <TouchableOpacity
              onPress={() => edit_order() && setModalVisible(false)}
              style={{
                backgroundColor: "#F9C227",
                paddingVertical: 15,
                borderRadius: 10,
                width: "100%",
                marginTop: 20
              }}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontFamily: "Bold"
                }}
              >
                تعديل حالة الطلب
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View
        style={{
          backgroundColor: "#5B5B5B",
          paddingVertical: 20,
          height: 120,
          top: 0,
          flexDirection: "row",
          justifyContent: "flex-start",
          paddingHorizontal: 10,
          alignItems: "center"
        }}
      >
        <View style={{ justifyContent: "center" }}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <SimpleLineIcons
              name="arrow-right"
              size={30}
              color="#FFF"
              style={{ marginHorizontal: 15 }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ justifyContent: "center" }}>
          <Text
            style={{
              textAlign: "center",
              fontFamily: "Bold",
              color: "#FFF",
              fontSize: 20
            }}
          >
            تفاصيل العرض
          </Text>
        </View>
      </View>

      {isLoading == true
        ? <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <LottieView
              autoPlay
              style={{
                width: 100,
                height: 100
              }}
              source={require("./../assets/load_secondry.json")}
            />
          </View>
        : <ScrollView>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  paddingHorizontal: 10,
                  alignItems: "center",
                  paddingVertical: 20,
                  justifyContent: "space-between"
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <MaterialCommunityIcons
                    name="account"
                    size={40}
                    color="grey"
                  />
                  <Text style={{ fontFamily: "Bold", fontSize: 20 }}>
                    {data.client_name}
                  </Text>
                </View>
                <View>
                  <Text style={{ fontFamily: "Bold", color: "grey" }}>
                    رقم العرض - #{data.id}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  borderColor: "grey",
                  borderBottomWidth: 1,
                  marginBottom: 10,
                  marginHorizontal: 20,
                  marginTop: 30
                }}
              />

              <View
                style={{
                  flexDirection: "row",
                  height: 152,
                  borderBottomWidth: 1,
                  borderTopWidth: 1,
                  borderColor: "#922305",
                  marginHorizontal: 10,
                  borderRadius: 10,
                  alignItems: "center",
                  marginBottom: 20,
                  marginVertical: 10
                }}
              >
                <View style={{ width: "40%" }}>
                  <Image
                    style={{
                      width: "100%",
                      maxHeight: 150
                      // borderBottomRightRadius: 15,
                      // borderTopRightRadius: 15
                    }}
                    source={require("./../assets/body/face.png")}
                  />
                </View>
                <View style={{ width: "60%", paddingRight: 10 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between"
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <MaterialCommunityIcons
                        name="account"
                        size={24}
                        color="grey"
                      />
                      <Text
                        style={{
                          fontFamily: "Bold",
                          marginHorizontal: 10
                        }}
                      >
                        {data.client_name}
                      </Text>
                    </View>
                  </View>

                  <View style={{ flexDirection: "row" }}>
                    <Foundation name="dollar-bill" size={24} color="grey" />
                    <Text
                      style={{
                        fontFamily: "Bold",
                        textAlign: "right",
                        marginHorizontal: 10
                      }}
                    >
                      {data.price} رس
                    </Text>
                  </View>

                  <View style={{ flexDirection: "row" }}>
                    <Ionicons name="md-shirt" size={24} color="grey" />
                    <Text
                      style={{
                        fontFamily: "Bold",
                        textAlign: "right",
                        marginHorizontal: 10
                      }}
                    >
                      ثوب - سعودي
                    </Text>
                  </View>

                  <View style={{ flexDirection: "row" }}>
                    <MaterialIcons name="date-range" size={24} color="grey" />
                    <Text
                      style={{
                        fontFamily: "Bold",
                        textAlign: "right",
                        marginHorizontal: 10
                      }}
                    >
                      {data.deliver_date}
                    </Text>
                  </View>
                </View>
              </View>

              <View>
                <View style={{ paddingHorizontal: 20 }}>
                  <Text style={{ fontFamily: "Bold", color: "grey" }}>
                    حالة الطلب :
                  </Text>
                </View>
              </View>

              <View>
                <View style={{ marginHorizontal: 50, marginVertical: 10 }}>
                  {data.status == "active" &&
                    <View
                      style={{
                        flexDirection: "row",
                        backgroundColor: "#922305",
                        justifyContent: "center",
                        paddingVertical: 5,
                        alignItems: "center",
                        borderRadius: 15
                      }}
                    >
                      <Image
                        style={{
                          width: 24,
                          height: 24,
                          marginHorizontal: 15
                        }}
                        source={require("./../assets/machine.png")}
                      />

                      <Text
                        style={{
                          fontFamily: "Bold",
                          textAlign: "center",
                          color: "#FFF"
                        }}
                      >
                        قيد التنفيذ
                      </Text>
                    </View>}

                  {data.status == "complete" &&
                    <View
                      style={{
                        flexDirection: "row",
                        backgroundColor: "green",
                        justifyContent: "center",
                        paddingVertical: 5,
                        alignItems: "center",
                        borderRadius: 15
                      }}
                    >
                      <Feather name="check-circle" size={24} color="#FFF" />
                      <Text
                        style={{
                          fontFamily: "Bold",
                          color: "grey",
                          textAlign: "center",
                          color: "#FFF",
                          marginHorizontal: 10
                        }}
                      >
                        مكتمل
                      </Text>
                    </View>}

                  {data.status == "delivered" &&
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        backgroundColor: "grey",
                        paddingVertical: 5,
                        alignItems: "center",
                        borderRadius: 15
                      }}
                    >
                      <MaterialCommunityIcons
                        name="truck-check"
                        size={30}
                        color="#FFF"
                      />
                      <Text
                        style={{
                          fontFamily: "Bold",
                          color: "grey",
                          textAlign: "center",
                          color: "#FFF",
                          marginHorizontal: 10
                        }}
                      >
                        تم التوصيل
                      </Text>
                    </View>}
                </View>
              </View>

              <View>
                <View style={{ paddingHorizontal: 20 }}>
                  <Text style={{ fontFamily: "Bold", color: "grey" }}>
                    تفاصيل الدفع :
                  </Text>
                </View>

                <View
                  style={{
                    marginHorizontal: 20,
                    paddingVertical: 15,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderBottomWidth: 1,
                    borderColor: "grey"
                  }}
                >
                  <Text style={{ fontFamily: "Bold", color: "#922305" }}>
                    التكلفة النهائية :
                  </Text>
                  <Text style={{ fontFamily: "Bold", color: "grey" }}>
                    {data.total_price} رس
                  </Text>
                </View>

                <View
                  style={{
                    marginHorizontal: 20,
                    paddingVertical: 15,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderBottomWidth: 1,
                    borderColor: "grey"
                  }}
                >
                  <Text style={{ fontFamily: "Bold", color: "#922305" }}>
                    التكلفة بعد الضريبة :
                  </Text>
                  <Text style={{ fontFamily: "Bold", color: "grey" }}>
                    {data.price_after_tax} رس
                  </Text>
                </View>

                <View
                  style={{
                    marginHorizontal: 20,
                    paddingVertical: 15,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderBottomWidth: 1,
                    borderColor: "grey"
                  }}
                >
                  <Text style={{ fontFamily: "Bold", color: "#922305" }}>
                    المدفوع :
                  </Text>
                  <Text style={{ fontFamily: "Bold", color: "grey" }}>
                    {data.paid} رس
                  </Text>
                </View>

                <View
                  style={{
                    marginHorizontal: 20,
                    paddingVertical: 15,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderBottomWidth: 1,
                    borderColor: "grey"
                  }}
                >
                  <Text style={{ fontFamily: "Bold", color: "#922305" }}>
                    المطلوب :
                  </Text>
                  <Text style={{ fontFamily: "Bold", color: "grey" }}>
                    {data.price_after_tax - data.paid} رس
                  </Text>
                </View>

                <View
                  style={{
                    marginHorizontal: 20,
                    paddingVertical: 15,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 50
                  }}
                >
                  <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    style={{
                      borderRadius: 20,
                      borderColor: "#922305",
                      borderWidth: 1,
                      width: "80%",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: 20
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Bold",
                        color: "#922305",
                        textAlign: "center",
                        paddingVertical: 10
                      }}
                    >
                      تعديل حالة الطلب
                    </Text>
                    <AntDesign
                      name="edit"
                      size={24}
                      color="#922305"
                      style={{ marginHorizontal: 15 }}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      Print.printAsync({
                        html: htmlString
                      })}
                    style={{
                      borderRadius: 20,
                      borderColor: "#922305",
                      borderWidth: 1,
                      width: "80%",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Bold",
                        color: "#922305",
                        textAlign: "center",
                        paddingVertical: 10
                      }}
                    >
                      طباعة الفاتورة
                    </Text>
                    <Feather
                      name="printer"
                      size={24}
                      color="#922305"
                      style={{ marginHorizontal: 15 }}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      Linking.openURL(
                        "whatsapp://send?phone=" + data.client_phone
                      )}
                    style={{
                      borderRadius: 20,
                      borderColor: "#922305",
                      borderWidth: 1,
                      width: "80%",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 20
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Bold",
                        color: "#922305",
                        textAlign: "center",
                        paddingVertical: 10
                      }}
                    >
                      تواصل مع العميل
                    </Text>
                    <Fontisto
                      name="whatsapp"
                      size={24}
                      color="#922305"
                      style={{ marginHorizontal: 15 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>}
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "90%"
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "Bold"
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
