import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Switch, StyleSheet } from 'react-native';

const Tarefas = () => {
  const [task, setTask] = useState('');
  const [tasksList, setTasksList] = useState([]);
  const [dataTermino, setDataTermino] = useState('');
  const [prioridade, setPrioridade] = useState('');
  const [concluida, setConcluida] = useState(false);

  const handleSave = () => {
    const newTask = {
      task: task,
      dataTermino: dataTermino,
      prioridade: prioridade,
      concluida: concluida
    };
    setTasksList([...tasksList, newTask]);

    // Limpar os campos após salvar
    setTask('');
    setDataTermino('');
    setPrioridade('');
    setConcluida(false);
  };

  const toggleConcluida = (index) => {
    const newTasksList = [...tasksList];
    newTasksList[index].concluida = !newTasksList[index].concluida;
    setTasksList(newTasksList);
  };

  const renderTask = ({ item, index }) => (
    <View style={styles.taskContainer}>
      <Text style={styles.taskText}>{item.task}</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={item.concluida ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() => toggleConcluida(index)}
        value={item.concluida}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.phone}>
        <View style={styles.screen}>
          <Text style={styles.title}>Minhas Tarefas</Text>
          <View style={styles.inputColumn}>
            <TextInput
              style={styles.input}
              placeholder="Adicionar Tarefa"
              value={task}
              onChangeText={text => setTask(text)}
            />
            <View style={styles.inputColumn}>
              <TextInput
                style={styles.input}
                placeholder="Data de Término"
                value={dataTermino}
                onChangeText={text => setDataTermino(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Prioridade"
                value={prioridade}
                onChangeText={text => setPrioridade(text)}
              />
            </View>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
            <View style={styles.concluidoContainer}>
              <Text style={styles.subtitle}>Concluído</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={concluida ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setConcluida(!concluida)}
                value={concluida}
              />
            </View>
          </View>
        </View>
      </View>
      <FlatList
        style={{flexGrow: 1}} // Para ocupar o restante do espaço disponível
        data={tasksList}
        renderItem={renderTask}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222',
  },
  phone: {
    width: 320,
    height: 700,
    backgroundColor: '#333',
    borderRadius: 20,
    overflow: 'hidden',
  },
  screen: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  inputColumn: {
    flexDirection: 'column',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    marginRight: 10,
    flex: 1,
    borderRadius: 5
  },
  saveButton: {
    backgroundColor: '#007bff',
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 20
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  concluidoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  taskText: {
    fontSize: 16,
  },
});

export default Tarefas;
