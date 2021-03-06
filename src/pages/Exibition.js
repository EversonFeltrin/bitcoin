import React, { useEffect, useState } from 'react';
import {
    Card,
    Grid,
    Image, 
    Header
} from 'semantic-ui-react';
import { callCoinDesk } from '../helpers/callApi';
import _ from 'lodash';

import './style.css';

const Exibition = () => {
    const [data, setData] = useState({
        eur: 0,
        gbp: 0,
        usd: 0
    });

    /**
     * @name Get Coin Price
     * @description Call API coin desk and get data
     * @author Everson F. Feltrin
     * @since 2021-05-25
     */
    const getCoinPrice = () => {
        return callCoinDesk()
            .then(response => {
                const coins = {
                    eur: _.get(response, 'bpi.EUR.rate_float', 0),
                    gbp: _.get(response, 'bpi.GBP.rate_float', 0),
                    usd: _.get(response, 'bpi.USD.rate_float', 0)
                };

                setData(coins)
            });
    };

    useEffect(() => {        
            getCoinPrice();
        /*eslint-disable-next-line*/
    }, [])

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
                padding: '1.875rem 0'
            }}
        >
            <Grid.Column width={4}/>

            <Grid.Column 
                computer={8}
                mobile={16}
                style={{
                    height: '100vh',
                    margin: '1.875rem auto', //30px
                    maxWidth: '440px',
                    padding: '6.25rem 0 0 0'
                }}
                tablet={16}
                width={8}
            >
                <Card style={{width: '440px'}}>
                    <Card.Content style={{ padding: '0' }}>
                        <Image 
                            size='medium'
                            src='https://blog.bitcointrade.com.br/wp-content/uploads/2018/06/surpreendase-com-a-origem-do-bitcoin-a-moeda-virtual.jpeg' 
                            style={{ 
                                borderRadius: '0.2rem 0.2rem 0 0',
                                height: '10rem', 
                                margin: '0',
                                width: '100%'
                            }}
                        />    
                        <Card.Description 
                            style={{
                                marginBottom: '3rem',
                                marginTop: '1.5rem', 
                                padding: '0 1.25rem'
                            }}
                        >
                            A origem do Bitcoin ?? t??o interessante quanto a sua evolu????o no mercado. Criada h?? quase uma d??cada, a moeda virtual alcan??ou patamares hist??ricos de cota????es, atraindo ainda mais visibilidade para a economia digital e transformando a criptomoeda em <b>um dos investimentos mais atrativos do momento</b>.
                        </Card.Description>
                        <Card 
                            style={{ 
                                backgroundColor: '#07a5b1',
                                borderRadius: '0.375rem', 
                                color: '#ffffff', 
                                margin: '0 1.25rem', 
                                padding: '1rem', 
                                width: '92%' 
                            }}
                        >
                            <Header 
                                as='h2' 
                                content='Bitcoin Price Index' 
                                style={{ 
                                    color: '#ffffff', 
                                    marginTop: '0.375rem' 
                                }} 
                            />
                                United States Dollar: ${data.eur}   
                                <br/>
                                British Pound Sterling: ??{data.gbp} 
                                <br/>
                                Euro: ???{data.usd}
                        </Card>
                        <Card.Description
                            style={{
                                marginTop: '3rem',
                                padding: '0 1.25rem'
                            }}
                        >
                            O grande mist??rio do Bitcoin ainda n??o foi revelado. Afinal, quem inventou a criptomoeda? Existem v??rias vers??es, mas nenhuma conclusiva at?? o momento. O que se sabe ?? que o fundador usa o pseud??nimo Satoshi Nakamoto.
                        </Card.Description>
                    </Card.Content>
                </Card>                
            </Grid.Column>
            <Grid.Column 
                floated='right'
                style={{ paddingBottom: '1px' }}
                verticalAlign='middle'
                width={4} 
            >
                <Card 
                    style={{ 
                        backgroundColor: '#ffffff', 
                        borderRadius: '40px 5px 5px 10px', 
                        height: '7.5rem',
                        padding: '0.625rem 0 0 0',
                        position: 'fixed',
                        right: '0',
                        top: '15%',
                        width: '9rem'
                    }}
                >
                        <Image 
                            centered
                            src='https://assets.izap.com.br/clarearacessorios.com.br/uploads/img5b9aaaebbf94f.png' 
                            size='tiny' 
                            style={{
                                height: '5rem',
                                marginBottom: '0.5rem',
                                width: '5rem'
                            }}
                        />
                        <p style={{ padding: '0' }}><strong>SAC</strong></p> 
                </Card>
            </Grid.Column>
        </Grid>
    );
};

export default Exibition;