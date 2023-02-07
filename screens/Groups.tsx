import React from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    Platform,
    Dimensions,
    TouchableOpacity,
    Pressable} from "react-native";


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
