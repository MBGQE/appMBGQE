import React, { useState } from 'react';

import styled from 'styled-components/native';

import InputNumber from './InputNumber';

import PhoneIcon from '../assets/Images/phone.svg';
import BackIcon from '../assets/Images/back.svg';

import Api from '../Api';
import { phoneMask } from '../Mask';

import Colors from '../assets/Themes/Colors';

import AlertCustom from '../components/AlertCustom';

export default ({ show, setShow, user }) => {

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

    const handleCloseButtonClick = () => {
        setShow(false);
    }

    const handlePhoneUpdateClick = async () => {
        if(phoneField1 != '' && phoneField1.length === 14)
        {
            let result = await Api.updatePhone(user, phoneField1, phoneField2);
            if(result)
            {
                setAlert(true, "Aviso:", "Telefone alterado com sucesso!");
            }
        }
        else if(phoneField2 != '' && phoneField2.length === 14)
        {
            let result = await Api.updatePhone(user, userInfo.celular1, phoneField2);
            if(result)
            {
                setAlert(true, "Aviso:", "Telefone alterado com sucesso!");
            }            
        }
        else if((phoneField1 != '' && phoneField1.length === 14) && (phoneField2 != '' && phoneField1.length === 14))
        {
            let result = await Api.updatePhone(user, phoneField1, phoneField2);
            if(result)
            {
                setAlert(true, "Aviso:", "Telefone alterado com sucesso!");
            }              
        }
        else
        {
            setAlert(true, "Erro ao alterar o telefone:", "Preencha o/os campo(s) corretamente!");
        }
    }

    return (
        <Modal
            transparent = { true }
            visible = { show }
            animationType = "fade"
        >
            <ModalArea>
                <UpPhoneHeader>
                    <UpPhoneTitle>Atualizar Telefone</UpPhoneTitle>
                </UpPhoneHeader>

                <InfoArea>
                    <InputArea>
                        <InputNumber 
                            IconSvg = { PhoneIcon }
                            placeholder = "Número do celular (1)"
                            value = { phoneMask(phoneField1) }
                            onChangeText = { t => setPhoneField1(t) }
                            maxLength = { 14 }
                            minLength = { 14 }
                        />

                        <InputNumber 
                            IconSvg = { PhoneIcon }
                            placeholder = "Número do celular (2)"
                            value = { phoneMask(phoneField2) }
                            onChangeText = { t => setPhoneField2(t) }
                            maxLength = { 14 }
                            minLength = { 14 }
                        />

                        <CustomButton onPress = { handlePhoneUpdateClick } >
                            <CustomButtonText>Atualizar Telefone</CustomButtonText>
                        </CustomButton>

                    </InputArea>
                </InfoArea> 

                <CloseButton onPress = { handleCloseButtonClick } >
                    <BackIcon width = "40" height = "40" fill = "#FFF" />
                </CloseButton>

            </ModalArea>

            <AlertCustom
                showAlert = { alertVisible }
                setShowAlert = { setAlertVisible } 
                alertTitle = { alertTitle }
                alertMessage = { alertMessage }
                displayNegativeButton = { true }
                negativeText = { "OK" }
            />

        </Modal>
    );
}

const Modal = styled.Modal``;

const ModalArea = styled.View`
    flex: 1;
    background-color: ${ Colors.primary };
`;

export const UpPhoneHeader = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 33px;
    margin-left: 50px;
    margin-bottom: 50px;
`;

export const UpPhoneTitle = styled.Text`
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