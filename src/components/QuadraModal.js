import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

import ExpandIcon from '../assets/Images/expand.svg';
import NavPrevIcon from '../assets/Images/nav_prev.svg';
import NavNextIcon from '../assets/Images/nav_next.svg';
import { UserContext } from '../context/UserContext';
import Api from '../Api';
import { Alert } from 'react-native';

import Colors from '../assets/Themes/Colors';

const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
];

const days = [
    'Dom',
    'Seg',
    'Ter',
    'Qua',
    'Qui',
    'Sex',
    'Sab'
];

export default ({ show, setShow, quadraInfo, service }) => {
    const navigation = useNavigation();
    const { state: user } = useContext(UserContext);
    
    const [listPeriod, setListPeriod] = useState([]);

    const [selectedYear, setSelectedYear] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState(0);
    const [selectedDay, setSelectedDay] = useState(0);
    const [selectedHour, setSelectedHour] = useState(null);
    const [listDays, setListDays] = useState([]);
    const [listHours, setListHours] = useState([]);

    useEffect(() => {

        let unsub = Api.onPeriod(quadraInfo.idQuadra, setListPeriod);        
        return unsub; 

    }, [quadraInfo]);

    useEffect(() => {
        if(listPeriod)
        {
            let daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
            let newListDays = [];

            for(let i = 1; i <= daysInMonth; i++)
            {
                let d = new Date(selectedYear, selectedMonth, i);
                let year = d.getFullYear();
                let month = d.getMonth() + 1;
                let day = d.getDate();
                month = month < 10 ? '0' + month : month;
                day = day < 10 ? '0' + day : day;
                let selDate = `${day}/${month}/${year}`;

                let availability = listPeriod.filter(e => 
                    e.data === selDate
                );

                newListDays.push({
                    status: availability.length > 0 ? true : false,
                    weekday: days[d.getDay()],
                    number: i
                });
            }

            setListDays(newListDays);
            setSelectedDay(0);
            setListHours([]);
            setSelectedHour(null);
        }

    }, [listPeriod, selectedMonth, selectedYear]);

    useEffect(() => {
        const verifyDate = async () => {
            if(listPeriod && selectedDay > 0)
            {
                let result = await Api.verifyDateAppointment(selectedDay, selectedMonth, selectedYear);
                if(result)
                {
                    let d = new Date(selectedYear, selectedMonth, selectedDay);
                    let year = d.getFullYear();
                    let month = d.getMonth() + 1;
                    let day = d.getDate();
                    month = month < 10 ? '0' + month : month;
                    day = day < 10 ? '0' + day : day;
                    let selDate = `${day}/${month}/${year}`;

                    let availability = listPeriod.filter(e => 
                        e.data === selDate
                    );

                    if(availability.length > 0)
                    {
                        setListHours(availability[0].horas);
                    }
                }
                else
                {
                    Alert.alert("Não é possivel agendar em uma data passada!");
                }

            }
            setSelectedHour(null);
        }
        verifyDate();
    }, [listPeriod, selectedDay]);

    useEffect(() => {
        const verifyHour = async () => {
            if(selectedDay > 0 && selectedHour != null)
            {
                let result = await Api.verifyHourAppointment(selectedDay, selectedMonth, selectedYear, selectedHour);
                if(result)
                {
                    Alert.alert("Pode finalizar o agendamento!");
                }
                else
                {
                    Alert.alert("Não é possivel agendar em uma hora passada!");
                    setSelectedHour(null);
                }
            }
        }
        verifyHour();
    }, [selectedDay, selectedHour]);

    useEffect(() => {
        let today = new Date();
        setSelectedYear(today.getFullYear());
        setSelectedMonth(today.getMonth());
    }, []);

    const handleLeftDateClick = () => {
        let mountDate = new Date(selectedYear, selectedMonth, 1);
        mountDate.setMonth(mountDate.getMonth() - 1);
        setSelectedYear(mountDate.getFullYear());
        setSelectedMonth(mountDate.getMonth());
        setSelectedDay(0);
    }

    const handleRightDateClick = () => {
        let mountDate = new Date(selectedYear, selectedMonth, 1);
        mountDate.setMonth(mountDate.getMonth() + 1);
        setSelectedYear(mountDate.getFullYear());
        setSelectedMonth(mountDate.getMonth());
        setSelectedDay(0);
    }

    const handleCloseButton = () => {
        setShow(false);
    }

    const handleFinishClick = async () => {
        if(listPeriod && service != null && selectedYear > 0 && selectedMonth >= 0 && selectedDay > 0 && selectedHour != null)
        {
            let result = await Api.setAppointment(user.id, quadraInfo, service, selectedYear, selectedMonth, selectedDay, selectedHour);
            if(result)
            {              
                setShow(false);
                navigation.navigate('Appointments');
            }
            else
            {
                Alert.alert("Erro ao realizar o Agendamento!");
            }
        }
        else
        {
            Alert.alert("Selecione todos os dados!");
        }
    }

    return(
        <Modal
            transparent = { true }
            visible = { show }
            animationType = "slide"
        >
            <ModalArea>
                <ModalBody>
                    <CloseButton onPress = { handleCloseButton } >
                        <ExpandIcon width = "40" height = "40" fill = "#000" />
                    </CloseButton>

                    <ModalItem>
                        <UserInfo>
                            
                            <UserAvatar source = {{ uri: quadraInfo.avatar }} />
                                    
                            <UserName>{ quadraInfo.name }</UserName>
                        </UserInfo>
                    </ModalItem>

                    {
                        service != null &&
                        <ModalItem>
                            <ServiceInfo>
                                <ServiceName>{ quadraInfo.servico[service].tipo }</ServiceName>
                                <ServicePrice>R$ { quadraInfo.servico[service].preco.toFixed(2) }</ServicePrice>
                            </ServiceInfo>
                        </ModalItem>
                    }

                    <ModalItem>
                        <DateInfo>
                            <DatePrevArea onPress = { handleLeftDateClick } >
                                <NavPrevIcon width = "35" height = "35" fill = "#000" />
                            </DatePrevArea>

                            <DateTitleArea>
                                <DateTitle> { months[selectedMonth] } { selectedYear } </DateTitle>
                            </DateTitleArea>

                            <DataNextArea onPress = { handleRightDateClick } >
                                <NavNextIcon width = "35" height = "35" fill = "#000" />
                            </DataNextArea>
                        </DateInfo>

                        <DateList horizontal = { true } showsHorizontalScrollIndicator = { false } >
                            { 
                                listDays.map((item, key) => (
                                    <DateItem 
                                        key = { key } 
                                        onPress = { () => item.status ? setSelectedDay(item.number) : null } 
                                        style = {{
                                            opacity: item.status ? 1 : 0.5,
                                            backgroundColor: item.number === selectedDay ? Colors.primary : '#FFF'
                                        }}
                                    >
                                        <DateItemWeekDay
                                            style = {{
                                                color: item.number === selectedDay ? '#FFF' : '#000'
                                            }}
                                        >{ item.weekday }</DateItemWeekDay>
                                        <DateItemNumber
                                            style = {{
                                                color: item.number === selectedDay ? '#FFF' : '#000'
                                            }}
                                        >{ item.number }</DateItemNumber>
                                    </DateItem>
                                )) 
                            }
                        </DateList>
                    </ModalItem>

                    {
                        selectedDay > 0 && listHours.length > 0 &&
                        <ModalItem>
                            <TimeList horizontal = { true } showsHorizontalScrollIndicator = { false } >
                            {
                                listHours.map((item, key) => (
                                    <TimeItem
                                        key = { key }
                                        onPress = { () => item.disponivel ? 
                                            setSelectedHour(item.hora) : null
                                        }
                                        style = {{
                                            backgroundColor: item.hora === selectedHour ? Colors.primary : '#FFF',
                                        }}
                                    >
                                        {
                                            item.disponivel ?
                                                <TimeItemText
                                                    style = {{
                                                        color: item.hora === selectedHour ? '#FFF' : '#000', 
                                                    }}
                                                >{ item.hora }</TimeItemText>
                                                :
                                                null
                                        }                                        
                                    </TimeItem>
                                ))
                            }
                            </TimeList>                                                            
                        </ModalItem>
                    }

                    <FinishButton onPress = { handleFinishClick } >
                        <FinishButtonText>Finalizar Agendamento</FinishButtonText>
                    </FinishButton>
                </ModalBody>
            </ModalArea>

        </Modal>
    );
}

const Modal = styled.Modal``;

const ModalArea = styled.View`
    flex: 1;
    background-color: rgba(0, 0, 0, 0.5);
    justify-content: flex-end;
`;

const ModalBody = styled.View`
    background-color: ${ Colors.secundary };
    border-top-left-radius: 20px;    
    border-top-right-radius: 20px;
    padding: 10px 20px 40px 20px;
`;

const CloseButton = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
`;

const ModalItem = styled.View`
    background-color: #FFF;
    border-radius: 10px;
    margin-bottom: 15px;
    padding: 10px;
`;

const UserInfo = styled.View`
    flex-direction: row;
    align-items: center;
`;

const UserAvatar = styled.Image`
    width: 56px;
    height: 56px;
    border-radius: 10px;
    margin-right: 15px;
`;

const UserName = styled.Text`
    color: #000;
    font-size: 18px;
    font-weight: bold;
`;

const ServiceInfo = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

const ServiceName = styled.Text`
    font-size: 16px;
    font-weight: bold;
`;

const ServicePrice = styled.Text`
    font-size: 16px;
    font-weight: bold;
`;

const FinishButton = styled.TouchableOpacity`
    background-color: ${ Colors.primary };
    height: 60px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
`;

const FinishButtonText = styled.Text` 
    color: #FFF;
    font-size: 17px;
    font-weight: bold;
`;

const DateInfo = styled.View`
    flex-direction: row;
`;

const DatePrevArea = styled.TouchableOpacity`
    flex: 1;
    justify-content: flex-end;
    align-items: flex-end;
`;

const DateTitleArea = styled.View`
    width: 140px;
    justify-content: center;
    align-items: center;
`;

const DateTitle = styled.Text`
    font-size: 17px;
    font-weight: bold;
    color: #000;
`;

const DataNextArea = styled.TouchableOpacity`
    flex: 1;
    align-items: flex-start;
`;

const DateList = styled.ScrollView``;

const DateItem = styled.TouchableOpacity`
    width: 45px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    padding-top: 5px;
    padding-bottom: 5px; 
`;

const DateItemWeekDay = styled.Text`
    font-size: 16px;
    font-weight: bold;
`;

const DateItemNumber = styled.Text`
    font-size: 16px;
    font-weight: bold;
`;

const TimeList = styled.ScrollView``;

const TimeItem = styled.TouchableOpacity`
    width: 75px;
    height: 40px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
`;

const TimeItemText = styled.Text`
    font-size: 16px;
    font-weight: bold;
`;
