import React from 'react';
import styled from 'styled-components/native';
import Colors from '../../assets/Themes/Colors';

export const Scroller = styled.ScrollView`
    flex: 1;   
    background-color: ${ Colors.primary };
`;

export const HeaderArea = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 33px;
    margin-bottom: 30px;
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
export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 30px;
    margin-bottom: 30px
`;

export const PageBody = styled.View`
    height: 230px;
    background-color: #FFF;
    border-radius: 30px;
    margin-left: 20px;
    margin-right: 20px;
    align-items: center;
    justify-content: center;
    margin-bottom: 40px;
`;

export const InfoQuadraArea = styled.View`
    height: 55px;
    width: 300px;
    flex-direction: row;
    margin-bottom: 10px;
    align-items: center; 
`;

export const InfoQuadraAvatar = styled.Image`
    width: 55px;
    height: 55px;
    border-radius: 10px;
    border-width: 3px;
    border-color: ${ Colors.primary };
`;

export const AvatarIcon = styled.View`
    width: 55px;
    height: 55px;
    border-radius: 10px;
    border-width: 3px;
    border-color: ${ Colors.primary };
    background-color: #FFF;
    justify-content: center;
    align-items: center;
`

export const InfoQuadraNome = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #000;
    padding: 15px;
`;

export const InfoQuadraServiceArea = styled.View`
    height: 80px;
    width: 300px;
    margin-bottom: 15px;  
    justify-content: space-between;
`;

export const InfoServiceArea = styled.View`
    flex-direction: row;
    align-items: center;        
    justify-content: space-between;
`;

export const InfoService = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #000;    
`;

export const InfoDateArea = styled.View`
    flex-direction: row;
    align-items: center;        
    margin-top: 10px;
    justify-content: space-between;

`;

export const InfoDayArea = styled.View`
    align-items: center;
    justify-content: center;
    background-color: ${ Colors.secundary };
    width: 120px;
    height: 40px;
    border-radius: 30px;
`;

export const InfoDateText = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #FFF;
`;

export const InfoHourArea = styled.View`
    align-items: center;
    justify-content: center;
    background-color: ${ Colors.secundary };
    width: 80px;
    height: 40px;
    border-radius: 30px;
`;

export const CancelButton = styled.TouchableOpacity`
    background-color: ${ Colors.secundary };
    height: 40px;
    width: 120px;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    margin-bottom: -10px;
`;

export const CancelButtonText = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #FFF;
`;
