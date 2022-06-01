import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export type EditTaskArgs = {
  taskId: number;
  newTask: string;
};

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskAlreadyExists = tasks.find((task) => task.title === newTaskTitle);

    if (taskAlreadyExists) {
      return Alert.alert(
        "Task already exists",
        "Please enter a different task"
      );
    }
    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    setTasks((oldState) => [...oldState, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    setTasks((oldState) =>
      oldState.map((task) => {
        if (task.id === id) {
          return { ...task, done: !task.done };
        }

        return task;
      })
    );
  }

  function handleRemoveTask(id: number) {
    Alert.alert("Remove item", "Are you sure you want to remove item", [
      {
        style: "cancel",
        text: "Cancel",
      },
      {
        style: "destructive",
        text: "Remove",
        onPress: () => {
          setTasks((oldState) => oldState.filter((task) => task.id !== id));
        },
      },
    ]);
  }

  function handleEditTask({ newTask, taskId }: EditTaskArgs) {
    setTasks((oldState) =>
      oldState.map((task) => {
        if (task.id === taskId) {
          return { ...task, title: newTask };
        }

        return task;
      })
    );
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
