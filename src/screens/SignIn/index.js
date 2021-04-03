import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../context/UserContext';

import { 
    Container,
    InputArea,
    CustomButton,
    CustomButtonText,
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold
} from './styles';

import InputText from '../../components/InputText';
import FootLogo from '../../assets/Images/football.svg';
import EmailIcon from '../../assets/Images/email.svg';
import LockIcon from '../../assets/Images/lock.svg';

import Api from '../../Api';
import AlertCustom from '../../components/AlertCustom';

export default () => {

    const navigation = useNavigation();
    const { dispatch: userDispatch } = useContext(UserContext);

    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');

    const [alertTitle, setAlertTitle] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [alertVisible, setAlertVisible] = useState(false);

    const setAlert = (visible = false, title = "", message = "") => {
        setAlertTitle(title);
        setAlertMessage(message);
        setAlertVisible(visible);
    }
    
    const handleSignInClick = async () => {
        if(emailField != '' && passwordField != '')
        {
            let result = await Api.SignIn(emailField, passwordField);
            
            if(result.code == "auth/user-not-found")
            {
                setAlert(true, "Erro ao entrar:", "Usuário não encontrado!");
            }
            else if(result.code == "auth/wrong-password")
            {
                setAlert(true, "Erro ao entrar:", "A senha informada está errada!");
            }
            else if(result.code == "auth/invalid-email")
            {
                setAlert(true, "Erro ao entrar:", "E-mail inválido!");
            }
            else
            {
                userDispatch({
                    type: 'setId',
                    payload: {
                        id: result
                    }
                });
                navigation.reset({
                   routes: [{name: 'MainTab'}]
                });
            }
                                      
        }
        else
        {
            setAlert(true, "Erro ao entrar:", "Preencha todos os campos!");
        }
    }
        
    const handleMessageButtonClick = () => {
        navigation.navigate('SignUp');
    }

    return(
        <Container>
            <FootLogo width = "100%" height = "160" />

            <InputArea>
                <InputText
                    IconSvg = { EmailIcon }
                    placeholder = "Digite seu e-mail"
                    value = { emailField }
                    onChangeText = { t => setEmailField(t) }
                />

                <InputText
                    IconSvg = { LockIcon }
                    placeholder = "Digite sua senha"
                    value = { passwordField }
                    onChangeText = { t => setPasswordField(t) }
                    password
                />
                
                <CustomButton onPress = { handleSignInClick } >
                    <CustomButtonText>LOGIN</CustomButtonText>
                </CustomButton>
            </InputArea>

            <SignMessageButton onPress = { handleMessageButtonClick } >
                <SignMessageButtonText>Ainda não possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
            </SignMessageButton>

            <AlertCustom
                showAlert = { alertVisible }
                setShowAlert = { setAlertVisible } 
                alertTitle = { alertTitle }
                alertMessage = { alertMessage }
                displayNegativeButton = { true }
                negativeText = { "OK" }
            />

        </Container>
    );
}

