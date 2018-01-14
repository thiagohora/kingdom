import Router from 'core/router';
import { handleOnClick } from 'utils';
import './sass/main.scss';

handleOnClick('nav a', Router.load);

const render = () => {};

Router.route('home', {view: {render}});
Router.route('favorites', { view: {render} });
console.log('Running', Router);