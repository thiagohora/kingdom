class Router {
  constructor(){
    console.log('Router');
    this.routes = {};
    this.container = '[data-view]';
    this.load = this.load.bind(this);
    this.init();
  }

  hashChanged() {
    if (window.location.hash.length > 0) {
      const name = window.location.hash.substr(1);
      this.render(this.routes[name]);
    }
  }

  route(name, params = {}) {

    routeValidator(name, params, this.routes);

    this.routes[name] = {
      path: params.path || name,
      view: params.view,
      controller: params.controller,
      query: params.query
    };
  }

  load(url) {
    console.log(url);

    const currentRoute = url || window.location.pathname;
    const route = this.routes[normalizeUrl(currentRoute)];
    if (route) {
      console.log('Found', route);
      ViewValidator(route.view);
      return;
      const el = document.querySelector(this.container);
      el.innerHTML = route.view.render();
    }

    console.log('Not found')
  }

  init() {
    console.log('Init Router');
  }
}

export default new Router();

function normalizeUrl(url) {
  return url.split('/')[1].split('?')[0];
}

function routeValidator(name, params, routes) {
  const err = [];

  if (routes[name])
    err.push(new Error(`Duplicated state: Route ${name} alredy defined.`));
  if(!name)
    err.push(new Error(`Missing Argument: You must inform the name of your Route.`));

  if (!params.view)
    err.push(new Error(`Missing View: Route "${name}" has no View defined.`));

  if(err.length) throw err[0];

  ViewValidator(params.view);

  return true;
}

function ViewValidator(view) {
  const err = [];

  if (typeof view !== 'object')
    err.push(new Error(`View Error: Expecting an Object.`));

  if (!view.render)
    err.push(new Error(`View Error: View interface missing.`));

  if (err.length) throw err[0];

  return true;
}