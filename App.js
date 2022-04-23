import { StatusBar } from 'expo-status-bar';
import React from 'react';
import  {useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput,Keyboard,ScrollView ,TouchableOpacity} from 'react-native';
import Task from './components/Task';

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    let itmLength=task.trim().length;
    if (itmLength==0){
      return({});
    }
    setTaskItems([...taskItems, task])
    setTask(null);
   
    
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy)
  }

  return (
    
    <View style={styles.container}>
     <Text style={styles.sectionTitle}>Today's Tasks</Text>
      <StatusBar style="auto" />
      <ScrollView style={styles.scroll}
        contentContainerStyle={{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps='handled'>


      {/* Today's Tasks */}
      <View style={styles.tasksWrapper}>
        <View style={styles.items}>
          {/* This is where the tasks will go! */}
          {
            taskItems.map((item, index) => {
              return (
                <TouchableOpacity key={index}  onPress={() => completeTask(index)}>
                <Task text={item} /> 
              </TouchableOpacity>
                 
              )
            })
          }
        </View>
      </View>

     
      </ScrollView>
      {/* Write a task */}
      {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen */}
      <KeyboardAvoidingView style={styles.writeTaskWrapper}>
        <TextInput style={styles.input} placeholder={'Write a task here'} value={task} onChangeText={text => setTask(text)} />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faebd7',
    
  },
  scroll:{
    maxHeight:'65%',
  },
  tasksWrapper: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    alignItems:'center',
    marginLeft:30,
    marginTop:60
    
  },
  items: {
    

  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#f2f3f4',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {
    fontSize:40
  },
});