import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, CheckBox, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function HomeScreen() {
    const [days, setDays] = useState([
        { id: '1', day: 'Segunda-feira', done: false },
        { id: '2', day: 'Terça-feira', done: false },
        { id: '3', day: 'Quarta-feira', done: false }
    ]);
    const [newDay, setNewDay] = useState('');

    // Carregar os dias da checklist salvos
    useEffect(() => {
        const loadDays = async () => {
            const storedDays = await AsyncStorage.getItem('days');
            if (storedDays) {
                setDays(JSON.parse(storedDays));
            }
        };
        loadDays();
    }, []);

    // Salvar os dias da checklist
    useEffect(() => {
        const saveDays = async () => {
            await AsyncStorage.setItem('days', JSON.stringify(days));
        };
        saveDays();
    }, [days]);

    // Alternar status de feito/não feito
    const toggleDone = (id) => {
        setDays(days.map(day =>
            day.id === id ? { ...day, done: !day.done } : day
        ));
    };

    // Adicionar um novo dia à lista
    const addDay = () => {
        if (newDay.trim() !== '') {
            const newId = (days.length + 1).toString();
            const newEntry = { id: newId, day: newDay, done: false };
            setDays([...days, newEntry]);
            setNewDay(''); // Limpar o campo de input
        }
    };

    // Remover dia da lista
    const removeDay = (id) => {
        setDays(days.filter(day => day.id !== id));
    };

    const renderDay = ({ item }) => (
        <View style={styles.item}>
            <CheckBox value={item.done} onValueChange={() => toggleDone(item.id)} />
            <Text style={item.done ? styles.doneText : styles.text}>{item.day}</Text>
            <TouchableOpacity onPress={() => removeDay(item.id)}>
                <Text style={styles.removeButton}>Remover</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Checklist de Treino{'\n'}(Dias da Semana)</Text>
            <FlatList
                data={days}
                renderItem={renderDay}
                keyExtractor={item => item.id}
            />
            <TextInput
                style={styles.input}
                placeholder="Adicionar novo dia"
                value={newDay}
                onChangeText={setNewDay}
            />
            <Button title="Adicionar Dia" onPress={addDay} color="#20c997" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    text: {
        fontSize: 18,
        marginLeft: 10,
    },
    doneText: {
        fontSize: 18,
        marginLeft: 10,
        textDecorationLine: 'line-through',
        color: 'gray',
    },
    removeButton: {
        color: 'red',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingLeft: 8,
    },
});

export default HomeScreen;
