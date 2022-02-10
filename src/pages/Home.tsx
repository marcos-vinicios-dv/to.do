import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export interface EditTaskArgs {
  id: number;
  newTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newTask: Task = {
      title: newTaskTitle,
      done: false,
      id: new Date().getTime(),
    };

    setTasks((oldState) => {
      const taskAlreadyExists = oldState.find(
        (task) => task.title === newTaskTitle
      );

      if (taskAlreadyExists) {
        Alert.alert(
          "Task já cadastrada",
          "Você não pode cadastrar uma task com o mesmo nome"
        );
        return oldState;
      }

      return [...oldState, newTask];
    });
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          done: !task.done,
        };
      }

      return task;
    });

    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
        },
        {
          text: "Sim",
          onPress: () => {
            setTasks((oldState) => oldState.filter((task) => task.id !== id));
          },
        },
      ]
    );
  }

  function handleEditTask({ id, newTitle }: EditTaskArgs) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          title: newTitle,
        };
      }

      return task;
    });

    setTasks(updatedTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
