import React, { useEffect, useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../context/UserContext';
import { Alert, RefreshControl } from 'react-native';

import AwesomeAlert from 'react-native-awesome-alerts';

import { 
    BackButton,
    LoadingIcon,

    HeaderArea,
    HeaderTitle,

    Scroller,
    PageBody,
    InfoQuadraArea,
    InfoQuadraAvatar,
    InfoQuadraNome,

    InfoQuadraServiceArea,
    InfoServiceArea,
    InfoService,

    InfoDateArea,
    InfoDateText,
    InfoDayArea,
    InfoHourArea,

    CancelButton,
    CancelButtonText

} from './styles';

import BackIcon from '../../assets/Images/back.svg';
import Api from '../../Api';
import Colors from '../../assets/Themes/Colors';

export default () => {
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [listAppointments, setListAppointments] = useState([]);
    const [infoUser, setInfoUser] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const { state: user } = useContext(UserContext);

    const getInfoAppointments = async () => {
        setLoading(true);
        setListAppointments([]);
        let result = await Api.onAppointments(user.id);
        if(result)
        {
            setListAppointments(result);
        }
        let list = await Api.LoadUserPlayer(user.id);
        if(list)
        {
            setInfoUser(list.data());
        }
        setLoading(false);
    }

    useEffect(() => {
        getInfoAppointments();
    }, []);

    const handleBackButton = () => {
        navigation.goBack();
    };

    const onRefresh = () => {
        setRefreshing(false);
        getInfoAppointments();
    }

    const handleCancelAppointments = () => {
        setShowAlert(true);
    }

    const CancelAppointments = async (listAppointments) => {
        await Api.cancelAppointments(infoUser, listAppointments);
        getInfoAppointments();
    }

    return(
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
                <HeaderTitle>Agendamentos</HeaderTitle>
            </HeaderArea>
                {
                    loading
                    &&
                    <LoadingIcon size = "large" color = "#FFF" />
                }
                {
                    listAppointments.map((item, key) => (
                        <PageBody 
                            key = { key }
                        >
                            <InfoQuadraArea>
                                <InfoQuadraAvatar source = {{ uri: item.avatar }} />
                                <InfoQuadraNome>{ item.quadraNome }</InfoQuadraNome>
                            </InfoQuadraArea>

                            <InfoQuadraServiceArea>
                                <InfoServiceArea>
                                    <InfoService>Quadra: { item.servico.tipo }</InfoService>
                                    <InfoService>R$ { item.servico.preco.toFixed(2) }</InfoService>
                                </InfoServiceArea>

                                <InfoDateArea>
                                    <InfoDayArea>
                                        <InfoDateText>{ item.data }</InfoDateText>
                                    </InfoDayArea>

                                    <InfoHourArea>
                                        <InfoDateText>{ item.hora }</InfoDateText>
                                    </InfoHourArea>
                                </InfoDateArea>
                            </InfoQuadraServiceArea>

                                <CancelButton onPress = { () => handleCancelAppointments() }>
                                    <CancelButtonText>Cancelar</CancelButtonText>
                                </CancelButton>
                                <AwesomeAlert
                                    show={showAlert}
                                    showProgress={false}
                                    title="Cancelamento do Agendamento"
                                    message="Deseja mesmo cancelar?"
                                    closeOnTouchOutside={true}
                                    closeOnHardwareBackPress={false}
                                    showCancelButton={true}
                                    showConfirmButton={true}
                                    cancelText="Não"
                                    confirmText="Sim"
                                    confirmButtonColor={ Colors.primary }
                                    cancelButtonColor="#FF0000"
                                    onCancelPressed={() => {
                                        setShowAlert(false);
                                    }}
                                    onConfirmPressed={() => {
                                        CancelAppointments(item)
                                        setShowAlert(false);
                                    }}
                                /> 
                        </PageBody>
                    ))
                }       

        </Scroller>
    );
}