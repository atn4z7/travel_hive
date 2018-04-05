import React from 'react';
import './index.css';
import { App} from './App';
import { AppMobile } from './mobile-app/AppMobile';
import { app } from "./components/app";
import user from "./models/user";
import inspiration from "./models/inspiration";

// Create model
app.model(user);
app.model(inspiration);

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

false ?  app.router(() => <AppMobile />) :  app.router(() => <App />);

app.start('#root');