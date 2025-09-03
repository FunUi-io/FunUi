interface ExpirationDuration {
    years?: number;
    months?: number;
    days?: number;
}
interface CookieOptions {
    duration?: ExpirationDuration;
    path?: string;
    secure?: boolean;
    sameSite?: 'Strict' | 'Lax' | 'None';
}
declare const Cookie: (name: string) => {
    /**
     * Save a value as a cookie
     * @param value - Any JSON-serializable object
     * @param options - Expiration and cookie settings
     */
    save: (value: any, options?: CookieOptions) => Promise<void>;
    /**
     * Get and parse the cookie
     */
    get: () => Promise<any>;
    /**
     * Remove the cookie by setting its expiration to the past
     */
    remove: () => Promise<void>;
};
export default Cookie;
