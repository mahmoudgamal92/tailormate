import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  TextInput,
  Linking
} from "react-native";
import { RadioButton } from "react-native-paper";
import RBSheet from "react-native-raw-bottom-sheet";
import {
  Feather,
  AntDesign,
  SimpleLineIcons,
  Ionicons,
  Entypo
} from "@expo/vector-icons";
import Constants from "expo-constants";
import LottieView from "lottie-react-native";
import * as Print from "expo-print";
export default function AddClient({ route, navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [clientData, setData] = useState([]);
  const { id, token } = route.params;
  const refRBSheet = useRef();
  const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var hours = new Date().getHours();
    var minutes = new Date().getMinutes();
    var seconds = new Date().getSeconds();
    return date + "-" + month + "-" + year;
  };

  const getCurrentTime = () => {
    var hours = new Date().getHours();
    var minutes = new Date().getMinutes();
    var seconds = new Date().getSeconds();
    return hours + " : " + minutes + " : " + seconds;
  };

  useEffect(() => {
    _retrieveData();
  }, []);

  const _retrieveData = async () => {
    try {
      const user_token = await AsyncStorage.getItem("user_token");
      let formData = new FormData();
      formData.append("token", token);
      formData.append("tailor_token", user_token);
      fetch("https://stakfort.com/tailor/api/get_client.php", {
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
        })
        .finally(() => setLoading(false))
        .catch(error => console.error(error));
    } catch (error) {
      console.log(error);
    }
  };

  const msg =
    "تطبيق Tailor Mate" +
    "\nرسالة خاصة لبيانات عميل:" +
    "\n الأسم بالكامل: " +
    clientData.full_name +
    " " +
    "\n البريد الألكتروني: " +
    clientData.email +
    "\n الهاتف: " +
    clientData.phone +
    "\n الطول : " +
    clientData.length +
    " سم" +
    "\n الوسع: " +
    clientData.width +
    " سم" +
    "\n  الكتف: " +
    clientData.shoulder +
    " سم" +
    "\n اليد : " +
    clientData.hand +
    " سم" +
    "\n   وسع اليد: " +
    clientData.hand_width +
    " سم" +
    "\n  الرقبة: " +
    clientData.neck +
    " سم" +
    "\n  سادة: " +
    clientData.sadah +
    " سم" +
    "\n  قلاب: " +
    clientData.kalab +
    " سم" +
    "\n كبك: " +
    clientData.cup +
    " سم" +
    "\n وسع الكبك: " +
    clientData.cup_width +
    " سم";

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
                            <td align="center" valign="top" style="font-size:0; padding: 35px;" bgcolor="#92230">
                                <div
                                    style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;">
                                    <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%"
                                        style="max-width:300px;">
                                        <tr>
                                            <td align="left" valign="top"
                                                style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 36px; font-weight: 800; line-height: 48px;"
                                                class="mobile-center">
                                                <h3 style="font-weight: 800; margin: 0; color: #ffffff;">
                                                    Tailor Mate App
                                                </h3>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <div style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;"
                                    class="mobile-hide">
                                    <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%"
                                        style="max-width:300px;">
                                        <tr>
                                            <td align="right" valign="top"
                                                style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; line-height: 48px;">
                                                <table cellspacing="0" cellpadding="0" border="0" align="right">
                                                    <tr>
                                                        <td
                                                            style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400;">
                                                           <h1 style="color: #ffffff;"> متجر ` +
                                                           clientData.store_name +
                                                           `</h1>
                                                        </td>
    
                                                    </tr>
                                                </table>
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
                                            clientData.store_logo +
                                            `"
                                                width="200" height="200" style="display: block; border: 0px;" /><br>
                                            <h2
                                                style="font-size: 30px; font-weight: 800; line-height: 36px; color: #333333; margin: 0;">
                                                القياسات الخاصة بالعميل
                                            </h2>
                                            <h3>` +
                                      clientData.full_name +
                                      `</h3 </td>
                                    </tr>
                                    <tr>
                                        <td align="left"
                                            style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 10px;">
                                            <p
                                                style="font-size: 16px; font-weight: 400; line-height: 24px; color: #777777;text-align:center">
                                                هذة البيانات تم تصديرها عبر تطبيق الخياط بموافقة العميل 
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left" style="padding-top: 20px;">
                                            <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                                <tr>
                                                    <td colspan="2" width="100%" align="center" bgcolor="#eeeeee"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;">
                                                        جدول بيانات العميل
                                                    </td>
    
                                                </tr>
                                                <tr>
    
                                                    <td width="25%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;text-align:right">
                                                        ` +
                                          clientData.full_name +
                                          `</td>
    
                                                    <td width="75%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;text-align:right">
                                                        الأسم بالكامل
                                                    </td>
    
                                                </tr>
                                                <tr>
    
                                                    <td width="25%" align="rights"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;text-align:right">
                                                        ` +
                                                        clientData.phone +
                                                        `</td>
                                                    <td width="75%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;text-align:right">
                                                        رقم الهاتف
                                                    </td>
                                                </tr>
                                                <tr>
    
                                                    <td width="25%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;text-align:right;text-align:right">
                                                        ` +
                                                          clientData.email +
                                                          `</td>
    
                                                    <td width="75%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;text-align:right">
                                                        البريد الألكتروني
                                                    </td>
                                                </tr>
    
    
                                                <tr>
    
                                                    <td width="25%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;text-align:right">
                                                        ` +
                                                  clientData.length +
                                                  ` سم
                                                    </td>
    
                                                    <td width="75%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;text-align:right">
                                                        الطول 
                                                    </td>
    
                                                </tr>
    
    
    
    
                                                <tr>
    
                                                    <td width="25%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;text-align:right">
                                                        ` +
                                                clientData.width +
                                                ` سم
                                                    </td>
    
                                                    <td width="75%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;text-align:right">
                                                         الوسع :
                                                    </td>
                                                </tr>    

                                                <tr>
    
                                                    <td width="25%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;text-align:right">
                                                        ` +
                                              clientData.shoulder +
                                              ` سم
                                                    </td>
    
                                                    <td width="75%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;text-align:right">
                                                        عرض الكتف
                                                    </td>
    
                                                </tr>
    
                                                <tr>
    
                                                
                                                

                                                    <td width="25%" align="left"
                                                    style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;text-align:right">
                                                    ` +
                                                clientData.hand +
                                                ` سم
                                                </td>

                                                <td width="75%" align="left"
                                                style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;text-align:right">
                                                اليد 
                                            </td>
                                                </tr>
                                                <tr>
                                               
                                                    <td width="25%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;text-align:right">
                                                        ` +
                                                      clientData.hand_width +
                                                      `سم
                                                        </td>
                                                        <td width="75%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;text-align:right">
                                                       وسع اليد
                                                    </td>
                                                </tr>
    
    

                                                <tr>
                                                  
                                                    <td width="25%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;text-align:right">
                                                        ` +
                                                      clientData.neck +
                                                      ` سم</td>

                                                        <td width="75%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;text-align:right">
                                                     الرقبة
                                                    </td>
                                                </tr>
    
                                                <tr>
                                                 
                                                    <td width="25%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;text-align:right">
                                                        ` +
                                                        clientData.kalab +
                                                        ` سم</td>

                                                        <td width="75%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;text-align:right">
                                                       قلاب
                                                    </td>
                                                </tr>
    
                                                <tr>
                                                
                                                    <td width="25%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;text-align:right">
                                                        ` +
                                                    clientData.sadah +
                                                    ` سم</td>

                                                        <td width="75%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;text-align:right">
                                                       سادة
                                                    </td>
                                                </tr>
  
                                                <tr>
                                                   
                                                    <td width="25%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;text-align:right">
                                                        ` +
                                                        clientData.cup +
                                                        ` سم</td>
                                                        <td width="75%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;text-align:right">
                                                       الكبك
                                                    </td>
                                                </tr>  
                                                <tr>
                                             
                                                    <td width="25%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;text-align:right">
                                                        ` +
                                                      clientData.cup_width +
                                                      ` سم</td>ً
                                                        <td width="75%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;text-align:right">
                                                      وسع الكبك
                                                    </td>
                                                </tr>
  
                                          
    
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left" style="padding-top: 20px;">
                                            <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                                <tr>
                                                   
                                                    <td width="25%" align="left"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;text-align:right">
                                                        ` +
                                                          getCurrentDate() +
                                                          `
                                                    </td>

                                                    <td width="75%" align="left"
                                                    style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;text-align:right">
                                                    تاريخ الطباعة
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>   
                                    </tr>

                                    <tr>
                                    <td align="left" style="padding-top: 20px;">
                                        <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                               
                                                <td width="25%" align="left"
                                                    style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;text-align:right">
                                                    ` +
                                                  getCurrentTime() +
                                                  `
                                                </td>

                                                <td width="75%" align="left"
                                                style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;text-align:right">
                                              الوقت
                                                </td>
                                            </tr>
                                        </table>
                                    </td>   
                                </tr>
                                </table>
                            </td>
                        </tr>
                     
                        <tr>
                            <td align="center" style=" padding: 35px; background-color: #922305;" bgcolor="#922305">
                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
                                    style="max-width:600px;">
                                    <tr>
                                        <td align="center"
                                            style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 25px;">
                                            <h3
                                                style="font-size: 24px; font-weight: 800; line-height: 30px; color: #ffffff; margin: 0;text-align:right;direction:rtl">
                                             رقم تواصل المتجر :   `  +
                                                clientData.store_number
                                                 +
                                                `
                                            </h3>
                                            <h3
                                            style="font-size: 24px; font-weight: 800; line-height: 30px; color: #ffffff; margin: 0;text-align:right;direction:rtl">
                                              البريد الألكتروني :   ` +
                                            clientData.store_email
                                             +
                                            `
                                        </h3>

                                        <h3
                                        style="font-size: 24px; font-weight: 800; line-height: 30px; color: #ffffff; margin: 0;text-align:right;direction:rtl">
                                          الرقم الضريبي  :   ` +
                                        clientData.tax_number
                                         +
                                        `
                                    </h3>
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
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
          >
            <SimpleLineIcons
              name="arrow-right"
              size={30}
              color="#FFF"
              style={{ marginHorizontal: 10 }}
            />
          </TouchableOpacity>
        </View>

        <View style={{ justifyContent: "center" }}>
          <Text
            style={{
              textAlign: "center",
              fontFamily: "ExtraBold",
              color: "#FFF",
              fontSize: 20
            }}
          >
            بيانات العميل
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
            <View style={{ alignSelf: "center" }}>
              <LottieView
                autoPlay
                style={{
                  width: 100,
                  height: 100
                }}
                source={require("./../assets/load_secondry.json")}
              />
            </View>
          </View>
        : <View>
            <View
              style={{
                paddingHorizontal: 10,
                paddingTop: 25,
                borderBottomWidth: 1,
                marginHorizontal: 10,
                paddingVertical: 10,
                borderColor: "grey"
              }}
            >
              <Text style={{ fontFamily: "Bold", textAlign: "justify" }}>
                {clientData.full_name}
              </Text>
            </View>
            <View
              style={{
                paddingHorizontal: 10,
                paddingTop: 25,
                borderBottomWidth: 1,
                marginHorizontal: 10,
                paddingVertical: 10,
                borderColor: "grey"
              }}
            >
              <Text style={{ fontFamily: "Bold" }}>رقم الهاتف :</Text>
              <Text style={{ fontFamily: "Bold", textAlign: "justify" }}>
                {clientData.phone}
              </Text>
            </View>

            <View
              style={{
                paddingHorizontal: 10,
                paddingTop: 25,
                borderBottomWidth: 1,
                marginHorizontal: 10,
                paddingVertical: 10,
                borderColor: "grey"
              }}
            >
              <Text style={{ fontFamily: "Bold" }}>البريد الألكتروني :</Text>
              <Text style={{ fontFamily: "Bold", textAlign: "justify" }}>
                {clientData.email}
              </Text>
            </View>

            <View
              style={{
                paddingHorizontal: 10,
                paddingTop: 25,
                borderBottomWidth: 1,
                marginHorizontal: 10,
                paddingVertical: 10,
                borderColor: "grey"
              }}
            >
              <Text style={{ fontFamily: "Bold" }}>تاريخ الميلاد :</Text>
              <Text style={{ fontFamily: "Bold", textAlign: "right" }}>
                {clientData.birth_date}
              </Text>
            </View>

            <View style={{ paddingHorizontal: 10, marginTop: 30 }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("AddOrder", {
                    client_token: clientData.token,
                    client_id: clientData.id,
                    client_name: clientData.full_name,
                    client_phone: clientData.phone,
                   
                  })}
                style={{
                  paddingVertical: 15,
                  borderRadius: 20,
                  width: "100%",
                  borderWidth: 1.5,
                  borderColor: "red",
                  flexDirection: "row",
                  justifyContent: "center"
                }}
              >
                <AntDesign name="plus" size={24} color="red" />

                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontFamily: "Bold",
                    color: "red",
                    marginHorizontal: 20
                  }}
                >
                  أضافة طلب جديد
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{ paddingHorizontal: 10, marginBottom: 20, marginTop: 30 }}
            >
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Body", {
                    token: clientData.token,
                    id: clientData.id,
                    full_name:
                      clientData.full_name
                  })}
                style={{
                  paddingVertical: 15,
                  borderRadius: 20,
                  width: "100%",
                  borderWidth: 1.5,
                  borderColor: "red",
                  flexDirection: "row",
                  justifyContent: "center"
                }}
              >
                <Ionicons name="ios-body" size={24} color="red" />
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontFamily: "Bold",
                    color: "red",
                    marginHorizontal: 15
                  }}
                >
                  عرض قياسات الجسم
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ paddingHorizontal: 10, marginBottom: 20 }}>
              <TouchableOpacity
                onPress={() => refRBSheet.current.open()}
                style={{
                  paddingVertical: 15,
                  borderRadius: 20,
                  width: "100%",
                  borderWidth: 1.5,
                  borderColor: "grey",
                  flexDirection: "row",
                  justifyContent: "center"
                }}
              >
                <Entypo name="share" size={24} color="grey" />

                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontFamily: "Bold",
                    color: "grey",
                    marginHorizontal: 15
                  }}
                >
                  مشاركة القياسات
                </Text>
              </TouchableOpacity>
            </View>
          </View>}

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          container: {
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            height: 200,
            backgroundColor: "#FFF",
            borderBottomColor: "#922305"
          },
          wrapper: {
            backgroundColor: "transparent"
          },
          draggableIcon: {
            backgroundColor: "grey"
          }
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 10
          }}
        >
          <TouchableOpacity
            onPress={() => Linking.openURL("whatsapp://send?text=" + msg)}
            style={{
              width: "40%",
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1.5,
              padding: 5,
              borderRadius: 10,
              borderColor: "grey"
            }}
          >
            <Text style={{ fontFamily: "Bold" }}>مشاركه عبر الواتساب :</Text>
            <Image
              source={require("./../assets/social/whatsapp.png")}
              style={{
                width: 50,
                height: 50,
                borderRadius: 20,
                resizeMode: "contain"
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              Print.printAsync({
                html: htmlString
              })}
            style={{
              width: "40%",
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1.5,
              padding: 5,
              borderRadius: 10,
              borderColor: "grey"
            }}
          >
            <Text style={{ fontFamily: "Bold" }}>طباعة البيانات :</Text>

            <Feather name="printer" size={50} color="black" />
          </TouchableOpacity>
        </View>
      </RBSheet>
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
