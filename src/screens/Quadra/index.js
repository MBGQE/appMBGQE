import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Swiper from 'react-native-swiper';

import { 
    Container,
    Scroller,
    BackButton,
    LoadingIcon,
    PageBody,

    FakeSwiper,
    SwipeDot,
    SwipeDotActive,
    SwipeItem,
    SwipeImage,

    UserInfoArea,    
    UserAvatar,
    AvatarIcon,
    UserInfo,
    UserInfoName,
    RatingButton,
    RatingButtonText,

    ServicesTitle,
    ServiceArea,
    ServiceItem,
    ServiceInfo,
    ServiceName,
    ServicePrice,
    ServiceChooseButton,
    ServiceChooseBtnText,

    AddressArea,
    AddressTitle,
    AddressInfo,
    AddressText

} from './styles';

import Api from '../../Api';
import Stars from '../../components/Stars';
import QuadraModal from '../../components/QuadraModal';
import RatingModal from '../../components/RatingModal';
import BackIcon from '../../assets/Images/back.svg';
import AccountIcon from '../../assets/Images/account.svg';

import Colors from '../../assets/Themes/Colors';

export default () => {
    const navigation = useNavigation();
    const route = useRoute();

    const [quadraInfo, setQuadraInfo] = useState({
        idQuadra: route.params.idQuadra,
        avatar: route.params.avatar,
        name: route.params.name,
        stars: route.params.stars
    });
    const [loading, setLoading] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [ratingModal, setRatingModal] = useState(false);

    const sportCourtProfile = () => {
        setLoading(true);
        let unsub = Api.getSportsCourtsProfile(quadraInfo.idQuadra, setQuadraInfo);
        setLoading(false);
        return unsub;
    }

    useEffect(() => {
        sportCourtProfile();
    }, []);

    const handleBackButton = () => {
        navigation.goBack();
    }

    const handleServiceChoose = (key) => {
        setSelectedService(key);
        setShowModal(true);
    }

    const handleRating = () => {
        setRatingModal(true);
    }

    return (
        <Container>
            <Scroller>
                { 
                    quadraInfo.fotosLocal && quadraInfo.fotosLocal.length > 0 ?
                    <Swiper 
                        style = {{ height: 240 }}
                        dot = {< SwipeDot />}
                        activeDot = {< SwipeDotActive />}
                        paginationStyle = {{ top: 15, right: 15, bottom: null, left: null }}
                        autoplay = { true }
                    >

                        {
                            quadraInfo.fotosLocal.map((item, key) => (
                                <SwipeItem key = { key }>
                                    {
                                        <SwipeImage source = {{ uri: item }} resizeMode = "cover" />  
                                    }
                                </SwipeItem>
                            ))
                        }

                    </Swiper>
                    :
                    <FakeSwiper>

                    </FakeSwiper>
                }

                <PageBody>
                    <UserInfoArea>
                        {
                            quadraInfo.avatar == '' ?
                            <AvatarIcon>
                                <AccountIcon width = "110" height = "110" fill = { Colors.primary } />
                            </AvatarIcon>
                            :
                            <UserAvatar source = {{ uri: quadraInfo.avatar }} />                        
                        }
                            
                        <UserInfo>
                            <UserInfoName>{ quadraInfo.name } </UserInfoName>
                            <Stars stars = { quadraInfo.stars } showNumber = { true } />
                            <RatingButton onPress = { handleRating } >
                                <RatingButtonText>Avaliar Quadra</RatingButtonText>
                            </RatingButton>
                        </UserInfo>
                        
                    </UserInfoArea>

                    {
                        loading
                        &&
                        < LoadingIcon size = "large" color = "#000" />
                    }

                    {
                        quadraInfo.servico 
                        &&
                        <ServiceArea>
                            <ServicesTitle>Lista de Quadras</ServicesTitle>
                            { 
                                quadraInfo.servico.map((item, key) => (
                                    <ServiceItem key = { key }>
                                        <ServiceInfo>
                                            <ServiceName>{ item.tipo }</ServiceName>

                                            <ServicePrice>R$ { item.preco.toFixed(2) }</ServicePrice>

                                        </ServiceInfo>                               
                                        <ServiceChooseButton onPress = { () => handleServiceChoose(key) } >
                                            <ServiceChooseBtnText>Agendar</ServiceChooseBtnText>
                                        </ServiceChooseButton>
                                    </ServiceItem>                                
                                )) 
                            }
                        </ServiceArea>
                    }
                    {
                        quadraInfo.endereco
                        &&
                        <AddressArea>
                            <AddressTitle>Endereço do Centro Esportivo</AddressTitle>
                                <AddressInfo >
                                    <AddressText>Rua: { quadraInfo.endereco.rua }</AddressText>
                                    <AddressText>Numero: { quadraInfo.endereco.numero }</AddressText>
                                    <AddressText>Bairro: { quadraInfo.endereco.bairro }</AddressText>
                                </AddressInfo>                             
                        </AddressArea>
                    }
                </PageBody>

            </Scroller>

            <BackButton onPress = { handleBackButton } >
                <BackIcon width = "44" height = "44" fill = "#FFF" />
            </BackButton>

            <QuadraModal 
                show = { showModal }
                setShow = { setShowModal }
                quadraInfo = { quadraInfo }
                service = { selectedService }
            />

            <RatingModal
                show = { ratingModal }
                setShow = { setRatingModal }
                quadraInfo = { quadraInfo }
            />

        </Container>
    );
}