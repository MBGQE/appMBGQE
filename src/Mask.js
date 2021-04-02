import React from 'react';

export const phoneMask = value => {
    return value
        .replace(/\D/g, '') //substitui qualquer caracter que nao seja numero por nada
        .replace(/(\d{1})(\d)/, '($1$2)') //captura 2 grupos de numeros e coloca () entre eles
        .replace(/(\d{5})(\d{1,2})/, '$1-$2') //captura a sequencia dos 5 numeros e coloca -
        .replace(/(-\d{4})\d+?$/, '$1') //captura os 4 ultimos digitos e nao deixa ser digitado mais nada
}