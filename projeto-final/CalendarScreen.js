import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configurar o calendário para exibir em português
LocaleConfig.locales['pt-br'] = {
    monthNames: [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ],
    monthNamesShort: [
        'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 
        'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ],
    dayNames: [
        'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'
    ],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    today: 'Hoje'
};
LocaleConfig.defaultLocale = 'pt-br';

function CalendarScreen() {
    const [markedDates, setMarkedDates] = useState({});

    useEffect(() => {
        const loadMarkedDates = async () => {
            const storedDates = await AsyncStorage.getItem('markedDates');
            if (storedDates) {
                setMarkedDates(JSON.parse(storedDates));
            }
        };
        loadMarkedDates();
    }, []);

    const handleDayPress = async (day) => {
        const newMarkedDates = { ...markedDates };
        if (newMarkedDates[day.dateString]) {
            delete newMarkedDates[day.dateString]; // Remove o dia marcado se já estiver marcado
        } else {
            newMarkedDates[day.dateString] = { selected: true, marked: true, selectedColor: '#20c997' };
        }
        setMarkedDates(newMarkedDates);
        await AsyncStorage.setItem('markedDates', JSON.stringify(newMarkedDates));
        Alert.alert('Atualizado', `Dia ${day.dateString} ${newMarkedDates[day.dateString] ? 'marcado' : 'desmarcado'}`);
    };

    return (
        <View style={styles.container}>
            <Calendar
                markedDates={markedDates}
                onDayPress={handleDayPress}
                theme={{
                    selectedDayBackgroundColor: '#20c997',
                    todayTextColor: '#20c997',
                    arrowColor: '#20c997',
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
});

export default CalendarScreen;
