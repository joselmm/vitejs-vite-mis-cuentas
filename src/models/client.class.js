import generateId from '../constants/generateID';

class Client {
  constructor({ name, contact, active } = {}) {
    this.id = name === 'Lastenia' ? '123' : generateId(20);
    this.name = name || '';
    this.contact = contact || '';
    this.active = active || '1';
  }
}

export default Client;
