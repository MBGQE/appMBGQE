import React from 'react';
import styled from 'styled-components/native';
import { Rating } from 'react-native-ratings';

import BackIcon from '../assets/Images/back.svg';

import Api from '../Api';
import Colors from '../assets/Themes/Colors';

export default ({ show, setShow, quadraInfo }) => {

    const handleCloseButton = () => {
        setShow(false);
    }

    ratingCompleted = async (rating) => {
        console.log("Rating: ", rating);
        let result = await Api.ratingStar(rating, quadraInfo.idQuadra);
        if(result) 
        {
            setShow(false);
        }
    }
    
    return(
        <Modal
            transparent = { true }
            visible = { show }
            animationType = 'slide'
        >
            <ModalArea>
                <CloseButton onPress = { handleCloseButton } >
                    <BackIcon width = "44" height = "44" fill = "#000" />
                </CloseButton>
            </ModalArea>
            <RatingArea>
                <Rating 
                    ratingColor = { Colors.stars }
                    ratingBackgroundColor = '#FFF'
                    ratingImage = { 5 }
                    showRating = { true }
                    onFinishRating = { this.ratingCompleted }
                />
            </RatingArea>

        </Modal>
    );
}

const Modal = styled.Modal``;

const ModalArea = styled.View`
    background-color: #FFF;
    flex: 0.75;
`;

const CloseButton = styled.TouchableOpacity`
    position: absolute;
    left: 0;
    top: 25px;
    z-index: 0;
`;

const RatingArea = styled.View`
    flex: 1;
    background-color: #FFF;
`;