import { Input } from "@/components/input";
import { useEffect, useState } from "react";
import { View, Button, Alert, FlatList, Text} from "react-native";
import {useProductDatabase, ProductDatabase} from "@/database/useProductDatabase"
import { Product } from "@/components/Products";
import { router } from "expo-router"


export default function Index(){
    const[id, setId] = useState("")
    const[name, setName] = useState("")
    const[brand, setBrand] = useState("")
    const[search, setSearch] = useState("")
    const[quantity, setQuantity] = useState("")
    const[products, setProducts] = useState<ProductDatabase[]>([])

    const productDatabase = useProductDatabase()

    async function create(){
        try{
            if(isNaN(Number(quantity))){
                return Alert.alert("Quantidade", "A quantidade precisa ser um número !")
            }
            const response = await productDatabase.create({name, brand, quantity: Number(quantity)})


            Alert.alert("Produto cadastrado com ID: " + response.insertedRowId)
        }catch(error){
            console.log(error)
        }
    }

    async function update(){
        try{
            if(isNaN(Number(quantity))){
                return Alert.alert("Quantidade", "A quantidade precisa ser um número !")
            }
            const response = await productDatabase.update({name, brand ,quantity: Number(quantity), id: Number(id)})


            Alert.alert("Produto Atualizado")
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

    function details(item: ProductDatabase){
        setId(String(item.id))
        setName(item.name)
        setBrand(item.brand)
        setQuantity(String(item.quantity))
    }

    async function handleSave() {
        if(id){
            update()
        }else{
            create()
        }

        setId("")
        setName("")
        setQuantity("")
        setBrand("")
        await list()
    }

    async function remove(id: number) {
        try{
            await productDatabase.remove(id)
            await list()
        }catch(error){
            console.log(error)
        }
    }

    useEffect(()=> {list()},[search])

    return(
        <View style={{flex:1, justifyContent: "center", padding: 32, gap: 16, marginTop: 50, }}>
            <Input placeholder="Nome " placeholderTextColor={"#999"} onChangeText={setName} value={name}/>
            <Input placeholder="Marca " placeholderTextColor={"#999"} onChangeText={setBrand} value={brand}/>
            <Input placeholder="Quantidade " placeholderTextColor={"#999"} onChangeText={setQuantity} value={quantity}/>
            
            <Button title="Salvar" onPress={handleSave}/>
            
            <Input placeholder="Buscar " placeholderTextColor={"#999"} onChangeText={setSearch}/>
            
            <FlatList
                data={products}
                keyExtractor={(item) => String(item.id)}
                renderItem={({item}) => (
                    <Product 
                        data={item} 
                        onPress={() => details(item)} 
                        onDelete={()=>remove(item.id)} 
                        onOpen={() => router.navigate(`/details/${item.id}`)}
                    />
                )}
                contentContainerStyle={{gap:16}}
            />
        </View>
    )
}