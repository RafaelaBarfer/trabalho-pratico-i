import React, { useState } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { PriorityLevel } from '../types/task';

interface TaskFormProps {
  onAddTask: (title: string, description: string, priority: PriorityLevel) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<PriorityLevel>('Baixa');

  const handleRegister = () => {
    // Validação de campos obrigatórios
    if (!title.trim() || !description.trim()) {
      Alert.alert('Erro de validação', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    onAddTask(title.trim(), description.trim(), priority);

    // Limpar formulário após inserção
    setTitle('');
    setDescription('');
    setPriority('Baixa');
  };

  return (
    <View style={styles.card}>
      <Text style={styles.label}>Título da Tarefa *</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Estudar Banco de Dados"
        placeholderTextColor="#888"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Descrição *</Text>
      <TextInput
        style={[styles.input, styles.multilineInput]}
        placeholder="Ex: Resolver exercícios da lista 2"
        placeholderTextColor="#888"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={3}
      />

      <Text style={styles.label}>Prioridade</Text>
      <View style={styles.priorityContainer}>
        {(['Baixa', 'Média', 'Alta'] as PriorityLevel[]).map((level) => (
          <TouchableOpacity
            key={level}
            style={[
              styles.priorityButton,
              priority === level && styles.priorityButtonActive
            ]}
            onPress={() => setPriority(level)}
          >
            <Text
              style={[
                styles.priorityText,
                priority === level && styles.priorityTextActive
              ]}
            >
              {level}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleRegister}>
        <Text style={styles.submitButtonText}>Cadastrar Tarefa</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 6,
    padding: 10,
    fontSize: 14,
    marginBottom: 12,
    color: '#1A1A1A',
  },
  multilineInput: {
    height: 70,
    textAlignVertical: 'top',
  },
  priorityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  priorityButton: {
    flex: 1,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#999999',
    alignItems: 'center',
  },
  priorityButtonActive: {
    backgroundColor: '#0056B3',
    borderColor: '#0056B3',
  },
  priorityText: {
    fontSize: 13,
    color: '#555555',
    fontWeight: '500',
  },
  priorityTextActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});