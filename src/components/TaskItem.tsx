import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Task } from '../types/task';

interface TaskItemProps {
  task: Task;
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleStatus,
  onDelete,
}) => {
  const getBadgeColor = () => {
    switch (task.priority) {
      case 'Alta':
        return '#D9534F';
      case 'Média':
        return '#F0AD4E';
      case 'Baixa':
      default:
        return '#5CB85C';
    }
  };

  return (
    <View style={[styles.container, task.completed && styles.containerCompleted]}>
      <View style={styles.infoArea}>
        <View style={styles.headerRow}>
          <Text
            style={[
              styles.title,
              task.completed && styles.textCompleted
            ]}
          >
            {task.title}
          </Text>
          <View style={[styles.badge, { backgroundColor: getBadgeColor() }]}>
            <Text style={styles.badgeText}>{task.priority}</Text>
          </View>
        </View>

        <Text
          style={[
            styles.description,
            task.completed && styles.textCompleted
          ]}
        >
          {task.description}
        </Text>

        <Text style={styles.statusText}>
          Status: <Text style={styles.statusHighlight}>{task.completed ? 'Concluída' : 'Pendente'}</Text>
        </Text>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={[styles.actionButton, styles.toggleButton]}
          onPress={() => onToggleStatus(task.id)}
        >
          <Text style={styles.actionButtonText}>
            {task.completed ? 'Reabrir' : 'Concluir'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => onDelete(task.id)}
        >
          <Text style={styles.actionButtonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#007AFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  containerCompleted: {
    borderLeftColor: '#6C757D',
    backgroundColor: '#F8F9FA',
    opacity: 0.8,
  },
  infoArea: {
    marginBottom: 10,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212529',
    flex: 1,
    marginRight: 8,
  },
  description: {
    fontSize: 14,
    color: '#495057',
    marginVertical: 4,
  },
  textCompleted: {
    textDecorationLine: 'line-through',
    color: '#868E96',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  statusText: {
    fontSize: 12,
    color: '#6C757D',
    marginTop: 4,
  },
  statusHighlight: {
    fontWeight: '600',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingTop: 8,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginLeft: 8,
  },
  toggleButton: {
    backgroundColor: '#28A745',
  },
  deleteButton: {
    backgroundColor: '#DC3545',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});