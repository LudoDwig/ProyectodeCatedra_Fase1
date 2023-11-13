import NavegacionApp from "./components/Navegacion";
//import LoginAuth from "./components/LoginAuth";
import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";
import { useState, useEffect } from "react";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(JSON.stringify(userInfo, null, 2));
      setIsLoggedIn(true);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ["https://www.googleapis.com/auth/drive.readonly"], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        "82664827529-vkncu8u7lkru2masfuu794te9c1jaha2.apps.googleusercontent.com", // client ID of type WEB for your server
    });
  }, []);

  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      auth()
        .signOut()
        .then(() => alert("Your are signed out!"));
      setIsLoggedIn(false);
      // setuserInfo([]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <NavegacionApp />
      ) : (
        <>
          <ImageBackground source={require('./src/bgs/bg-stu1.jpeg')} style={styles.backgroundImage}>
            <View style={styles.container}>
              <Image
                source={require("./assets/icon1.png")}
                style={styles.image}
              />
              <Text style={styles.title}>Te damos la bienvenida a STUDYBUDDY</Text>
              <GoogleSigninButton
                style={styles.googleButton}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={this._signIn}
              />
            </View>
          </ImageBackground>
        </>
      )}
      {console.log(isLoggedIn)}
    </>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // 'cover' o 'contain', ajusta el tamaño de la imagen de fondo
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 33,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 50,
    marginTop: 30,
    color: "#56070c",
    backgroundColor: 'rgba(230, 231, 254, 0.85)',
  },
  image: {
    width: 350, // Ajusta el ancho según tus necesidades
    height: 350, // Ajusta la altura según tus necesidades
    marginBottom: 40,
  },
  googleButton: {
    width: 292,
    height: 60,
    borderRadius: 50,
    backgroundColor: 'rgba(230, 231, 254, 0.85)',
    marginTop: 20,
    paddingLeft: 7,
    padding: 15,
    marginBottom: 30,
  },
});
