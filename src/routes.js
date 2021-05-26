import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import  Register from './pages/Register';
import Exibition from './pages/Exibition';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Register} />
                <Route path="/exibition" component={Exibition} />
            </Switch>
        </BrowserRouter>
    );
}