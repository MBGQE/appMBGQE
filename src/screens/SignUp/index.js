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
    const { dispatch: userDispatch } = useContext(UserContext);

    const navigation = useNavigation();

    const [nameField, setNameField] = useState('');
    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [phoneField1, setPhoneField1] = useState('');
    const [phoneField2, setPhoneField2] = useState('');

    const [alertTitle, setAlertTitle] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [alertVisible, setAlertVisible] = useState(false);
    
    const setAlert = (visible = false, title = "", message = "") => {
        setAlertTitle(title);
        setAlertMessage(message);
        setAlertVisible(visible);
    }

    const regex = /^(?=(?:.*?[A-Z]){1})(?=(?:.*?[0-9]){2})(?=(?:.*?[!@#$%*()_+^&}{:;?.]){1})(?!.*\s)[0-9a-zA-Z!@#$%;*(){}_+^&]*$/; 

    const handleSingUpClick = async () => {
        if(nameField != '' && emailField != '' && passwordField != '' && phoneField1 != '' && passwordConfirm != '')
        {
            if(passwordField.length < 6 && passwordConfirm < 6)
            {
                setAlert(true, "Erro no cadastro:", "A senha precisa ter no mínimo 6 caracteres!");
            }
            else if(!regex.exec(passwordField) && (!regex.exec(passwordConfirm)))
            {
                setAlert(true, "Erro no cadastro:", "A senha deve conter 1 caratere em maiúsculo e 1 catectere especial!");
            }
            else if(passwordConfirm != passwordField)
            {
                setAlert(true, "Erro no cadastro:", "As senhas não são iguais!");
            }
            else
            {
                if(phoneField1.length == 14 || phoneField2.length == 14)
                {
                    let result = await Api.SignUp(nameField, emailField, passwordField, phoneField1, phoneField2)
                    console.log("Result: ", result);
                    if(result.code == "auth/email-already-in-use")
                    {
                        setAlert(true, "Erro no cadastro:", "E-mail já está em uso!");
                    }
                    else if(result.code == "auth/invalid-email")
                    {
                        setAlert(true, "Erro no cadastro:", "E-mail inválido!");
                    }
                    else if(result.code == "auth/weak-password")
                    {
                        setAlert(true, "Erro no cadastro:", "A senha é muito fraca");
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
                else
                {
                    setAlert(true, "Erro no cadastro:", "O tamanho do telefone não está correto!");
                }                
            }
        }
        else
        {
            setAlert(true, "Erro no cadastro:", "Preencha todos os campos!");
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
                    showAlert = { alertVisible }
                    setShowAlert = { setAlertVisible } 
                    alertTitle = { alertTitle }
                    alertMessage = { alertMessage }
                    displayNegativeButton = { true }
                    negativeText = { "OK" }
                />

            </Scroller>
        </Container>
    );
}