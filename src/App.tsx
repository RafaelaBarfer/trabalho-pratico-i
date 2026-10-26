import { useState } from 'react';
import {
    FlatList,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { TaskForm } from './src/components/TaskForm';
import { TaskItem } from './src/components/TaskItem';
import { PriorityLevel, Task } from './src/types/task';

export default function App() {
  // Estado principal em memória
  const [tasks, setTasks] = useState<Task[]>([]);

  // 1. Cadastrar novo registro
  const handleAddTask = (title: string, description: string, priority: PriorityLevel) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      priority,
      completed: false,
    };

    setTasks((currentTasks) => [newTask, ...currentTasks]);
  };

  // 2. Alternar status (concluído / pendente)
  const handleToggleTaskStatus = (id: string) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // 3. Excluir registro
  const handleDeleteTask = (id: string) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F6F8" />
      <View style={styles.container}>
        {/* Título e Identificação do Aplicativo */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>TaskFlow</Text>
          <Text style={styles.headerSubtitle}>
            Gerenciador de Tarefas • Trabalho Prático I
          </Text>
        </View>

        {/* Lista Dinâmica com Cabeçalho */}
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <>
              <TaskForm onAddTask={handleAddTask} />
              <Text style={styles.listSectionTitle}>
                Minhas Tarefas ({tasks.length})
              </Text>
            </>
          }
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              onToggleStatus={handleToggleTaskStatus}
              onDelete={handleDeleteTask}
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Nenhuma tarefa cadastrada ainda.</Text>
            </View>
          }
          contentContainerStyle={styles.listContent}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F6F8',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },
  listSectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginVertical: 10,
  },
  listContent: {
    paddingBottom: 24,
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    color: '#94A3B8',
    fontSize: 14,
  },
});