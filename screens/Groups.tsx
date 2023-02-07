import React from "react";
import {
<<<<<<< HEAD
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  Dimensions,
  TouchableOpacity,
} from "react-native";
=======
    View,
    Text,
    Image,
    StyleSheet,
    Platform,
    Dimensions,
    TouchableOpacity,
    Pressable} from "react-native";
>>>>>>> 7c8735dc50110d290d26133b17395d1e122daaee

const Groups = () => {
  return (
    <View>
      <Text>Groups</Text>
    </View>
  );
};

<<<<<<< HEAD
export default Groups;
=======
const Groups = ({navigation}:any) =>{

        const onPressSubmit =()=>{
            navigation.navigate('EditGroup')
        }

    return(
        <View>
            <Text>
            Groups
        </Text>
        <Pressable
        onPress={onPressSubmit}>
            <Text>Edit</Text>
        </Pressable>
        </View>
        
    );
}

export default Groups;
>>>>>>> 7c8735dc50110d290d26133b17395d1e122daaee
