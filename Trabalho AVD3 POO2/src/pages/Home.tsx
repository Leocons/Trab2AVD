import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, Platform, FlatList, TouchableOpacity} from 'react-native'
import { Button } from '../components/Button'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface DadosCadastrais {
  id: string;
  nome: string;
  email: string;
  telefone: string;
}

export function Home(){
  const [novoNome, setNovoNome] = useState('')
  const [novoEmail, setNovoEmail] = useState('')
  const [novoTelefone, setNovoTelefone] = useState('')
  const [meusCadastros, setMeusCadastros] = useState<DadosCadastrais[]>([]);

  useEffect(() => {
    async function loadData(){
      const cadastrosArmazenados = await AsyncStorage.getItem('@meuscadastros:cadastros')
      if(cadastrosArmazenados){
        setMeusCadastros(JSON.parse(cadastrosArmazenados))
      }
    }
    loadData()
  }, [])

  useEffect(() => {
    async function saveData(){
      await AsyncStorage.setItem('@meuscadastros:cadastros', JSON.stringify(meusCadastros))
    }
    saveData()
  }, [meusCadastros])

  function handleAdd(){
    if(novoNome.trim() !== '' && novoEmail.trim() !== '' && novoTelefone.trim() !== ''){
      const data = {
        id: String(new Date().getTime()),
        nome: novoNome,
        email: novoEmail,
        telefone: novoTelefone
      }
      setMeusCadastros([...meusCadastros, data])
      setNovoNome('')
      setNovoEmail('')
      setNovoTelefone('')
    }
  }

  function handleRemove(id: string){
    setMeusCadastros(meusCadastros.filter(item => item.id !== id))
  }

  return (
    <>
      <View style={styles.container}>
      <Text style={[styles.titleSimple, {marginVertical: 0}]}>
        Cadastro
        </Text>
        <TextInput style={styles.input} placeholder='Nome Completo' value={novoNome} 
        placeholderTextColor='#FFFFFF' onChangeText={value => setNovoNome(value)} onSubmitEditing={handleAdd} />
        <TextInput style={styles.input} placeholder='E-mail' value={novoEmail}
         placeholderTextColor='#FFFFFF' onChangeText={value => setNovoEmail(value)} onSubmitEditing={handleAdd} />
        <TextInput style={styles.input} placeholder='Telefone' value={novoTelefone}
         placeholderTextColor='#FFFFFF' onChangeText={value => setNovoTelefone(value)} onSubmitEditing={handleAdd} />
        <Button 
          onPress={handleAdd} 
          title="Cadastrar"
        />
        <Text style={[styles.title, {marginVertical: 20}]}>
          Cadastros Realizados
        </Text>
        <FlatList style={styles.flatList}
        data={meusCadastros} 
        keyExtractor={item => item.id} 
        renderItem={({ item }) => (
          <TouchableOpacity onPress={()=>handleRemove(item.id)} key={item.id} style={styles.buttonSkill}>
              <Text style={styles.textSkill}>
                <Text style={{fontSize: 20}}>
                  {item.nome}{"\n"}
                  </Text>
                <Text style={{fontSize: 15}}>
                  {item.email}{"\n"}
                  </Text>
                <Text style={{fontSize: 13}}>
                  {item.telefone}
                  </Text>
              </Text>
          </TouchableOpacity>
        )}>
        </FlatList>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#484c9c',
      paddingHorizontal: 70,
      paddingVertical: 40,
    },
    titleSimple: {
      color: '#FFFFFF',
      fontSize: 17,
      fontWeight: 'bold',
      marginTop: 30,
    },
    input: {
      backgroundColor: '#212121',
      color: '#FFFFFF',
      fontSize: 15,
      padding: Platform.OS == 'ios' ? 15 : 10,
      marginTop: 10,
    },
    buttonSkill: {
      backgroundColor: '#212121',
      padding: Platform.OS == 'ios' ? 15 : 10,
      alignItems: 'center',
      marginTop: 5
    },
    title: {
      fontSize: 17,
      fontWeight: 'bold',
      color:'#FFFFFF',
    },
    textSkill: {
      color: '#FFFFFF',
      fontSize: 17,
      fontWeight: 'bold'
    },
    flatList: {
      paddingBottom: 50
    },

})