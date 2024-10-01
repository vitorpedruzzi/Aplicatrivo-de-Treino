import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logo from './Assets/logo.png'; // Certifique-se que o caminho está correto

function LoginScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async () => {
        setErrorMessage('');
        if (username.trim() === '' || password.trim() === '') {
            setErrorMessage('Por favor, insira nome de usuário e senha.');
            return;
        }

        const storedUsers = await AsyncStorage.getItem('users');
        const users = storedUsers ? JSON.parse(storedUsers) : [];
        const user = users.find(user => user.name === username && user.password === password);

        if (user) {
            const userToken = 'token123';
            await AsyncStorage.setItem('userToken', userToken);
            navigation.replace('Home');
        } else {
            setErrorMessage('Nome de usuário ou senha incorretos.');
        }
    };

    return (
        <View style={styles.container}>
            {/* Título e subtítulo acima da imagem */}
            <Text style={styles.logoTitle}>FitTrack</Text>
            <Text style={styles.logoSubtitle}>Seu companheiro de treino</Text>
            
            <Image source={logo} style={styles.logo} />

            <View style={styles.loginBox}>
                <Text style={styles.title}>Login</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nome de usuário"
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                {errorMessage ? <Text style={styles.errorBox}>{errorMessage}</Text> : null}

                <View style={styles.buttonContainer}>
                    <Button title="Entrar" onPress={handleLogin} color="#20c997" />
                </View>

                <Text style={styles.signupText} onPress={() => navigation.navigate('Signup')}>
                    Não tem uma conta? Cadastre-se
                </Text>
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
    loginBox: {
        backgroundColor: '#ffffff',
        padding: 24,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        marginHorizontal: 16,
        marginBottom: 16,
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginBottom: 10, // Espaçamento entre o logo e o bloco branco
    },
    logoTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
        marginBottom: 4,
    },
    logoSubtitle: {
        fontSize: 14,
        textAlign: 'center',
        color: '#666',
        marginBottom: 10, // Espaço abaixo do subtítulo
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
    errorBox: {
        backgroundColor: '#f8d7da',
        color: '#721c24',
        padding: 10,
        borderRadius: 5,
        marginBottom: 12,
        textAlign: 'center',
    },
    buttonContainer: {
        marginBottom: 8,
    },
    signupText: {
        textAlign: 'center',
        color: '#20c997',
        marginTop: 16,
        textDecorationLine: 'underline',
    },
});

export default LoginScreen;
