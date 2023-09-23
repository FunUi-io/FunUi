export const FunHide = {
  hide: (selector?: string) => {
      var element: HTMLElement | null = document.querySelector(selector);
      if (element) {
          element.style.display = "none";
      }
  },
  show: (selector?: string) => {
      var element: HTMLElement | null = document.querySelector(selector);
      if (element) {
          element.style.display = "inline-block";
      }
  },
  toggle: (selector?: string) => {
      var element: HTMLElement | null = document.querySelector(selector);
      if (element) {
          var style = element.style.display;
          element.style.display = style === "none" ? "inline-block" : "none";
      }
  }
};

export const FunGet = {
  text: (selector?: string, data?: string) => {
      var element: HTMLElement | null = document.querySelector(selector);
      if (element) {
          var text = element.textContent;
          if (data) {
              element.textContent = data;
          } else {
              return text ? text : "";
          }
      }
  },
  html: (selector?: string, data?: string) => {
      var element: HTMLElement | null = document.querySelector(selector);
      if (element) {
          var text = element.innerHTML;
          if (data) {
              element.innerHTML = data;
          } else {
              return text ? text : "";
          }
      }
  },
  val: (selector?: string, data?: string) => {
      var element: HTMLInputElement | null = document.querySelector(selector);
      if (element) {
          var text = element.value;
          if (data) {
              element.value = data;
          } else {
              return text;
          }
      }
  },
};

export const FunStyle = {
  css: (selector?: string, css?: {}) => {
      const element: HTMLElement | null = document.querySelector(selector);
      if (element) {
          Object.assign(element.style, css);
      }
  },
};


export const FunEvent = {
  event: (selector?: string, eventType?: string, callBack?: EventListenerOrEventListenerObject | null) => {
      const element = document.querySelector(selector);
      if (element && eventType && callBack) {
          element.addEventListener(eventType, callBack);
      }
  },
};

export const FunClass = {
  add: (selector?: string, newClass?: string) => {
      const element = document.querySelector(selector);
      if (element && newClass) {
          element.classList.add(newClass);
      }
  },
  remove: (selector?: string, newClass?: string) => {
      const element = document.querySelector(selector);
      if (element && newClass) {
          element.classList.remove(newClass);
      }
  },
};

export const FunAdd = {
  append: (selector?: string, child?: Node | null) => {
      const element = document.querySelector(selector);
      if (element && child) {
          element.append(child);
      }
  },
  prepend: (selector?: string, child?: Node | null) => {
      const element = document.querySelector(selector);
      if (element && child) {
          element.prepend(child);
      }
  },
};

export const FunRequest = {
  get: (url: string, headers?: HeadersInit) => {
      return new Promise((resolve, reject) => {
          fetch(url, headers ? { headers: headers } : {})
              .then((response) => response.json())
              .then((data) => {
                  resolve(data);
              })
              .catch((error) => {
                  reject(error);
              });
      });
  },
  post: (url: string, body?: any, headers?: HeadersInit) => {
      return new Promise((resolve, reject) => {
          fetch(url, {
              method: 'POST',
              headers: headers ? { ...headers, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' },
              body: JSON.stringify(body),
          })
              .then((response) => response.json())
              .then((data) => {
                  resolve(data);
              })
              .catch((error) => {
                  reject(error);
              });
      });
  },
  patch: (url: string, body?: any, headers?: HeadersInit) => {
      return new Promise((resolve, reject) => {
          fetch(url, {
              method: 'PATCH',
              headers: headers ? { ...headers, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' },
              body: JSON.stringify(body),
          })
              .then((response) => response.json())
              .then((data) => {
                  resolve(data);
              })
              .catch((error) => {
                  reject(error);
              });
      });
  },

  delete: (url: string, headers?: HeadersInit) => {
      return new Promise((resolve, reject) => {
          fetch(url, {
              method: 'DELETE',
              headers: headers ? headers : {},
          })
              .then((response) => {
                  if (response.ok) {
                      resolve("");
                  } else {
                      reject(`Error: ${response.status} ${response.statusText}`);
                  }
              })
              .catch((error) => {
                  reject(error);
              });
      });
  },
};

export const FunQuery = {
  query: (data: any, fields?: {}) => {
      return new Promise((resolve, reject) => {
          if (Array.isArray(data)) {
              resolve(data.filter((item) => applyFilter(item, fields)));
          } else if (typeof data === 'object') {
              const filteredData = {};
              for (let key in data) {
                  if (applyFilter(data[key], fields)) {
                      filteredData[key] = data[key];
                  }
              }
              resolve(filteredData);
          } else {
              reject('Invalid data type. Expected an array or object.');
          }

          function applyFilter(item: any, fields: {}) {
              if (typeof fields !== 'object') {
                  reject('Invalid filter criteria. Expected an object.');
              }

              for (let key in fields) {
                  if (item[key] !== fields[key]) {
                      return false;
                  }
              }

              return true;
          }
      });
  },
};
