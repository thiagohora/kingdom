import Validador from '../Validador'

export default class ViewValidator extends Validador {
    
    constructor(validator) {
        super(validator);
    }

    verify(view) {
      if (typeof view !== 'object')
        throw new Error(`View Error: Expecting an Object.`);
    
      if (!view.render)
        throw new Error(`View Error: View interface missing.`);
    }
} 