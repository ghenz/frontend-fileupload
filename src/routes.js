import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Main from './pages/Main';
import Pasta from './pages/Pasta';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route  path="/" exact component={Main} />
            <Route path="/pasta/:id" component={Pasta} />
        </Switch>
    </BrowserRouter>
);


export default Routes;