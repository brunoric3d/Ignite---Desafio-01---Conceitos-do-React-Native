import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';


export function Home() {

  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const duplicateTask = tasks.find(task => task.title === newTaskTitle);

    if(duplicateTask){
      return Alert.alert("Task já cadastrada","Você não pode cadastrar uma task com o mesmo nome")
    }

    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }
    setTasks(oldTasks => [...oldTasks, newTask])
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({...task}))
    
    const task = updatedTasks.find(task => task.id === id)

    if(!task){
      return
    }
    task.done = !task.done;

    setTasks(updatedTasks)
  }

  function handleEditTask(taskId: number, taskNewTitle: string){
    const updatedTasks = tasks.map(task => ({...task}))
    
    const task = updatedTasks.find(task => task.id === taskId)

    if(!task){
      return
    }
    task.title = taskNewTitle;

    setTasks(updatedTasks)
  }
  

  function handleRemoveTask(id: number) {
    // Alert.alert('Remover item', 'Tem certeza que você deseja remover esse item?',
    //   [
    //     {
    //       text: "Não",
    //       onPress:()=> console.log()
    //     },
       
    //     {
    //       text: "Sim",
    //       onPress:()=> setTasks(oldTasks => oldTasks.filter(task => task.id !== id))
    //     }
    // ])
    
    setTasks(oldTasks => oldTasks.filter(task => task.id !== id))
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        //editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})