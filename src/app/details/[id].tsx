import { View, Text } from "react-native";
import {useLocalSearchParams} from "expo-router"
import { useState, useEffect } from "react";
import { useProductDatabase } from "@/database/useProductDatabase";

export default function Details(){
    const [data, setData] = useState({name:" ", quatity:0})
    const productDatabase = useProductDatabase()
    const params = useLocalSearchParams<{id: string}>()

    useEffect(()=>{
        if(params.id){
            productDatabase.show(Number(params.id)).then(response =>{
                if (response){
                    setData({
                        name: response.name,
                        quatity: response.quantity
                    })
                }
            })
        }
    },[params.id])
    
    return(
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text style={{fontSize: 32}}>
                ID: {params.id}
            </Text>
            <Text style={{fontSize: 32}}>
                Qtd: {data.quatity}
            </Text>
            <Text style={{fontSize: 32}}>
                Nome: {data.name}
            </Text>
        </View>
    )
}