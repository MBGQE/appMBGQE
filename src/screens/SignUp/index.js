import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';

import { 
    Container,

    BackButton,

    HeaderArea,
    HeaderTitle,

    Scroller,
    
    InputArea,
    TextRequeseted,
    
    CustomButton,
    CustomButtonText,

    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold
} from './styles';

import InputText from '../../components/InputText';
import InputNumber from '../../components/InputNumber';
import EmailIcon from '../../assets/Images/email.svg';
import LockIcon from '../../assets/Images/lock.svg';
import PhoneIcon from '../../assets/Images/phone.svg';
import PersonIcon from '../../assets/Images/person.svg';
import BackIcon from '../../assets/Images/back.svg';

import { UserContext } from '../../context/UserContext';

import Api from '../../Api';
import AlertCustom from '../../components/AlertCustom';

import { phoneMask } from '../../Mask';

export default () => {

    const navigation = useNavigation();

    const [nameField, setNameField] = useState('');
    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [phoneField1, setPhoneField1] = useState('');
    const [phoneField2, setPhoneField2] = useState('');
    
    const { dispatch: userDispatch } = useContext(UserContext);

    const regex = /^(?=(?:.*?[A-Z]){1})(?=(?:.*?[0-9]){2})(?=(?:.*?[!@#$%*()_+^&}{:;?.]){1})(?!.*\s)[0-9a-zA-Z!@#$%;*(){}_+^&]*$/; 

    const [alertFields, setAlertFields] = useState(false);
    const [alertPassword1, setAlertPassword1] = useState(false);
    const [alertPassword2, setAlertPassword2] = useState(false);
    const [alertPassword3, setAlertPassword3] = useState(false);
    const [alertEmailUse, setAlertEmailUse] = useState(false);
    const [alertInvalidEmail, setAlertInvalidEmail] = useState(false);
    const [alertWeakPass, SetAlertWeakPass] = useState(false);


    const handleSingUpClick = async () => {
        if(nameField != '' && emailField != '' && passwordField != '' && phoneField1 != '' && passwordConfirm != '')
        {
            if(passwordField.length < 6 && passwordConfirm < 6)
            {
                setAlertPassword1(true);
            }
            else if(!regex.exec(passwordField) && (!regex.exec(passwordConfirm)))
            {
                setAlertPassword2(true);
            }
            else if(passwordConfirm != passwordField)
            {
                setAlertPassword3(true);
            }
            else
            {
                let result = await Api.SignUp(nameField, emailField, passwordField, phoneField1, phoneField2);
                if(result.code == "auth/email-already-in-use")
                {
                    
                }
                else if(result.code == "auth/invalid-email")
                {

                }
                else if(result.code == "auth/weak-password")
                {
                    
                }
                else
                {
                    userDispatch({
                        type: 'setId',
                        payload: {
                            id: result
                        }
                    });
                    await Api.setTokenMessage(result);
                    navigation.reset({
                        routes: [{name: 'MainTab'}]
                    });
                }
            }
        }
        else
        {
            setAlertFields(true);
        }  
    }

    const handleMessageButtonClick = () => {
        navigation.reset({
            routes: [{name: 'SignIn'}]
        });
    }

    const handleBackButton = () => {
        navigation.goBack();
    }

    return(
        <Container>

            <BackButton onPress = { handleBackButton } >
                <BackIcon width = "44" height = "44" fill = "#FFF" />
            </BackButton>

            <HeaderArea>
                <HeaderTitle>Cadastro</HeaderTitle>
            </HeaderArea>
            <Scroller>
                <InputArea>
                    <InputText
                        IconSvg = { PersonIcon }
                        placeholder = "Digite seu nome"
                        value = { nameField }
                        onChangeText = { t => setNameField(t) }
                        requesited = { true }
                    />

                    <InputText
                        IconSvg = { EmailIcon }
                        placeholder = "Digite seu e-mail"
                        value = { emailField }
                        onChangeText = { t => setEmailField(t) }
                        requesited = { true }
                    />

                    <InputText 
                        IconSvg = { LockIcon }
                        placeholder = "Digite sua senha"
                        value = { passwordField }
                        onChangeText = { t => setPasswordField(t) }
                        password = { true }
                        requesited = { true }
                    />

                    <InputText 
                        IconSvg = { LockIcon }
                        placeholder = "Confirmar senha"
                        value = { passwordConfirm }
                        onChangeText = { t => setPasswordConfirm(t) }
                        password = { true }
                        requesited = { true }
                    />

                    <InputNumber 
                        IconSvg = { PhoneIcon }
                        placeholder = "Número do celular (1)"
                        value = { phoneMask(phoneField1) }
                        onChangeText = { t => setPhoneField1(t) }
                        maxLength = { 14 }
                        minLength = { 14 }
                        requesited = { true }
                    />

                    <InputNumber 
                        IconSvg = { PhoneIcon }
                        placeholder = "Número do celular (2)"
                        value = { phoneMask(phoneField2) }
                        onChangeText = { t => setPhoneField2(t) }
                        maxLength = { 14 }
                        minLength = { 14 }
                    />

                    <TextRequeseted>{ "* Estes campos são obrigatórios!" }</TextRequeseted>
                    
                    <CustomButton onPress = { handleSingUpClick } >
                        <CustomButtonText>CADASTRAR</CustomButtonText>
                    </CustomButton>
                </InputArea>

                <SignMessageButton onPress = { handleMessageButtonClick } >
                    <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
                    <SignMessageButtonTextBold>Faça Login</SignMessageButtonTextBold>
                </SignMessageButton>

                <AlertCustom
                    showAlert = { alertFields }
                    setShowAlert = { setAlertFields } 
                    alertTitle = { "Erro no Cadastro" }
                    alertMessage = { "Preencha todos os campos!" }
                    diplayNegativeButton = { true }
                    negativeText = { "OK" }
                />

                <AlertCustom
                    showAlert = { alertPassword1 }
                    setShowAlert = { setAlertPassword1 } 
                    alertTitle = { "Erro na Senha" }
                    alertMessage = { "A senha precisa ter no mínimo 6 caracteres!" }
                    diplayNegativeButton = { true }
                    negativeText = { "OK" }
                />

                <AlertCustom
                    showAlert = { alertPassword2 }
                    setShowAlert = { setAlertPassword2 } 
                    alertTitle = { "Erro na Senha" }
                    alertMessage = { "A senha deve conter no mínimo 1 caratere em maiúsculo, 2 números e 1 catectere especial!" }
                    diplayNegativeButton = { true }
                    negativeText = { "OK" }
                />

                <AlertCustom
                    showAlert = { alertPassword3 }
                    setShowAlert = { setAlertPassword3 } 
                    alertTitle = { "Erro na Senha" }
                    alertMessage = { "As senhas não são iguais!" }
                    diplayNegativeButton = { true }
                    negativeText = { "OK" }
                />

            </Scroller>
        </Container>
    );
}