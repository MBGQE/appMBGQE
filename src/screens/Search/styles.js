import React from 'react';
import styled from 'styled-components/native';
import Colors from '../../assets/Themes/Colors';

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${ Colors.primary };
`;

export const SearchArea = styled.View`
    background-color: ${ Colors.secundary };
    height: 40px;
    border-radius: 20px;
    flex-direction: row;
    align-items: center;
    padding-left: 10px;
    padding-right: 10px;
    margin-top: 30px;
    margin-right: 10px;
    margin-left: 45px;
`;

export const SearchAreaText = styled.TextInput`
    flex: 1;
    font-size: 16px;
    color: #FFF;
`;

export const Scroller = styled.ScrollView`
    flex: 1;
    background-color: ${ Colors.primary }; 
`;

export const ListArea = styled.View`
    margin-bottom: 30px;
    padding: 20px;
`;

export const BackButton = styled.TouchableOpacity`
    position: absolute;
    left: 0;
    top: 25px;
    z-index: 0;
`;

export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 30px;
    margin-bottom: 30px;
`;