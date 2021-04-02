import React from 'react';
import styled from 'styled-components/native';
import Colors from '../../assets/Themes/Colors';

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${ Colors.primary };
`;

export const BackButton = styled.TouchableOpacity`
    position: absolute;
    left: 0;
    top: 25px;
    z-index: 0;
`;

export const HeaderArea = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 33px;
    margin-left: 50px;
    margin-bottom: 10px;
`;

export const HeaderTitle = styled.Text`
    width: 150px;
    font-size: 20px;
    font-weight: bold;
    color: #FFF;
`;

export const Scroller = styled.ScrollView`
    flex: 1;   
    background-color: ${ Colors.primary };
`;

export const ListArea = styled.View`
    margin-bottom 30px;
    padding: 20px;
`;

export const NotifyItem = styled.View`
    background-color: #FFF;
    border-radius: 10px;
    align-items: flex-start;
    margin-bottom: 15px;
`;

export const NotifyTitle = styled.Text`
    margin-left: 10px;
    margin-top: 5px;
    margin-bottom: 5px;
    font-size: 20px;
    font-weight: bold;
`;

export const NotifyBody = styled.Text`
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 5px;
    margin-bottom: 10px;
    font-size: 16px;
`;

export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 30px;
    margin-bottom: 30px
`;
