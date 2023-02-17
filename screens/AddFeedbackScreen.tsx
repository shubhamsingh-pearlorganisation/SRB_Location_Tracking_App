import {
    View,
    Text,
    StyleSheet,
    Image,
    Pressable,
    TouchableOpacity,
  } from "react-native";
import { TextInput } from "react-native-paper";


  const AddFeedback = () =>{

    return(
        <View>
            <Text>
                Title
            </Text>
            <TextInput
            placeholder="Enter Title"
            />
            <Text>
                Description
            </Text>
            <TextInput 
            placeholder="Enter Description"
            multiline={true}
            />
            <Text>
                Type
            </Text>
            <TextInput
            placeholder="Enter Type"
            />
        </View>
    )

  }

  export default AddFeedback;