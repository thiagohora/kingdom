import Router, { RouteBuild } from 'core/router';
import RouteConfigValidator from 'core/validators/router/RouteConfigValidator';
import ViewValidator from 'core/validators/view/ViewValidator';

import { handleOnClick } from 'utils';
import './sass/main.scss';

import home from 'modules/home';

const routes = new Map();

const homeRoute = RouteBuild.newBuilder().withView(home).build('home');

routes.set(homeRoute.name, homeRoute);

const router = new Router(routes, new RouteConfigValidator(null, routes), new ViewValidator(null));

handleOnClick('nav a', (url) => router.load(url));

console.log('Running', router);