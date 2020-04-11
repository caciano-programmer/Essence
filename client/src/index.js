import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Normalize } from 'styled-normalize';
import Container from 'react-bootstrap/Container';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import { Header } from './UI/Header';
import { Home } from './Features/Home/Components/home';
import { LoadingSpinner } from './UI/LoadingSpinner';

/* eslint-disable react/jsx-props-no-spreading */

const AuthPromise = import('./Features/Authentication/Containers/Authentication');
const ProfilePromise = import('./Features/Profile/Components/profile');
const GroupPromise = import('./Features/Group/Components/group');
const AppPromise = import('./Features/App/Components/app');

ReactDOM.render(
  <>
    <Normalize />
    <Router>
      <Header />
      <Container fluid>
        <Switch>
          <Route exact path="/" component={Home} />
          <Suspense fallback={<LoadingSpinner />}>
            <Route path="/login" render={() => LazyPreload(AuthPromise)} />
            <Route path="/profile" render={() => LazyPreload(ProfilePromise)} />
            <Route path="/group" render={() => LazyPreload(GroupPromise)} />
            <Route path="/app" render={() => LazyPreload(AppPromise)} />
          </Suspense>
        </Switch>
      </Container>
    </Router>
  </>,
  document.getElementById('root'),
);

serviceWorker.unregister();

function LazyPreload(Component, props) {
  const LazyComponent = React.lazy(() => Component);
  return <LazyComponent {...props} />;
}
