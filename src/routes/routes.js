import React from 'react';
import { BrowserRouter, Router, Switch, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from '../store/store'

import { history } from '../history';

import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';
import Dashboard from '../pages/Dashboard';
import User from '../pages/User';
import Viewuser from '../pages/Viewuser';
import CadUser from '../pages/CadUser';
import UpdateUser from '../pages/UpdateUser';

import baseLogin from '../containers/login';
import baseDashboard from '../containers/dashboard';
import baseCadastro from '../containers/cadastro';

export default function Routes() {
    return (
        <Provider store={store}>
            <Router history={history}>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={baseLogin(Login)} />
                    <Route path="/cadastro" exact component={baseCadastro(Cadastro)} />
                    <Route path="/dashboard" exact component={baseDashboard(Dashboard)} />
                    <Route path="/user" exact component={baseDashboard(User)} />
                    <Route path="/view-user/:id" exact component={baseDashboard(Viewuser)} />
                    <Route path="/producers" exact component={baseDashboard(CadUser)} />
                    <Route path="/update-user/:id" exact component={baseDashboard(UpdateUser)} />
                </Switch>
            </BrowserRouter>
            </Router>
        </Provider>
    );
}