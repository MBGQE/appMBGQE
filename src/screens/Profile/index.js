import React, { useEffect, useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';

import { UserContext } from '../../context/UserContext';
import { RefreshControl } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

import { 
    Container,
    Scroller,
    LoadingIcon,
    ViewProfile,
    
    ProfileArea,

    UserInfoArea,
    AvatarIcon,
    AvatarArea, 
    UserAvatarUpdate,
    UserAvatar,
    UserInfo,
    UserInfoName,

    CustomButtonArea,
    CustomButton,
    CustomButtonText

} from './styles';

import AccountIcon from '../../assets/Images/account.svg';
import PasswordModal from '../../components/PasswordModal';
import PhoneModal from '../../components/PhoneModal';

import AlertCustom from '../../components/AlertCustom';

import Api from '../../Api';

export default () => {

    const navigation = useNavigation();

    const [userInfo, setUserInfo] = useState('');

    const [showModalPassword, setShowModalPassword] = useState(false);    
    const [showModalPhone, setShowModalPhone] = useState(false);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    
    const { state: user } = useContext(UserContext);

    const [alertTitle, setAlertTitle] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [alertVisible, setAlertVisible] = useState(false);
    
    const setAlert = (visible = false, title = "", message = "") => {
        setAlertTitle(title);
        setAlertMessage(message);
        setAlertVisible(visible);
    }
    
    const UserInfoData = async () => {
        setLoading(true);
        let result = await Api.LoadUserPlayer(user.id);
        if(result.exists)
        {
            setUserInfo(result.data());
        }
        setLoading(false);
    }

    useEffect(() => {
        UserInfoData();
    }, []);

    const handleUpdateAvatar = async () => {
        await ImagePicker.openPicker({
            cropping: true
        })
        .then(async({path}) => {
            setLoading(true);
            console.log(path);
            if(path !== "")
            {
                const result = await Api.uploadImage(user.id, path);
                const upAvatar = await Api.updateAvatar(user.id, result);
                if(upAvatar)
                {
                    setAlert(true, "Aviso", "Avatar atualizado com sucesso!");
                    UserInfoData();
                }
            }
            setLoading(false);
        })
        .catch(error => {
            console.log(error);
        });      
    }

    const handleUpdatePasswordClick = () => {
        setShowModalPassword(true);
    }

    const handleUpdatePhoneClick = () => {
        setShowModalPhone(true);
    }
    
    const handleSignOutClick = async () => {
        await Api.logout();
        setUserInfo('');
        navigation.reset({
            routes: [{name: 'Preload'}]
        });
    }

    const onRefresh = () => {
        setRefreshing(false);
        UserInfoData();
    }

    return(
        <Container>
            <Scroller
                refreshControl = 
                {
                    <RefreshControl refreshing = { refreshing } onRefresh = { onRefresh } />
                }
            >
                {
                    loading
                    &&
                    <LoadingIcon size = "large" color = "#FFF" />
                }
                <ViewProfile>
                    <ProfileArea>
                        <UserInfoArea>
                            <AvatarArea>
                                <UserAvatarUpdate onPress = { handleUpdateAvatar } >
                                    {
                                        userInfo.avatar == '' ?
                                        <AvatarIcon>
                                            <AccountIcon width = "150" height = "150" fill = { Colors.primary } />
                                        </AvatarIcon>
                                        :
                                        <UserAvatar source = {{ uri: userInfo.avatar }} />                        
                                    }
                                </UserAvatarUpdate>
                            </AvatarArea>

                            <UserInfo>
                                <UserInfoName>{ userInfo.name }</UserInfoName>
                            </UserInfo>

                        </UserInfoArea>
                    </ProfileArea>

                </ViewProfile>               
            </Scroller>

            <CustomButtonArea>     
                <CustomButton onPress = { handleUpdatePasswordClick } >
                    <CustomButtonText>Alterar Senha</CustomButtonText>
                </CustomButton>

                <CustomButton onPress = { handleUpdatePhoneClick } >
                    <CustomButtonText>Alterar Telefone</CustomButtonText>
                </CustomButton>

                <CustomButton onPress = { handleSignOutClick } >
                    <CustomButtonText>Sair da Conta</CustomButtonText>
                </CustomButton>
            </CustomButtonArea>

            <PasswordModal 
                show = { showModalPassword }
                setShow = { setShowModalPassword }
                user = { userInfo }
            /> 

            <PhoneModal 
                show = { showModalPhone }
                setShow = { setShowModalPhone }
                user = { user.id }
            />

            <AlertCustom
                showAlert = { alertVisible }
                setShowAlert = { setAlertVisible } 
                alertTitle = { alertTitle }
                alertMessage = { alertMessage }
                displayNegativeButton = { true }
                negativeText = { "OK" }
            />
        </Container>
    );
}
