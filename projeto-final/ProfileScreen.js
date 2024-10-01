import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ProfileScreen({ navigation }) {
    const [username, setUsername] = useState('');

    useEffect(() => {
        const loadUsername = async () => {
            const user = await AsyncStorage.getItem('user');
            if (user) {
                const parsedUser = JSON.parse(user);
                setUsername(parsedUser.name);
            }
        };

        loadUsername();
    }, []);

    const handleLogout = async () => {
        await AsyncStorage.removeItem('userToken');
        navigation.replace('Login'); // Redireciona para a tela de login após logout
    };

    return (
        <View style={styles.container}>
            <View style={styles.profileBox}>
                <Text style={styles.title}>Perfil</Text>
                <Text style={styles.subtitle}>Bem-vindo, {username}</Text>

                <Button
                    mode="contained"
                    onPress={handleLogout}
                    style={styles.logoutButton}
                >
                    Logout
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#f4f4f4',
    },
    profileBox: {
        backgroundColor: '#ffffff',
        padding: 24,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5, // Sombra para Android
        marginHorizontal: 16,
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 32,
    },
    logoutButton: {
        backgroundColor: '#20c997',
    },
});

export default ProfileScreen;
