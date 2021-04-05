import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';
import storage from '@react-native-firebase/storage';
import messaging from '@react-native-firebase/messaging';

const db = firestore();

export default {
    
    checkLogin: async () => { 
        let result = auth().currentUser;
        return result;   
    },

    SignUp: async (name, email, password, telefone1, telefone2) => {
        return await auth()
                .createUserWithEmailAndPassword(email, password)
                .then(user => {
                    db.collection('jogador')
                    .doc(user.user.uid)
                    .set({
                        idJogador: user.user.uid,
                        name: name,
                        email: email,
                        senha: password,
                        celular1: telefone1,
                        celular2: telefone2,
                        avatar: '',
                    });
                    return user.user.uid;
                })
                .catch(error => {
                    return error;
                });
    },

    SignIn: async (email, password) => {
        return await auth().signInWithEmailAndPassword(email, password)
            .then(user => {
                return user.user.uid;
            })
            .catch(error => {
                return error;
            });
    },

    setTokenMessage: async (idJogador) => {
        await messaging().registerDeviceForRemoteMessages();
        const token = await messaging().getToken();
        await db.collection('jogador').doc(idJogador).update({
            token: token
        });
    },

    LoadUserPlayer: async (u) => {
        let result = await db.collection('jogador').doc(u).get();
        return result;
    },    

    logout: async () => {
        await auth().signOut();
    },

    getSportCourts: async () => {
        let list = [];

        await db.collection('quadras')
            .orderBy('stars', 'desc')
            .get()
            .then(snapshot => {
                snapshot.docs.map(doc => {
                    if(doc.exists)
                    {
                        const data = doc.data();
                        list.push({
                            idQuadra: data.idQuadra,
                            name: data.name,
                            avatar: data.avatar,
                            stars: data.stars
                        });
                    }                    
                });
            })
            .catch(error => {
                console.log(error);
            });
        return list;
    },

    getSportCourtsName: async (name = null) => {
        let list = [];
        
        await db.collection('quadras')
            .where('name', '>=', name)
            .get()
            .then(snapshot => {
                snapshot.docs.map(doc => {
                    if(doc.exists)
                    {
                        const data = doc.data();
                        list.push({
                            idQuadra: data.idQuadra,
                            name: data.name,
                            avatar: data.avatar,
                            stars: data.stars
                        });
                    }
                });
            });
        
        return list;
    },

    getSportsCourtsProfile: (idQuadra, setQuadraInfo) => {
        return db.collection('quadras').doc(idQuadra).onSnapshot((doc) => {
            if(doc.exists)
            {
                let data = doc.data();
                setQuadraInfo(data);
            }
        });
    },

    onPeriod: (idQuadra, setListPeriod) => {
        return db.collection('quadras')
            .doc(idQuadra)
            .collection('periodo')
            .onSnapshot((doc) => {
                if(doc.docs)
                {
                    let docPeriod = doc.docs.map(period => period.data());
                    setListPeriod(docPeriod);
                }
            });
    },

    setAppointment: async (idJogador, infoQuadra, service, selectedYear, selectedMonth, selectedDay, selectedHour) => {
        let infoJogador = await db.collection('jogador').doc(idJogador).get();
        month = selectedMonth < 10 ? '0' + (selectedMonth + 1) : (selectedMonth + 1);
        day = selectedDay < 10 ? '0' + selectedDay : selectedDay;
        date = `${day}/${month}/${selectedYear}`;
        var idPeriodo = '';
        await db.collection('quadras').doc(infoQuadra.idQuadra)
            .collection('periodo')
            .where('data', '==', date)
            .get()
            .then(snapshot => {
                snapshot.docs.map(doc => {
                    idPeriodo = doc.id;
                });
            });

        var agendamentoRef = db.collection('agendamento').doc();
        var jogadorRef = db.collection('jogador').doc(idJogador);
        var quadraRef = db.collection('quadras').doc(infoQuadra.idQuadra);
        var periodoRef = db.collection('quadras').doc(infoQuadra.idQuadra)
            .collection('periodo').doc(idPeriodo);

        return db.runTransaction(async transaction => {
            const postSnapshot = await transaction.get(agendamentoRef);
            if(agendamentoRef.exists)
            {
                return postSnapshot;
            }
            transaction.set(agendamentoRef, {
                idQuadra: infoQuadra.idQuadra,
                idJogador: idJogador,
                quadraNome: infoQuadra.name,
                jogadorNome: infoJogador.data().name,
                avatar: infoQuadra.avatar,
                servico: {
                    tipo: infoQuadra.servico[service].tipo,
                    preco: infoQuadra.servico[service].preco
                },
                data: date,
                hora: selectedHour,
                cancelamento: false,
                idPeriodo: idPeriodo,
                jogadorToken: infoJogador.data().token
            });

            transaction.update(jogadorRef, {
                agendamento: firestore.FieldValue.arrayUnion(agendamentoRef.id)
            });

            transaction.update(quadraRef, {
                agendamento: firestore.FieldValue.arrayUnion(agendamentoRef.id)
            });

            transaction.update(periodoRef, {
                horas: firestore.FieldValue.arrayUnion({ 'hora': selectedHour, 'disponivel': false
                })
            });

            transaction.update(periodoRef, {
                horas: firestore.FieldValue.arrayRemove({ 'hora': selectedHour, 'disponivel': true
                })
            })
            
            return transaction;
        });
    },

    onAppointments: async (idJogador) => {
        let list = [];
        let result = await db.collection('jogador').doc(idJogador).get();
        let listAppointments = result.data().agendamento;

        await db.collection('agendamento')
            .orderBy('hora', 'desc')
            .get()
            .then(snapshot => {
                snapshot.docs.map(doc => {
                    if(doc.exists)
                    {
                        let data = doc.data();
                        for(i in listAppointments)
                        {
                            if(doc.id == listAppointments[i])
                            {
                                list.push({
                                    avatar: data.avatar,
                                    data: data.data,
                                    hora: data.hora,
                                    idAgendamento: listAppointments[i],
                                    idQuadra: data.idQuadra,
                                    quadraNome: data.quadraNome,
                                    servico: data.servico,
                                    idPeriodo: data.idPeriodo,
                                    jogadorToken: data.jogadorToken
                                });
                            }
                        }
                    }
                });
        });
        return list;

    },

    cancelAppointments: async (infoJogador, infoAgendamento) => {
        var agendamentoRef = db.collection('agendamento').doc(infoAgendamento.idAgendamento);
        var jogadorRef = db.collection('jogador').doc(infoJogador.idJogador);
        var quadraRef = db.collection('quadras').doc(infoAgendamento.idQuadra);
        var periodoRef = db.collection('quadras').doc(infoAgendamento.idQuadra)
            .collection('periodo').doc(infoAgendamento.idPeriodo); 
        var cancelamentoRef = db.collection('cancelamento').doc();
        
        return db.runTransaction(async transaction => {
            const postSnapshot = await transaction.get(cancelamentoRef);
            if(cancelamentoRef.exists)
            {
                return postSnapshot;
            }
            transaction.set(cancelamentoRef, {
                idQuadra: infoAgendamento.idQuadra,
                idJogador: infoJogador.idJogador,
                quadraNome: infoAgendamento.quadraNome,
                jogadorNome: infoJogador.name,
                servico: {
                    tipo: infoAgendamento.servico.tipo, 
                    preco: infoAgendamento.servico.preco
                },
                data: infoAgendamento.data,
                hora: infoAgendamento.hora,
                idPeriodo: infoAgendamento.idPeriodo,
                autor: infoJogador.name
            })
            transaction.update(agendamentoRef, {
                cancelamento: true
            });
            transaction.update(jogadorRef, {
                agendamento: firestore.FieldValue.arrayRemove(agendamentoRef.id)
            });
            transaction.update(quadraRef, {
                agendamento: firestore.FieldValue.arrayRemove(agendamentoRef.id)
            });
            transaction.update(periodoRef, {
                horas: firestore.FieldValue.arrayRemove({
                    'hora': infoAgendamento.hora, 'disponivel': false
                })
            });
            transaction.update(periodoRef, {
                horas: firestore.FieldValue.arrayUnion({
                    'hora': infoAgendamento.hora, 'disponivel': true
                })
            });
        });
    },

    getCancelNotification: async (idJogador) => {
        let list = [];
        let token = '';
        await db.collection('jogador').doc(idJogador).get().then(snapshot => {
            if(snapshot.exists)
            {
                const data = snapshot.data();
                token = data.token;
            }
        });
        await db.collection('notificacoes').where('token', '==', token).get().then(snapshot => {
            snapshot.docs.map(doc => {
                if(doc.exists)
                {
                    const data = doc.data();
                    list.push({
                        title: data.titulo,
                        body: data.body,
                        hourNotify: data.horaNotificacao
                    });
                }
            });
        });
        return list;
    },

    updatePassword: async (idJogador, newPassword, currentPassword) => {
        let user = auth().currentUser;
        let cred = auth.EmailAuthProvider.credential(user.email, currentPassword);
        await user.reauthenticateWithCredential(cred).then(() => {
            user.updatePassword(newPassword).then(() => {
                return true;
            })
            .catch(error => {
                return error;
            })
        })
        .catch(error => {
            if(error.code === "auth/wrong-password")
            { 
                return false;
            }
        });

        await db.collection('jogador').doc(idJogador).update({
            senha: newPassword
        });
        
        return true;
    },

    uploadImage: async (idJogador, image) => {
        const uploadUri = image;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

        const storageRef = storage().ref(`avatarJogador/${idJogador}/${filename}`);

        const task = storageRef.putFile(uploadUri);
        
        task.on('state_changed', (taskSnapshot) => {
            console.log(`${taskSnapshot.bytesTransferred} trasferred out of ${taskSnapshot.totalBytes}`);
        });
        if((await task).state === 'success')
        {
            var url = await storageRef.getDownloadURL();
        }
        else
        {
            console.log("Ocorreu um erro.");
        }
        return url;
    },

    updateAvatar: async(idJogador, novoAvatar) => {
        await db.collection('jogador').doc(idJogador).update({
            avatar: novoAvatar
        });
        return true;
    },

    updatePhone: async (idJogador, celular1, celular2) => {
        await db.collection('jogador')
            .doc(idJogador)
            .update({
                celular1: celular1,
                celular2: celular2
            })
            .catch(error => {
                return error;
            });
        return true;
    },

    ratingStar: async (starNumber, idQuadra) => {
        var quadraRef = db.collection('quadras').doc(idQuadra);
        return db.runTransaction(async transaction => {
            await transaction.get(quadraRef).then(res => {
                if(!res.exists)
                {
                    return res;
                }
                let novoNumAval = res.data().numAvaliacao + 1;
                let avalTotal = res.data().stars * res.data().numAvaliacao;
                let novaMediaAval = (avalTotal + starNumber) / novoNumAval;
                let starsFormat = novaMediaAval.toFixed(1);

                transaction.update(quadraRef, {
                    numAvaliacao:  novoNumAval,
                    stars: starsFormat
                })
            });
            return transaction;   
        });
    },

    verifyDateAppointment: async (selectedDay, selectedMonth, selectedYear) => {
        let result = await functions().httpsCallable('verifyDate')({
            selectedDay: selectedDay,
            selectedMonth: selectedMonth,
            selectedYear: selectedYear
        })
        .catch(error => {
            console.log("error: ", error);
        });
        return result.data;
    },

    verifyHourAppointment: async (selectedDay, selectedMonth, selectedYear, selectedHour) => {
        let result = await functions().httpsCallable('verifyHourAppointment')({
            selectedDay: selectedDay,
            selectedMonth: selectedMonth,
            selectedYear: selectedYear,
            selectedHour: selectedHour
        })
        .catch(error => {
            console.log("error: ", error);
        });
        return result.data;
    }
};
