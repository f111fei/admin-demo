import dva from 'dva';
import createLoading from 'dva-loading';
import createHistory from 'history/createBrowserHistory';
import { message } from 'antd';
import router from './router';
import appModel from './models/app';
import 'babel-polyfill';
import 'isomorphic-fetch';

// 1. Initialize
const app = dva({
    history: createHistory(),
    onError(error) {
        message.error(error.message);
    },
});

// 2. Plugins
app.use(createLoading({ effects: true }));

// 3. Model
app.model(appModel);

// 4. Router
app.router(router);

// 5. Start
app.start('#root');
