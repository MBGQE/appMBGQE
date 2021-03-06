import React, { useEffect, useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../context/UserContext';
import { RefreshControl } from 'react-native';

import { 
    BackButton,
    LoadingIcon,

    HeaderArea,
    HeaderTitle,

    Scroller,
    PageBody,
    InfoQuadraArea,
    AvatarIcon,
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
import AccountIcon from '../../assets/Images/account.svg';
import Api from '../../Api';

import Colors from '../../assets/Themes/Colors';

import AlertCustom from '../../components/AlertCustom';

export default () => {
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [listAppointments, setListAppointments] = useState([]);
    const [infoUser, setInfoUser] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    const { state: user } = useContext(UserContext);

    const [alertTitle, setAlertTitle] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [alertVisible, setAlertVisible] = useState(false);
    const [itemCancel, setItemCancel] = useState("");
    
    const setAlert = (visible = false, title = "", message = "", item) => {
        setAlertTitle(title);
        setAlertMessage(message);
        setAlertVisible(visible);
        setItemCancel(item);
    }

    const getInfoAppointments = async () => {
        setLoading(true);
        setListAppointments([]);
        let result = await Api.onAppointments(user.id);
        if(result)
        {
            result.sort((a, b) => {
                return ((a.hora > b.hora) && (a.data >= b.data)) ? 1 : ((a.hora < b. hora) && (a.data <= b.data)) ? -1 : 0;
            });
            result.map((item) => {
                console.log(`Quadra: ${item.quadraNome} + Data: ${item.data} + Hora: ${item.hora}`);
            });
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

    const handleCancelAppointments = (listAppointments) => {
        setAlert(true, "Sistema:", "Deseja mesmo cancelar o agendamento?", listAppointments);
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
                                {
                                    item.avatar == '' ?
                                    <AvatarIcon>
                                        <AccountIcon width = "55" height = "55" fill = { Colors.primary } />
                                    </AvatarIcon>
                                    :
                                    <InfoQuadraAvatar source = {{ uri: item.avatar }} />
                                }                                
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

                            <CancelButton onPress = { () => handleCancelAppointments(item) }>
                                <CancelButtonText>Cancelar</CancelButtonText>
                            </CancelButton>
                        </PageBody>
                    ))
                } 

                <AlertCustom
                    showAlert = { alertVisible }
                    setShowAlert = { setAlertVisible } 
                    alertTitle = { alertTitle }
                    alertMessage = { alertMessage }
                    displayNegativeButton = { true }
                    negativeText = { "N??o" }
                    displayPositiveButton = { true }
                    positiveText = { "Sim" }
                    onPressPositiveButton = { () => CancelAppointments(itemCancel) }
                /> 
        </Scroller>
    );
}