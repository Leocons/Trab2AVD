import React, { useState, useEffect } from 'react'
import { ScrollView, Text, StyleSheet, TextInput, Platform, FlatList, TouchableOpacity} from 'react-native'
import { Button } from '../components/Button'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface DadosCadastrais {
  id: string;
  nome: string;
  email: string;
  telefone: string;
}

export function Home(){
  const [newNome, setNewNome] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newTelefone, setNewTelefone] = useState('')
  const [myCadastros, setMyCadastros] = useState<DadosCadastrais[]>([]);

  useEffect(() => {
    async function loadData(){
      const cadastrosArmazenados = await AsyncStorage.getItem('@meuscadastros:cadastros')
      if(cadastrosArmazenados){
        setMyCadastros(JSON.parse(cadastrosArmazenados))
      }
    }
    loadData()
  }, [])

  useEffect(() => {
    async function saveData(){
      await AsyncStorage.setItem('@meuscadastros:cadastros', JSON.stringify(myCadastros))
    }
    saveData()
  }, [myCadastros])

  function handleAddNewSkill(){
    const data = {
      id: String(new Date().getTime()),
      nome: newNome,
      email: newEmail,
      telefone: newTelefone
    }
    setMyCadastros([...myCadastros, data])
    setNewNome('')
    setNewEmail('')
    setNewTelefone('')
  }

  function handleRemoveSkill(id: string){
    async function removeData(){
      const cadastrosArmazenados = await AsyncStorage.getItem('@meuscadastros:cadastros')
      if(cadastrosArmazenados){
        const alteredCadastro = setMyCadastros(JSON.parse(cadastrosArmazenados).filter(function(e : DadosCadastrais){
          return e.id !== id
      }))
      AsyncStorage.setItem('@meuscadastros:cadastros', JSON.stringify(alteredCadastro));
      }
    }
    removeData()
  }

  return (
    <>
      <ScrollView horizontal={false} style={styles.container}>
      <Text style={[styles.titleSimple, {marginVertical: 0}]}>Cadastro</Text>
        <TextInput style={styles.input} placeholder='Nome Completo' value={newNome} placeholderTextColor='#FFFFFF' onChangeText={value => setNewNome(value)} onSubmitEditing={handleAddNewSkill} />
        <TextInput style={styles.input} placeholder='E-mail' value={newEmail} placeholderTextColor='#FFFFFF' onChangeText={value => setNewEmail(value)} onSubmitEditing={handleAddNewSkill} />
        <TextInput style={styles.input} placeholder='Telefone' value={newTelefone} placeholderTextColor='#FFFFFF' onChangeText={value => setNewTelefone(value)} onSubmitEditing={handleAddNewSkill} />
        <Button 
          onPress={handleAddNewSkill} 
          title="Cadastrar"
        />
        <Text style={[styles.title, {marginVertical: 20}]}>
          Cadastros Realizados
        </Text>
        <FlatList style={styles.flatList}
        data={myCadastros} 
        keyExtractor={item => item.id} 
        renderItem={({ item }) => (
          <TouchableOpacity onPress={()=>handleRemoveSkill(item.id)} key={item.id} style={styles.buttonSkill}>
              <Text style={styles.textSkill}>
                <Text style={{fontSize: 20}}>{item.nome}{"\n"}</Text>
                <Text style={{fontSize: 15}}>{item.email}{"\n"}</Text>
                <Text style={{fontSize: 13}}>{item.telefone}</Text>
              </Text>
          </TouchableOpacity>
        )}>
        </FlatList>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#484c9c',
      paddingHorizontal: 100,
      paddingVertical: 40,
    },
    titleSimple: {
      color: '#FFFFFF',
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 30,
    },
    input: {
      backgroundColor: '#212121',
      color: '#FFFFFF',
      fontSize: 18,
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
      fontSize: 20,
      fontWeight: 'bold',
      color:'#FFFFFF',
    },
    textSkill: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: 'bold'
    },
    flatList: {
      paddingBottom: 50
    },

})