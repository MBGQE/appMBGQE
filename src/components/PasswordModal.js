import React, { useState } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';

import InputText from './InputText';

import BackIcon from '../assets/Images/back.svg';
import LockIcon from '../assets/Images/lock.svg';

import Colors from '../assets/Themes/Colors';
import Api from '../Api';

export default ({ show, setShow, user }) => {
    
    const [newPasswordField, setNewPasswordField] = useState('');
    const [currentPasswordField, setCurrentPasswordField] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

    const regex = /^(?=(?:.*?[A-Z]){1})(?=(?:.*?[0-9]){2})(?=(?:.*?[!@#$%*()_+^&}{:;?.]){1})(?!.*\s)[0-9a-zA-Z!@#$%;*(){}_+^&]*$/; 

    const handleCloseButtonClick = () => {
        setShow(false);
    }

    const handlePasswordUpdate = async () => {
        if(newPasswordField != '' && currentPasswordField != '' && newPasswordConfirm != '')
        {
            if(newPasswordField.length < 6 && newPasswordConfirm.length < 6)
            {
                Alert.alert("A senha precisa ter no mínimo 6 caracteres");
            }
            else if(!regex.exec(newPasswordField))
            {
                Alert.alert("A senha deve conter no mínimo 1 caratere em maiúsculo, 2 números e 1 catectere especial!");
            }
            else if(!regex.exec(newPasswordConfirm))
            {
                Alert.alert("A senha deve conter no mínimo 1 caratere em maiúsculo, 2 números e 1 catectere especial!");
            }
            else if(!regex.exec(newPasswordField))
            {
                Alert.alert("A senha deve conter no mínimo 1 caratere em maiúsculo, 2 números e 1 catectere especial!");
            }
            else if(newPasswordField != newPasswordConfirm)
            {
                Alert.alert("As senhas não são iguais!");
            }
            else
            {
                let result = await Api.updatePassword(user.idJogador, newPasswordField, currentPasswordField);
                if(result)
                {
                    setShow(false);
                }
            }
        }
        else
        {
            Alert.alert("Preencha a senha!");
        }
    }

    return(
        <Modal
            visible = { show }
            animationType = 'slide'
        >
            <ModalArea>
                <HeaderArea>
                    <HeaderTitle>Atualizar Senha</HeaderTitle>
                </HeaderArea>

                <InfoArea>
                    <InputArea>
                        <InputText
                            IconSvg = { LockIcon }
                            placeholder = "Digite sua senha atual"
                            value = { currentPasswordField }
                            onChangeText = { t => setCurrentPasswordField(t) }
                            password = { true }
                        />

                        <InputText
                            IconSvg = { LockIcon }
                            placeholder = "Digite sua nova senha"
                            value = { newPasswordField }
                            onChangeText = { t => setNewPasswordField(t) }
                            password = { true }
                        />

                        <InputText
                            IconSvg = { LockIcon }
                            placeholder = "Confirme sua nova senha"
                            value = { newPasswordConfirm }
                            onChangeText = { t => setNewPasswordConfirm(t) }
                            password = { true }
                        />

                        <CustomButton onPress = { handlePasswordUpdate } >
                            <CustomButtonText>Atualizar Senha</CustomButtonText>
                        </CustomButton>

                    </InputArea>
                </InfoArea> 

                <CloseButton onPress = { handleCloseButtonClick } >
                    <BackIcon width = "40" height = "40" fill = "#FFF" />
                </CloseButton>
            </ModalArea>

        </Modal>
    );
}

const Modal = styled.Modal``;

const ModalArea = styled.View`
    flex: 1;
    background-color: ${ Colors.primary };
`;

export const HeaderArea = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 33px;
    margin-left: 50px;
`;

export const HeaderTitle = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: #FFF;
`;

const CloseButton = styled.TouchableOpacity`
    position: absolute;
    left: 0;
    top: 25px;
    z-index: 0;
`;

const InfoArea = styled.View`
    flex: 1;
    background-color: ${ Colors.primary };
    margin-top: 25%;
`;

const InputArea = styled.View`
    width: 100%;
    background-color: ${ Colors.primary };
    padding: 40px;
    align-items: center;
    justify-content: center;
`;

const CustomButton = styled.TouchableOpacity`
    height: 60px;
    width: 100%;
    background-color: ${ Colors.secundary };
    border-radius: 30px;
    justify-content: center;
    align-items: center;
    margin-bottom: 25px;
`;

const CustomButtonText = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #FFF;
`;
