import React from 'react';
import styled from 'styled-components/native';
import Colors from '../../assets/Themes/Colors';

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #FFF;
`;

export const Scroller = styled.ScrollView`
    flex: 1;
`;

export const SwipeDot = styled.View`
    width: 10px;
    height: 10px;
    background-color: #FFF;
    border-radius: 5px;
    margin: 3px;
`;

export const SwipeDotActive = styled.View`
    width: 10px;
    height: 10px;
    background-color: #000;
    border-radius: 5px;
    margin: 3px;
`;

export const SwipeItem = styled.View`
    flex: 1;
    background-color: ${ Colors.primary };
`;

export const SwipeImage = styled.Image`
    width: 100%;
    height: 240px;
`;

export const FakeSwiper = styled.View`
    height: 140px;
    background-color: ${ Colors.primary };
`;

export const PageBody = styled.View`
    background-color: #FFF;
    border-top-left-radius: 50px;
    margin-top: -50px;
`;

export const UserInfoArea = styled.View`
    flex-direction: row;
    margin-top: -30px;
`;

export const UserAvatar = styled.Image`
    width: 110px;
    height: 110px;
    border-radius: 20px;
    margin-left: 30px;
    margin-right: 20px;
    border-width: 2px;
    border-color: #FFF;
`;

export const AvatarIcon = styled.View`
    width: 110px;
    height: 110px;
    border-radius: 20px;
    margin-left: 30px;
    margin-right: 20px;
    border-width: 3px;
    border-color: #000;
    background-color: #FFF;
    justify-content: center;
    align-items: center;
`;

export const UserInfo = styled.View`
    flex: 1;
    justify-content: flex-end;
`;

export const UserInfoName = styled.Text`
    color: #000;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 5px;
`;

export const RatingButton = styled.TouchableOpacity`
    background-color: #FFF;
    border: 2px solid #737373;
    border-radius: 50px;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
    margin-right: 75px;
`;

export const RatingButtonText = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #737373;
`;

export const ServiceArea = styled.View`
    margin-top: 30px;
`;

export const ServicesTitle = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: ${ Colors.primary };
    margin-left: 30px;
    margin-bottom: 20px;
`;

export const ServiceItem = styled.View`
    flex-direction: row;
    margin-left: 30px;
    margin-right: 30px;
    margin-bottom: 20px;
`;

export const ServiceInfo = styled.View`
    flex: 1;
`;

export const ServiceName = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: ${ Colors.primary };
`;

export const ServicePrice = styled.Text`
    font-size: 14px;
    color: ${ Colors.primary };
`;

export const ServiceChooseButton = styled.TouchableOpacity`
    background-color: ${ Colors.primary };
    border-radius: 10px;
    padding: 10px 15px;
`;

export const ServiceChooseBtnText = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: #FFF;
`;

export const AddressArea = styled.View`
    margin-top: 30px;
`;

export const AddressTitle = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: ${ Colors.primary };
    margin-left: 30px;
`;

export const AddressInfo = styled.View`
    flex: 1;
    margin-left: 30px;
    margin-right: 30px;
    justify-content: center;
    padding: 5px;
`;

export const AddressText = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: ${ Colors.primary };
`;

export const BackButton = styled.TouchableOpacity`
    position: absolute;
    left: 0;
    top: 0;
    z-index: 9;
`;

export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 50px;
`;
