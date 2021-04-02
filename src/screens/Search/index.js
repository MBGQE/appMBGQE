import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import QuadraItem from '../../components/QuadraItem';

import Api from '../../Api';
import BackIcon from '../../assets/Images/back.svg';

import {
    Container,
    BackButton,
    
    SearchArea,
    SearchAreaText,

    Scroller,
    ListArea,

    LoadingIcon
} from './styles';

export default () => {
    const navigation = useNavigation();
    const [list, setList] = useState([]);
    const [nameQuadra, setNameQuadra] = useState('');
    const [loading, setLoading] = useState(false);

    const getNameQuadra = async (t) => {
        setLoading(true);
        setList([]);
        let result = await Api.getSportCourtsName(t);
        if(result)
        {
            setList(result);
        }
        setLoading(false);
    }

    const handleBackButton = () => {
        navigation.goBack();
    }

    useEffect(() => {
        getNameQuadra(nameQuadra);
    }, [nameQuadra]);

    return(
        <Container>
            <SearchArea>
                <SearchAreaText
                    placeholder = "Digite o nome da quadra"
                    placeholderTextColor = "#FFF"
                    value = { nameQuadra }
                    onChangeText = { t => setNameQuadra(t) }
                >

                </SearchAreaText>
            </SearchArea>

            <BackButton onPress = { handleBackButton } >
                    <BackIcon width = "44" height = "44" fill = "#FFF" />
            </BackButton>
            
            {
                loading
                &&
                <LoadingIcon size = "large" color = "#FFF" />
            }
            
            <Scroller>
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