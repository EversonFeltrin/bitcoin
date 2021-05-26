import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import {
    Button,
    Card,
    Form, 
    Grid,
    Header,
    Modal
} from 'semantic-ui-react';
import { 
    cepMask,
    cpfMask,
    makeToast,
    phoneMask,
    validateCpf
} from '../helpers/functions';
import { callViaCEP } from '../helpers/callApi';
import _ from 'lodash';
import './style.css';

const Register = () => {
    const [loadingZipCode, setLoadingZipCode] = useState(false);
    const [modalStatus, setModalStatus] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const requiredData = ['name', 'email', 'phone', 'cpf', 'zipCode'];
    const validateErrorMessage = {
        name: 'O Nome deve ser informado!',
        email: 'O E-mail deve ser informado!',
        phone: 'O Telefone deve ser informado!',
        cpf: 'O CPF deve ser informado!',
        zipCode: 'O CEP deve ser informado!'
    };
    const [data, setData] = useState({
        name: '',
        email: '',
        phone: '',
        cpf: '',
        zipCode: '', 
        city: '',
        district: '',
        street: '',
        number: ''
    });

    /**
     * @name Handle Change
     * @description Handle data change
     * @param {String} name Object data property key
     * @param {any} value Data value
     * @author Everson F. Feltrin
     * @since 2021-05-25
     */
    const handleChange = (name, value) => {
        if( name === 'zipCode'&& value.length === 8) setLoadingZipCode(true);
        
        setData({...data, [name]: value}); 
    };

    /**
     * @name Handle Submit
     * @description Handle data submit
     * @author Everson F. Feltrin
     * @since 2021-05-25
     */
    const handleSubmit = () => {        
        const validateData = _.findKey(data, _.isEmpty);
        if (_.includes(requiredData, validateData)) return makeToast(validateErrorMessage[validateData], 'error');
        if (!validateCpf(data.cpf)) return makeToast('Informe um CPF válido!', 'error');

        setModalStatus(true);        
    };

    /**
     * @name Get Zip Code
     * @description Call API via CEP and get data by zipcode
     * @author Everson F. Feltrin
     * @since 2021-05-25
     */
    const getZipCode = () => {
        return callViaCEP(data.zipCode)
            .then(response => {
                if (response.error) return makeToast('Ocorreu um erro ao buscar seu CEP, por favor informe os dados de endereço.', 'error');

                let address = {...data};
                address['city'] = response.data.localidade;
                address['district'] = response.data.bairro;
                address['street'] = response.data.logradouro;

                setData(address);                
            });
    }

    useEffect(() => {
        if (loadingZipCode === true) {
            getZipCode();
            setLoadingZipCode(false);
        }
        /*eslint-disable-next-line*/
    }, [loadingZipCode])

    if (redirect) return <Redirect to={'/exibition'} />    

    return (          
        <Grid 
            centered 
            columns={3}
            relaxed
            stackable 
            style={{
                backgroundColor: '#5d6070',
                heigth: '100vh',
                margin: '0 auto',
                padding: '1.875rem 0' // 30px
            }}
        >
            <Grid.Column width={4}/>

            <Grid.Column 
                computer={8}
                mobile={16}                    
                style={{
                    margin: '1.875rem auto', //30px
                    maxWidth: '440px',
                    padding: '6.25rem 0'
                }}                    
                tablet={16}
                width={8}
            >
            <Card 
                style={{
                    padding: '0.75rem 1rem',
                    width: '440px'
                }}
            >
                    <Card.Content>
                        <Header as='h2'>
                            Cadastro de usuário
                        </Header>
                        <Card.Description>
                            Utilize este cadastro para fazer parte do maior site de trade de Bitcoin do mundo.
                        </Card.Description>
                        <Form>
                            <Form.Input 
                                name='name'
                                fluid 
                                label='Nome completo'
                                onChange={(e, {name, value}) => handleChange(name, value)}
                                required 
                            />
                            <Form.Input 
                                name='email'
                                fluid 
                                label='E-mail' 
                                onChange={(e, { name, value }) => handleChange(name, value)}
                                required
                            />
                            <Form.Group widths='equal'>
                                <Form.Input 
                                    name='phone'
                                    fluid 
                                    label='Telefone' 
                                    value={phoneMask(data.phone)}
                                    onChange={(e, { name, value }) => handleChange(name, value)}
                                    required 
                                />
                                <Form.Input 
                                    name='cpf'
                                    fluid 
                                    value={cpfMask(data.cpf)}
                                    label='CPF' 
                                    onChange={(e, { name, value }) => handleChange(name, value)}
                                    required 
                                />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Input 
                                    name='zipCode'
                                    fluid 
                                    label='CEP' 
                                    value={cepMask(data.zipCode)}
                                    maxLength='8'
                                    onChange={(e, { name, value }) => handleChange(name, value)}
                                    required 
                                />
                                <Form.Input 
                                    name='city'
                                    fluid 
                                    defaultValue={data.city}
                                    label='Cidade'
                                    onChange={(e, { name, value }) => handleChange(name, value)}
                                />
                            </Form.Group>
                            <Form.Input 
                                name='district'
                                fluid 
                                defaultValue={data.district}
                                label='Bairro' 
                                onChange={(e, { name, value }) => handleChange(name, value)}
                            />
                            <Form.Group widths='equal'>
                                <Form.Input
                                    name='street'
                                    fluid
                                    defaultValue={data.street}
                                    label='Logradouro'
                                    onChange={(e, { name, value }) => handleChange(name, value)}
                                />
                                <Form.Input 
                                    type='number'
                                    name='number'
                                    fluid
                                    defaultValue={data.number}
                                    label='Número'
                                    onChange={(e, { name, value }) => handleChange(name, value)}
                                />
                            </Form.Group>
                            <Button 
                                fluid
                                content='CADASTRAR'
                                onClick={handleSubmit}
                            />
                        </Form>
                    </Card.Content>
                </Card>
                <div 
                    style={{
                        color: '#ffffff',
                        fontSize: '1rem',
                        paddingTop: '1.25rem' //20px
                    }}
                >
                    Os Cookies são utilizados para facilitar a navegação e torná-la mais simples e não danificam o seu dispositivo.
                    Permitem uma navegação mais rápida e eficiente, eliminando a necessidade de introduzir repetimante as mesmas informações.
                </div>
            </Grid.Column>

            <Grid.Column width={4} />

            <Modal
                onClose={() => setModalStatus(false)}
                size={'tiny'}
                open={modalStatus}
            >
                <Modal.Header>Usuário cadastrado!</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <p>Seu cadastro foi realizado, clique em "ok" para continuar!</p>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button positive onClick={() => setRedirect(true)}>
                        Ok
                    </Button>
                </Modal.Actions>
            </Modal>
        </Grid>
    );
};

export default Register;