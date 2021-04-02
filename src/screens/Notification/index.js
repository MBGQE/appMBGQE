import React, { useEffect, useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';

import { UserContext } from '../../context/UserContext';
import { RefreshControl } from 'react-native';

import { 
    Container,
    BackButton,

    HeaderArea,
    HeaderTitle,

    LoadingIcon,

    Scroller,
    ListArea,

    NotifyItem,
    NotifyTitle,
    NotifyBody

} from './styles';

import Api from '../../Api';
import BackIcon from '../../assets/Images/back.svg';

export default () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [infoNofify, setInfoNotify] = useState([]);
    
    const [refreshing, setRefreshing] = useState(false);

    const { state: user } = useContext(UserContext);
    
    const getNotification = async () => {
        setLoading(true);
        let result = await Api.getCancelNotification(user.id);
        if(result)
        {
            setInfoNotify(result);
        }
        setLoading(false);
    }

    useEffect(() => { 
        getNotification();        
    }, []);
    
    const handleBackButton = () => {
        navigation.goBack();
    }

    const onRefresh = () => {
        setRefreshing(false);
        getNotification();
    }
    
    return(
        <Container>
            <Scroller
                refreshControl = 
                {
                    <RefreshControl refreshing = { refreshing } onRefresh = { onRefresh } />
                }
            >
                <BackButton onPress = { handleBackButton } >
                    <BackIcon width = "44" height = "44" fill = "#FFF" />
                </BackButton>
                <HeaderArea>
                    <HeaderTitle>Notificações</HeaderTitle>
                </HeaderArea>
                {
                    loading
                    &&
                    <LoadingIcon size = "large" color = "#FFF" />
                }
                <ListArea>
                    {
                        infoNofify.map((item, key) => (
                            <NotifyItem key = { key } >
                                <NotifyTitle>{ item.title }</NotifyTitle>
                                <NotifyBody>{ item.body }</NotifyBody>
                            </NotifyItem>
                        ))
                    }                
                </ListArea>                
                    
            </Scroller> 
        </Container>
    );
}    