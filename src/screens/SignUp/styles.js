import React from 'react';
import styled from 'styled-components/native';
import Colors from '../../assets/Themes/Colors';

export const Container = styled.SafeAreaView`
    background-color: ${ Colors.primary };
    flex: 1;
`;

export const HeaderArea = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 33px;
    margin-left: 50px;
`;

export const HeaderTitle = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: #FFF;
`;

export const BackButton = styled.TouchableOpacity`
    position: absolute;
    left: 0;
    top: 25px;
    z-index: 0;
`

export const Scroller = styled.ScrollView`
    flex: 1;
    background-color: ${ Colors.primary };
`;

export const InputArea = styled.View`
    width: 100%;
    padding: 40px;
`;

export const TextRequeseted = styled.Text`
    font-size: 18px;
    color: ${ Colors.textError };
    margin-bottom: 30px;
`;

export const CustomButton = styled.TouchableOpacity`
    height: 60px;
    background-color: ${ Colors.secundary };
    border-radius: 30px;
    justify-content: center;
    align-items: center;
`;

export const CustomButtonText = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #FFF;
`;

export const SignMessageButton = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
`;

export const SignMessageButtonText = styled.Text`
    font-size: 16px;
    color: #FFF;
`;

export const SignMessageButtonTextBold = styled.Text`
    font-size: 16px;
    color: #FFF;
    font-weight: bold;
    margin-left: 5px;
`;