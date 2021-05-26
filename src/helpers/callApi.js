/**
 * @name Call Via CEP Api
 * @description Get data in via CEP api
 * @param {String} ZipCode Zip Code
 * @returns {JSON} Data from via CEP
 * @author Everson F. Feltrin
 * @since 2021-05-25
 */
export const callViaCEP = (zipCode) => fetch(`https://viacep.com.br/ws/${zipCode}/json/`, { method: 'GET' })
    .then(response => response.json())
    .then(response => {
        if (response.hasOwnProperty('erro')) return {error: true, data: {}};

        return { error: false, data: response };
    });


/**
 * @name Call Coin Desk Api
 * @description Get data in coin desk api
 * @returns {JSON} Data from coin desk api
 * @author Everson F. Feltrin
 * @since 2021-05-25
 */
export const callCoinDesk = () => fetch("https://api.coindesk.com/v1/bpi/currentprice.json", { method: 'GET' })
    .then(response => response.json());

/*eslint-disable*/
export default { 
    callCoinDesk,
    callViaCEP
};