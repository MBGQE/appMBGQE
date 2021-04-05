import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

import Stars from './Stars';

import AccountIcon from '../assets/Images/account.svg';

import Colors from '../assets/Themes/Colors';

const Area = styled.TouchableOpacity`
    background-color: #FFF;
    margin-bottom: 20px;
    border-radius: 20px;
    padding: 15px;
    flex-direction: row;
`;

const Avatar = styled.Image`
    width: 88px;
    height: 88px;
    border-radius: 20px;
    border-width: 2px;
    border-color: ${ Colors.primary };
`;

const AvatarIcon = styled.View`
    border-radius: 20px;
    border-width: 2px;
    border-color: ${ Colors.primary };
`;

const InfoArea = styled.View`
    margin-left: 20px;
    justify-content: space-between;
`;

const UserName = styled.Text`
    font-size: 17px;
    font-weight: bold;
`;

const SeeProfileBotton = styled.View`
    width: 85px;
    height: 26px;
    border: 2px solid ${ Colors.primary };
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    margin-left: 20px;
`;

const SeeProfileBottonText = styled.Text`
    font-size: 13px;
    color: ${ Colors.primary };
`;

export default ({ data }) => {
    const navigation = useNavigation();

    const handleClick = () => {
        navigation.navigate('Quadra', {
            idQuadra: data.idQuadra,
            avatar: data.avatar,
            name: data.name,
            stars: data.stars
        });
    }

    return(
        <Area onPress = { handleClick } >
            {
                data.avatar == '' ?
                <AvatarIcon>
                    <AccountIcon width = "88" height = "88" fill = { Colors.primary } />
                </AvatarIcon>
                :
                <Avatar source = {{ uri: data.avatar }} />
            }
            
            <InfoArea>
                <UserName>{ data.name }</UserName>

                <Stars stars = { data.stars } showNumber = { true } />

                <SeeProfileBotton>
                    <SeeProfileBottonText>Ver Perfil</SeeProfileBottonText>
                </SeeProfileBotton>
            </InfoArea>
        </Area>
    );
}

