import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import { RefreshControl } from 'react-native';

import { 
    Container, 
    Scroller,

    HeaderArea,
    HeaderTitle,
    SearchButton,

    LoadingIcon,
    ListArea

} from './styles';

import QuadraItem from '../../components/QuadraItem';

import SearchIcon from '../../assets/Images/search.svg';

import Api from '../../Api';

export default () => {

    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const getQuadras = async () => {
        setLoading(true);
        setList([]);

        let result = await Api.getSportCourts();

        if(result)
        {         
            setList(result);                      
        }
                
        setLoading(false);
    }

    useEffect(() => {
        getQuadras();
    }, []);

    const onRefresh = () => {
        setRefreshing(false);
        getQuadras();
    }

    return(
        <Container>
            <Scroller 
                refreshControl = 
                    {
                        <RefreshControl refreshing = { refreshing } onRefresh = { onRefresh } />
                    }
            >

                <HeaderArea>
                    <HeaderTitle numberOfLines = { 2 } >Encontre sua quadra favorita</HeaderTitle>
                    <SearchButton onPress = { () => navigation.navigate('Search') }>
                        <SearchIcon width = "26" height = "26" fill = "#FFF" />
                    </SearchButton>
                </HeaderArea>     

                {
                    loading
                    &&
                    <LoadingIcon size = "large" color = "#FFF" />
                }

                <ListArea>  
                    {
                        list.map((item, key) => (
                            <QuadraItem key = { key } data = { item } />
                        ))
                    }
                </ListArea>                                             

            </Scroller>
        </Container>
    );
}
