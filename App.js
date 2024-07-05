import React, { useState, useEffect } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { 
  FlatList, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';
import { FIREBASE_DB } from './FirebaseDB';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc
} from 'firebase/firestore';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const FireB_DB = onSnapshot(collection(FIREBASE_DB, 'Todos'), querySnapshot => {
      const todosList = [];
      querySnapshot.forEach(documentSnapshot => {
        todosList.push({
          ...documentSnapshot.data(),
          id: documentSnapshot.id,
        });
      });
      setTodos(todosList);
    });

    return () => FireB_DB();
  }, []);

  const addTodo = async () => {
    if (title.trim() !== '') {
      const docRef = await addDoc(collection(FIREBASE_DB, 'Todos'), {
        title: title,
        status: 'due',
      });
      setTitle('');
    }
  };

  const updateTodoStatus = async (id, status) => {
    await updateDoc(doc(FIREBASE_DB, 'Todos', id), {
      status: status === 'due' ? 'done' : 'due',
    });
  };

  const deleteTodo = async (id) => {
    await deleteDoc(doc(FIREBASE_DB, 'Todos', id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.todoItem}>
      <Text style={
        [styles.todoTitle, item.status === 'done' && styles.completedText]}>
        {item.title} - {item.status}
      </Text>
      <View style={styles.actions}>
      <TouchableOpacity onPress={() => updateTodoStatus(item.id, item.status)}>
        <MaterialIcons
          name={item.status === 'due' ? 'check-box-outline-blank' : 'check-box'}
          size={24}
          color={item.status === 'done' ? '#4CAF50' : '#ccc'}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteTodo(item.id)}>
        <MaterialIcons name="delete" size={24} color="#f44336" />
      </TouchableOpacity>
      </View>
      
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Add a task..."
        onChangeText={setTitle}
        value={title}
      />
      <TouchableOpacity
        style={styles.addButton}
        disabled={!title.trim()}
        onPress={addTodo}
      >
        <Text style={styles.addButtonText}>ADD TASK</Text>
      </TouchableOpacity>
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
  },
  textInput: {
    fontSize: 22,
    marginBottom: 20,
    padding: 8,
    backgroundColor: '#eee',
  },
  addButton: {
    padding: 10,
    marginBottom: 20,
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#ff6542'
  },
  addButtonText: {
    fontSize: 16,
    color: '#fff',

  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  todoTitle: {
    fontSize: 16,
  },
  completedText: {
    color: '#aaa',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});

export default App;
