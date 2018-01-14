export default class Page {

  constructor(template) {
    this.template = template;
    
    if(!this.template) {
      throw new Error(`Template not found or empty`);
    }
  }

  render() {
    return this.template;
  }
}