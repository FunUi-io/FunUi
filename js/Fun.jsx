export const FunHide = {
    hide: (selector) => {
        var element  = document.querySelector(selector)
        element.style.display = "none"
    }
    ,
    show:(selector) => {
        var element  = document.querySelector(selector)
        element.style.display = "inline-block"
    }
    ,
    toggle: (selector) => {
        var element  = document.querySelector(selector)
        var style = element.style.display
        if (style == "none") {
            element.style.display = "inline-block"
        }else{
            element.style.display = "none"
        }

    }
}


export const FunGet = {
    text : (selector, data)=>{
        var element  = document.querySelector(selector)
        if(typeof(element) != 'undefined' && element != null){
            var text = element.textContent 
            if(data){
                element.textContent = data
            }else{
            return text ? text : ''
            }
        } 
    
    },
    html: (selector ,  data)=> {
        var element  = document.querySelector(selector)
        if(typeof(element) != 'undefined' && element != null){
            var text = element.innerHTML 
            if(data){
                element.innerHTML = data
            }else{
            return text ? text : ""
            }
        } 
   
    },
    val: (selector ,  data)=> {
        var element  = document.querySelector(selector)
        if(typeof(element) != 'undefined' && element != null){
        var text = element.value 
        if(data){
            element.value = data
        }else{
        return text
        }
    }
}
}

    export const FunStyle = {
    css: (selector , css)=>{
    // Get the element you want to style
    const element = document.querySelector(selector);

    // Define multiple styles using JavaScript objects
    const styles = css

    // Apply the styles to the element
    Object.assign(element.style, styles);

    }
    }


    export const FunEvent = {
        event : (selector , eventType, callBack) =>{
            const element = document.querySelector(selector);
          if(selector && eventType && callBack){
            if(typeof(element) != 'undefined' && element != null){
                document.querySelector(selector).addEventListener(eventType , callBack)
            } 
          }
        }
    }
    export const FunClass = {
        add : (selector , newClass) =>{
            const element = document.querySelector(selector);
            if(typeof(element) != 'undefined' && element != null && newClass){
                element.classList.add(newClass);
            } 
        },
        remove : (selector , newClass) =>{
            const element = document.querySelector(selector);
            if(typeof(element) != 'undefined' && element != null && newClass){
                element.classList.remove(newClass);
            } 
        }
    }

   export const FunAdd = {
    append: (selector , child) =>{
        const element = document.querySelector(selector);
        if(typeof(element) != 'undefined' && element != null && child){
            element.append(child)
        } 
    },
    prepend: (selector , child) =>{
        const element = document.querySelector(selector);
        if(typeof(element) != 'undefined' && element != null && child){
            element.prepend(child)
        } 
    }
   }


   export const FunRequest = {
    get: (url, headers) => {
      return new Promise((resolve, reject) => {
        fetch(url, headers ? { headers: headers } : {})
          .then(response => response.json())
          .then(data => {
            // Handle the received data
            resolve(data);
          })
          .catch(error => {
            // Handle any errors that occur during the request
            reject(error);
          });
      });
    },
    post: (url, body, headers) => {
        return new Promise((resolve, reject) => {
          fetch(url, {
            method: 'POST',
            headers: headers ? { ...headers, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
          })
            .then(response => response.json())
            .then(data => {
              // Handle the received data
              resolve(data);
            })
            .catch(error => {
              // Handle any errors that occur during the request
              reject(error);
            });
        });
      },
      patch: (url, body, headers) => {
        return new Promise((resolve, reject) => {
          fetch(url, {
            method: 'PATCH',
            headers: headers ? { ...headers, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
          })
            .then(response => response.json())
            .then(data => {
              // Handle the received data
              resolve(data);
            })
            .catch(error => {
              // Handle any errors that occur during the request
              reject(error);
            });
        });
      },
    
      delete: (url, headers) => {
        return new Promise((resolve, reject) => {
          fetch(url, {
            method: 'DELETE',
            headers: headers ? headers : {}
          })
            .then(response => {
              if (response.ok) {
                resolve(); // Resolve with no data for successful DELETE requests
              } else {
                reject(`Error: ${response.status} ${response.statusText}`);
              }
            })
            .catch(error => {
              // Handle any errors that occur during the request
              reject(error);
            });
        });
      }
  };
  
export const FunQuery = {
  query: (data , fields)=>{
    return new Promise((resolve, reject) => {
        if (Array.isArray(data)) {
          resolve(data.filter(item => applyFilter(item, fields)))
        } else if (typeof data === 'object') {
          const filteredData = {};
          for (let key in data) {
            if (applyFilter(data[key], fields)) {
              filteredData[key] = data[key];
            }
          }
          resolve(filteredData)
        } else {
          reject('Invalid data type. Expected an array or object.');
        }
      
      function applyFilter(item, fields) {
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
      
    })
  }
}