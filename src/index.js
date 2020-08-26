import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { api } from './services/api'

export default function App() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    api.get('projects')
      .then(function (response) {
        setProjects(response.data);
        console.log(response.data);
      })
  },[])

  async function handleAddProject() {
    const response = await api.post('projects', { 
      title: `Novo Projeto ${Date.now()}`,
      owner: 'Paulo joseph'
    })
    setProjects([ ...projects, response.data ])
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={projects}
          keyExtractor={project => project.id}
          renderItem={({ item: project }) => (
            <Text style={styles.title}>{project.title}</Text>         
          )}
        />
        <TouchableOpacity activeOpacity={0.6}  style={styles.button} onPress={handleAddProject}>
          <Text style={styles.buttonText}>Adicionar projeto</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#7159c1',
    flex: 1
  },
  title: {
    color: '#fff',
    fontSize:30,
    fontWeight: 'bold'
  },

  button: {
    backgroundColor: '#fff',
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  }
})