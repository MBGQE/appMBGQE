import React from 'react';
import styled from 'styled-components/native';

import HomeIcon from '../assets/Images/home.svg';
import SearchIcon from '../assets/Images/search.svg';
import TodayIcon from '../assets/Images/today.svg';
import FavoritesIcon from '../assets/Images/favorite.svg';
import AccountIcon from '../assets/Images/account.svg';

import Colors from '../assets/Themes/Colors';

const TabArea = styled.View`
    height: 60px;
    background-color: ${ Colors.secundary };
    flex-direction: row;
`;

const TabItem = styled.TouchableOpacity`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const TabItemCenter = styled.TouchableOpacity`
    width: 70px;
    height: 70px;
    justify-content: center;
    align-items: center;
    background-color: #FFF;
    border-radius: 35px;
    border: 3px solid ${ Colors.secundary };
    margin-top: -20px;
`;

const AvatarIcon = styled.Image`
    width: 24px;
    height: 24px;
    border-radius: 12px;
`;

export default ({ state, navigation }) => {    
    
    const goTo = (screenName) => {
        navigation.navigate(screenName);
    }

    return(
        <TabArea>
            <TabItem onPress = {() => goTo('Home')} >
                <HomeIcon style = {{ opacity: state.index === 0 ? 1 : 0.5 }} width = "24" height = "24" fill = "#FFF"/>
            </TabItem>

            <TabItem onPress = { () => goTo('Search')} >
                <SearchIcon style = {{ opacity: state.index === 1 ? 1 : 0.5 }} width = "24" height = "24" fill = "#FFF"/>
            </TabItem>

            <TabItemCenter onPress = { () => goTo('Appointments') } >
                <TodayIcon width = "32" height = "32" fill = { Colors.secundary }/>
            </TabItemCenter>

            <TabItem onPress = { () => goTo('Notification') } >
                <FavoritesIcon style = {{ opacity: state.index === 3 ? 1 : 0.5 }} width = "24" height = "24" fill = "#FFF"/>
            </TabItem>

            <TabItem onPress = {() => goTo('Profile')} >
                <AccountIcon style = {{ opacity: state.index === 4 ? 1 : 0.5 }} width = "24" height = "24" fill = "#FFF"/>
            </TabItem>
        </TabArea>
    );
}