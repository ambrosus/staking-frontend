class StorageService {
  namespace = 'staking_';

  storage = localStorage;

  set(key, value) {
    this.storage.setItem(`${this.namespace}${key}`, JSON.stringify(value));
  }

  put(key, value) {
    if (!this.get(key)) {
      this.storage.setItem(`${this.namespace}${key}`, JSON.stringify(value));
    }
    return false;
  }

  get(key) {
    try {
      return JSON.parse(this.storage.getItem(`${this.namespace}${key}`));
    } catch (err) {
      return this.storage.getItem(`${this.namespace}${key}`);
    }
  }

  delete(key) {
    this.storage.removeItem(`${this.namespace}${key}`);
  }

  clear() {
    this.storage.clear();
  }
}
const storageService = new StorageService();
export default storageService;
