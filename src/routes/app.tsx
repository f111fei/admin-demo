// tslint:disable-next-line:no-unused-variable
import * as React from 'react';
import NProgress from 'nprogress';
import classNames from 'classnames';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import { DvaRouteComponentProps } from 'interfaces';
import { ReduxState, LoadingState, AppState } from 'interfaces/state';
import Loader from 'components/loader';
import styles from './main/index.less';
import Header from './main/Header';
import Sider from './main/Sider';
import { openPages } from 'constants/config';
import '../themes/index.less';
import './app.less';

interface AppProps {

}

interface StateProps {
    app: AppState;
    loading: LoadingState;
}

type Props = Readonly<AppProps & StateProps & DvaRouteComponentProps>;

let lastHref: string;

const App = ({ loading, children, location, app }: Props) => {
    const { isNavbar, siderFold, darkTheme, menus } = app;
    const href = window.location.href;
    let { pathname } = location;
    pathname = pathname.startsWith('/') ? pathname : `/${pathname}`;

    if (lastHref !== href) {
        NProgress.start();
        if (!loading.global) {
            NProgress.done();
            lastHref = href;
        }
    }

    if (openPages.includes(pathname)) {
        return (
            <div>
                <Loader fullScreen spinning={loading.effects['app/query']} />
                {children}
            </div>
        );
    }

    return (
        <div>
            <Loader fullScreen spinning={loading.effects['app/query']} />
            <div className={classNames(styles.layout, { [styles.fold]: isNavbar ? false : siderFold }, { [styles.withnavbar]: isNavbar })}>
                {!isNavbar ? <aside className={classNames(styles.sider, { [styles.light]: !darkTheme })}>
                    {menus.length === 0 ? null : <Sider />}
                </aside> : ''}
                <div className={styles.main}>
                    <Header />
                </div>
            </div>
        </div>
    );
};

function mapStateToProps(state: ReduxState, ownProps: AppProps): StateProps {
    return {
        app: state.app,
        loading: state.loading
    };
}

export default withRouter(connect(mapStateToProps)(App)) as any;