export const FunHide = {
  hide: (selector = "") => {
      var element: HTMLElement | null = document.querySelector(selector);
      if (element) {
          element.style.display = "none";
      }
  },
  show: (selector = "") => {
      var element: HTMLElement | null = document.querySelector(selector);
      if (element) {
          element.style.display = "inline-block";
      }
  },
  toggle: (selector = "") => {
      var element: HTMLElement | null = document.querySelector(selector);
      if (element) {
          var style = element.style.display;
          element.style.display = style === "none" ? "inline-block" : "none";
      }
  }
};
export const FunVisible = {
    hide: (selector = "") => {
        var element: HTMLElement | null = document.querySelector(selector);
        if (element) {
            element.style.visibility = "hidden";
        }
    },
    show: (selector = "") => {
        var element: HTMLElement | null = document.querySelector(selector);
        if (element) {
            element.style.visibility = "visible";
        }
    },
    toggle: (selector = "") => {
        var element: HTMLElement | null = document.querySelector(selector);
        if (element) {
            var style = element.style.visibility;
            element.style.visibility = style === "hidden" ? "visible" : "hidden";
        }
    }
  };
export const FunGet = {
  text: (selector = "", data?: string) => {
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
  html: (selector = "", data?: string) => {
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
  val: (selector = "", data?: string) => {
      var element: HTMLInputElement | null = document.querySelector(selector);
 if (element) {
  var text = element.value;
  if (data !== undefined && data !== null) {
    element.value = data === '' ? '' : data;
  } else {
    return text;
  }
}

  },
};

export const FunStyle = {
  css: (selector = "", css?: {}) => {
      const element: HTMLElement | null = document.querySelector(selector);
      if (element) {
          Object.assign(element.style, css);
      }
  },
};


export const FunEvent = {
  event: (selector = "", eventType?: string, callBack?: EventListenerOrEventListenerObject | null) => {
      const element = document.querySelector(selector);
      if (element && eventType && callBack) {
          element.addEventListener(eventType, callBack);
      }
  },
};

export const FunClass = {
  add: (selector = "", newClass?: string) => {
      const element = document.querySelector(selector);
      if (element && newClass) {
          element.classList.add(newClass);
      }
  },
  remove: (selector = "", newClass?: string) => {
      const element = document.querySelector(selector);
      if (element && newClass) {
          element.classList.remove(newClass);
      }
  },
};

export const FunAdd = {
  append: (selector = '', child?: Node | null) => {
      const element = document.querySelector(selector);
      if (element && child) {
          element.append(child);
      }
  },
  prepend: (selector = "", child?: Node | null) => {
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

interface QueryFields {
  [key: string]: any;
}

export const FunQuery = {
  query: (data: any, fields: QueryFields = {}) => {
    return new Promise((resolve, reject) => {
      // Validate input
      if (typeof fields !== 'object' || fields === null) {
        return reject('Invalid filter criteria. Expected an object.');
      }

      const applyFilter = (item: any, filters: QueryFields) => {
        for (let key in filters) {
          if (item[key] !== filters[key]) {
            return false;
          }
        }
        return true;
      };

      try {
        if (Array.isArray(data)) {
          const result = data.filter(item => applyFilter(item, fields));
          resolve(result);
        } else if (typeof data === 'object' && data !== null) {
          const filteredObject: Record<string, any> = {};
          for (let key in data) {
            if (applyFilter(data[key], fields)) {
              filteredObject[key] = data[key];
            }
          }
          resolve(filteredObject);
        } else {
          reject('Invalid data type. Expected an array or object.');
        }
      } catch (error) {
        reject(error);
      }
    });
  }
};



