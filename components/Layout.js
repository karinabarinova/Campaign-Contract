import React from 'react';
import Header from './Header';
import 'semantic-ui-css/semantic.min.css';

const Layout = ({children}) => {
    return(
        <div>
            <Header />
                {children}
        </div>
    );
}

export default Layout;

