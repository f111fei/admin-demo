// tslint:disable-next-line:no-unused-variable
import * as React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import * as styles from './index.css';

function Dashboard({ dispatch }) {
  function onClick() {
    dispatch(routerRedux.push({
      pathname: '/index2'
    }));
  }

  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>Yay! Welcome to dva!</h1>
      <div className={styles.welcome} onClick={onClick} />
      <ul className={styles.list}>
        <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
        <li><a href="https://github.com/dvajs/dva-docs/blob/master/v1/en-us/getting-started.md">Getting Started</a></li>
      </ul>
    </div>
  );
}

export default connect()(Dashboard);
