export class RouteBuild {

  static newBuilder() {
    return new RouteBuild();
  }

  withPath(path) {
    this.path = path
    return this;
  }

  withController(controller) {
    this.controller = controller
    return this;
  }

  withView(view) {
    this.view = view
    return this;
  }

  withQuery(query) {
    this.query = query
    return this;
  }
  
  build(name) {
    return Object.assign({}, this, {path: this.path || name, name });
  }
}

export default class Router {

  constructor(routes, routeValidator, viewValidator, container = '[data-view]'){
    console.log('initializiing Router');
    this.routes = routes;
    this.routeValidator = routeValidator;
    this.viewValidator = viewValidator;
    this.container = container;
    this.init();
  }

  hashChanged() {
    if (window.location.hash.length > 0) {
      const name = window.location.hash.substr(1);
      this.render(this.routes.get(name));
    }
  }

  route(route) {
    this.routeValidator.validate(route);
    this.viewValidator.validate(route.view)
    this.routes.set(route.name, route);
  }

  load(url) {
    console.log(url);

    const currentRoute = url || window.location.pathname;
    const route = this.routes.get(normalizeUrl(currentRoute));
    
    if (!route) {
      console.log('Not found');
      return;
    }

    console.log('Found', route);
    this.viewValidator.validate(route.view);
    const el = document.querySelector(this.container);
    el.innerHTML = route.view.render();
  }
  
  init() {
    console.log('Init Router');
  }
}

function normalizeUrl(url) {
  return url.split('/')[1].split('?')[0];
}