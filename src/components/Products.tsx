import { Pressable, PressableProps, Text, TouchableOpacity } from "react-native";
import {MaterialIcons} from "@expo/vector-icons"
import { red } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

type Props= PressableProps & {
    data:{
        name: string
        quantity: number
        brand: string
    }

    onDelete: () => void
    onOpen: () => void
}

export function Product({data, onDelete, onOpen, ...rest}: Props){
    return(
        <Pressable style={{
            backgroundColor:"#CECECE",
            padding: 24,
            borderRadius: 5,
            gap: 12,
            flexDirection: "row"
        }}
        {...rest}>
            <Text style={{flex: 1}}>
                Qtd: {data.quantity} - Prod:{data.name} - Marca:{data.brand}
            </Text>
            
            <TouchableOpacity onPress={onDelete}>
                <MaterialIcons name="delete" size={24} color="red"/>
            </TouchableOpacity>


            <TouchableOpacity onPress={onOpen}>
                <MaterialIcons name="visibility" size={24} color="blue"/>
            </TouchableOpacity>
        </Pressable>
    ) 
}