import { Input } from "@/components/input";
import { useEffect, useState } from "react";
import { View, Button, Alert, FlatList, Pressable} from "react-native";
import {useProductDatabase, ProductDatabase} from "@/database/useProductDatabase"
import { Product } from "@/components/Products";


export default function Index(){
    const[id, setId] = useState("")
    const[name, setName] = useState("")
    const[search, setSearch] = useState("")
    const[quantity, setQuantity] = useState("")
    const[products, setProducts] = useState<ProductDatabase[]>([])

    const productDatabase = useProductDatabase()

    async function create(){
        try{
            if(isNaN(Number(quantity))){
                return Alert.alert("Quantidade", "A quantidade precisa ser um número !")
            }
            const response = await productDatabase.create({name , quantity: Number(quantity)})

            Alert.alert("Produto cadastrado com ID: " + response.insertedRowId)
        }catch(error){
            console.log(error)
        }
    }

    async function list(){
        try{
            const response = await productDatabase.searchByName(search)
            setProducts(response)
        }catch(error){
            console.log(error)
        }
    }

    useEffect(()=> {list()},[search])

    return(
        <View style={{flex:1, justifyContent: "center", padding: 32, gap: 16}}>
            <Input placeholder="Nome " placeholderTextColor={"#999"} onChangeText={setName} value={name}/>
            <Input placeholder="Quantidade " placeholderTextColor={"#999"} onChangeText={setQuantity} value={quantity}/>
            <Button title="Salvar" onPress={create}/>
            <FlatList
                data={products}
                keyExtractor={(item) => String(item.id)}
                renderItem={({item}) => <Product data={item}/>}
            />
        </View>
    )
}