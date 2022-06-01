import React from "react";
import { FlatList } from "react-native";
import { EditTaskArgs } from "../pages/Home";

import { ItemWrapper } from "./ItemWrapper";
import { TaskItem } from "./TaskItem";

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TasksListProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: ({ newTask, taskId }: EditTaskArgs) => void;
}

export function TasksList({
  tasks,
  toggleTaskDone,
  removeTask,
  editTask,
}: TasksListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <ItemWrapper index={index}>
            <TaskItem
              tasks={item}
              editTask={editTask}
              toggleTaskDone={toggleTaskDone}
              removeTask={removeTask}
              index={index}
              key={item.id}
            />
          </ItemWrapper>
        );
      }}
      style={{
        marginTop: 32,
      }}
    />
  );
}
