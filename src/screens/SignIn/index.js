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

    const [alertFields, setAlertFields] = useState(false);
    const [alertUserNot, setAlertUserNot] = useState(false);
    const [alertWrongPass, setAlertWrongPass] = useState(false);
    
    const handleSignInClick = async () => {
        if(emailField != '' && passwordField != '')
        {
            let result = await Api.SignIn(emailField, passwordField);
            
            if(result.code == "auth/user-not-found")
            {
                setAlertUserNot(true);
            }
            else if(result.code == "auth/wrong-password")
            {
                setAlertWrongPass(true);
            }
            else
            {
                userDispatch({
                    type: 'setId',
                    payload: {
                        id: result.user.uid 
                    }
                });
                navigation.reset({
                   routes: [{name: 'MainTab'}]
                });
            }
                                      
        }
        else
        {
            setAlertFields(true);
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
                    password = { true }
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
                showAlert = { alertFields }
                setShowAlert = { setAlertFields } 
                alertTitle = { "Erro no Login" }
                alertMessage = { "Preencha todos os campos!" }
                diplayNegativeButton = { true }
                negativeText = { "OK" }
            />

            <AlertCustom
                showAlert = { alertUserNot }
                setShowAlert = { setAlertUserNot } 
                alertTitle = { "Erro no Login" }
                alertMessage = { "E-mail errado e/ou conta não cadastrada!" }
                diplayNegativeButton = { true }
                negativeText = { "OK" }
            />

            <AlertCustom
                showAlert = { alertWrongPass }
                setShowAlert = { setAlertWrongPass } 
                alertTitle = { "Erro no Login" }
                alertMessage = { "Senha Inválida!" }
                diplayNegativeButton = { true }
                negativeText = { "OK" }
            />

        </Container>
    );
}

