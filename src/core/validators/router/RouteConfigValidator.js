import Validador from '../Validador'

export default class RouteConfigValidator extends Validador {
    
    constructor(validator, routes) {
        super(validator);
        this.routes = routes;
    }

    verify(route) {
      if(!route.name)
        throw new Error(`Missing Argument: You must inform the name of your Route.`);
      if (routes.get(route.name))
        throw new Error(`Duplicated state: Route ${route.name} alredy defined.`);
      if (!route.view)
        throw new Error(`Missing View: Route "${route.name}" has no View defined.`);
    }
} 