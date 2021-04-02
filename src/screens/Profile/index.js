import React, { useEffect, useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';

import { UserContext } from '../../context/UserContext';
import { Alert, RefreshControl } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

import { 
    Container,
    Scroller,
    ProfileArea,

    UserInfoArea,
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

import Api from '../../Api';

export default () => {

    const navigation = useNavigation();

    const [userInfo, setUserInfo] = useState('');

    const [showModalPassword, setShowModalPassword] = useState(false);    
    const [showModalPhone, setShowModalPhone] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    
    const { state: user } = useContext(UserContext); 

    const UserInfoData = async () => {
        let result = await Api.LoadUserPlayer(user.id);
        if(result.exists)
        {
            setUserInfo(result.data());
        }
    }

    useEffect(() => {
        UserInfoData();
    }, []);

    const handleUpdateAvatar = async () => {
        let imagePath = '';
        await ImagePicker.openPicker({
            cropping: true
        })
        .then(image => {
            console.log(image);
            imagePath = image.path;
        })
        .catch(error => {
            console.log("Error: ", error.message);
        });
        if(imagePath != '')
        {
            let result = await Api.uploadImage(user.id, imagePath);
            let upAvatar = await Api.updateAvatar(user.id, result);
            if(upAvatar)
            {
                Alert.alert("Avatar atualizado com sucesso!");
                UserInfoData();
            }
        }        
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
                
                <ProfileArea>
                    <UserInfoArea>
                        <AvatarArea>
                            <UserAvatarUpdate onPress = { handleUpdateAvatar } >
                                {
                                    userInfo.avatar != "" ?
                                        <UserAvatar source = {{ uri: userInfo.avatar }} />
                                        :
                                        <AccountIcon width = "150" height = "150" fill = "#FFF" />
                                }
                            </UserAvatarUpdate>
                        </AvatarArea>

                        <UserInfo>
                            <UserInfoName>{ userInfo.name }</UserInfoName>
                        </UserInfo>

                    </UserInfoArea>
                </ProfileArea>

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
               
            </Scroller>

            <PasswordModal 
                show = { showModalPassword }
                setShow = { setShowModalPassword }
                user = { userInfo }
            /> 

            <PhoneModal 
                show = { showModalPhone }
                setShow = { setShowModalPhone }
                idJogador = { user.id }
            />                   

        </Container>
    );
}
