interface ExpirationDuration {
  years?: number;
  months?: number;
  days?: number;
}

interface CookieOptions {
  duration?: ExpirationDuration; // Expiration duration
  path?: string;
  secure?: boolean;
  sameSite?: 'Strict' | 'Lax' | 'None';
}

const Cookie = (name: string) => {
  return {
    /**
     * Save a value as a cookie
     * @param value - Any JSON-serializable object
     * @param options - Expiration and cookie settings
     */
    save: (value: any, options: CookieOptions = {}) => {
      return new Promise<void>((resolve, reject) => {
        try {
          const stringValue = JSON.stringify(value);
          const {
            duration = { days: 30 },
            path = '/',
            secure = false,
            sameSite = 'Lax',
          } = options;

          // Create expiration date
          const expirationDate = new Date();
          if (duration.years) expirationDate.setFullYear(expirationDate.getFullYear() + duration.years);
          if (duration.months) expirationDate.setMonth(expirationDate.getMonth() + duration.months);
          if (duration.days) expirationDate.setDate(expirationDate.getDate() + duration.days);

          // Build cookie string
          let cookieString = `${name}=${encodeURIComponent(stringValue)}; expires=${expirationDate.toUTCString()}; path=${path}; SameSite=${sameSite}`;
          if (secure) cookieString += '; Secure';

          document.cookie = cookieString;

          resolve();
        } catch (error) {
          reject({ status: 'error', message: error });
        }
      });
    },

    /**
     * Get and parse the cookie
     */
    get: (): Promise<any> => {
      return new Promise((resolve, reject) => {
        try {
          const cookies = document.cookie.split(';');
          for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(name + '=')) {
              const value = decodeURIComponent(cookie.substring(name.length + 1));
              return resolve(JSON.parse(value));
            }
          }
          reject(`${name} cookie not found or has expired.`);
        } catch (error) {
          reject({ status: 'error', message: error });
        }
      });
    },

    /**
     * Remove the cookie by setting its expiration to the past
     */
    remove: (): Promise<void> => {
      return new Promise((resolve, reject) => {
        try {
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
          resolve();
        } catch (error) {
          reject({ status: 'error', message: error });
        }
      });
    },
  };
};




export default Cookie;