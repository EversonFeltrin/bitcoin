import React from 'react';
import { Icon } from 'semantic-ui-react';
import { toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * @name Make Toast
 * @description Show toast notification
 * @param {String} content Message content
 * @param {String} type Message type
 * @author Everson F. Feltrin
 * @since 2021-05-35
 */
export const makeToast = (content, type = 'success') => {
    if (type === 'success') {
        toast.success((<p><Icon name='check' /> {content} </p>), { transition: Zoom, position: 'top-right', autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true });
    } else if (type === 'error') {
        toast.error((<p> <Icon name='cancel' /> {content} </p>), { transition: Zoom, position: 'top-right', autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true });
    } else if (type === 'warning') {
        toast.warning((<p> <Icon name='warning sign' /> {content} </p>), { transition: Zoom, position: 'top-right', autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true });
    }
};

/**
 * @name Phone Mask
 * @description Apply phone mask
 * @param {String} phone Phone number
 * @returns {String} Phone with the mask applied
 * @author Everson F. Feltrin
 * @since 2021-05-25
 */
export const phoneMask = (phone) => {
    if(phone.length <= 14) 
        return phone
            .replace(/\D/g, '')
            .replace(/(\d{1})(\d)/, '($1$2)')
            .replace(/(\d{4})(\d{1,2})/, ' $1-$2')
            .replace(/(-\d{4})\d+?$/, '$1');

    return phone
        .replace(/\D/g, '')
        .replace(/(\d{1})(\d)/, '($1$2)')
        .replace(/(\d{5})(\d{1,2})/, ' $1-$2')
        .replace(/(-\d{4})\d+?$/, '$1');
};

/**
 * @name Cpf Mask
 * @description Apply cpf mask
 * @param {String} cpf Cpf number
 * @returns {String} Cpf with the mask applied
 * @author Everson F. Feltrin
 * @since 2021-05-25
 */
export const cpfMask = (cpf) => {
    return cpf
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1');
};

/**
 * @name Validate Cpf
 * @description Verify if cpf is valid before submit data
 * @param {String} value Cpf number
 * @returns {boolean} True or false
 * @author Everson F. Feltrin
 * @since 2021-05-25
 */
/*eslint-disable*/
export const validateCpf = (value) => {
    var cpf = value.trim();

    cpf = cpf.replace(/\./g, '');
    cpf = cpf.replace('-', '');
    cpf = cpf.split('');

    var v1 = 0;
    var v2 = 0;
    var aux = false;

    for (var i = 1; cpf.length > i; i++) {
        if (cpf[i - 1] != cpf[i]) {
            aux = true;
        }
    }

    if (aux == false) {
        return false;
    }

    for (var i = 0, p = 10; (cpf.length - 2) > i; i++, p--) {
        v1 += cpf[i] * p;
    }

    v1 = ((v1 * 10) % 11);

    if (v1 == 10) {
        v1 = 0;
    }

    if (v1 != cpf[9]) {
        return false;
    }

    for (var i = 0, p = 11; (cpf.length - 1) > i; i++, p--) {
        v2 += cpf[i] * p;
    }

    v2 = ((v2 * 10) % 11);

    if (v2 == 10) {
        v2 = 0;
    }

    if (v2 != cpf[10]) {
        return false;
    } else {
        return true;
    }
};

/**
 * @name Cep Mask
 * @description Apply Cep mask
 * @param {String} cep Cep number
 * @returns {String} Cep with the mask applied
 * @author Everson F. Feltrin
 * @since 2021-05-25
 */
export const cepMask = (cep) => {
    return cep
        .replace(/\D/g, '');
};

export default { 
    cepMask,
    cpfMask,
    makeToast,
    phoneMask
 };