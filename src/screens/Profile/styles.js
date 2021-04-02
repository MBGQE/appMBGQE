import React from 'react';
import styled from 'styled-components/native';
import Colors from '../../assets/Themes/Colors';

export const Container = styled.SafeAreaView`
    background-color: ${ Colors.primary };
    flex: 1;
`;

export const Scroller = styled.ScrollView`
    flex: 1;
    background-color: ${ Colors.primary };
`;

export const ProfileArea = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const UserInfoArea = styled.View`
    flex-direction: row;    
    margin-left: 30px;
    margin-right: 30px;
    margin-top: 30px;
    margin-bottom: 30px;
    background-color: ${ Colors.primary };
`;

export const AvatarArea = styled.View`
    border-width: 5px;
    border-color: #FFF;    
    border-radius: 20px;
`;

export const UserAvatarUpdate = styled.TouchableOpacity``;

export const UserAvatar = styled.Image`
    width: 150px;
    height: 150px;
    border-radius: 20px;
`;

export const UserInfo = styled.View`
    flex: 1;
    justify-content: flex-start;
`;

export const UserInfoName = styled.Text`
    color: #FFF;
    font-size: 20px;
    font-weight: bold;
    margin-left: 30px;
    align-items: center;
    margin-top: 15px;
`;

export const CustomButtonArea = styled.View`
    flex: 1;
    background-color: ${ Colors.primary };
    justify-content: center;
    align-items: center;
    padding: 40px;
`;

export const CustomButton = styled.TouchableOpacity`
    height: 50px;
    width: 100%;
    background-color: ${ Colors.secundary };
    border-radius: 30px;
    justify-content: center;
    align-items: center;
    margin-bottom: 25px;
`;

export const CustomButtonText = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #FFF;
`;