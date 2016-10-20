class Resources {
  constructor() {
    this.resourceCache = {};
    this.loading = [];
    this.readyCallbacks = [];

    this.load = this.load.bind(this);
    this._load = this._load.bind(this);
    this.get = this.get.bind(this);
    this.isReady = this.isReady.bind(this);
    this.onReady = this.onReady.bind(this);
  }

  load(arg) {
    const { _load } = this;
    arg.forEach(url => _load(url));
  }

  get(url) {
    return this.resourceCache[url];
  }

  isReady() {
    const { resourceCache } = this;
    let ready = true;
    for (let k in resourceCache) {
      if (resourceCache.hasOwnProperty(k) && !resourceCache[k]) {
        ready = false;
      }
    }
    return ready;
  }

  onReady(func) {
    this.readyCallbacks.push(func);
  }

  // private

  _load(url) {
    const { resourceCache, readyCallbacks, isReady } = this;

    if (resourceCache[url]) {
      return resourceCache[url];
    } else {
      const img = new Image();
      img.onload = () => {
        resourceCache[url] = img;

        if (isReady()) {
          readyCallbacks.forEach(callback => callback());
        }
      };
      resourceCache[url] = false;
      img.src = url;
    }
  }

}

const { load, get, onReady, isReady } = new Resources();
export default {
  load: load,
  get: get,
  onReady: onReady,
  isReady: isReady
};
