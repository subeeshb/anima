class CookieUtils {
  /**
   * Sets a cookie with the specified name, value, and expiration date.
   * @param name - The name of the cookie.
   * @param value - The string value to be stored in the cookie.
   * @param expires - The Date object indicating when the cookie will expire.
   */
  static setCookie(name: string, value: string, expires: Date): void {
    const expiresString = expires.toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expiresString}; path=/`;
  }

  /**
   * Retrieves the value of the specified cookie by name.
   * @param name - The name of the cookie to retrieve.
   * @returns The string value of the cookie, or null if the cookie does not exist.
   */
  static getCookie(name: string): string | null {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split("=");
      if (cookieName === name) {
        return decodeURIComponent(cookieValue);
      }
    }
    return null; // Return null if the cookie is not found
  }

  /**
   * Deletes a cookie by setting its expiration date to a past date.
   * @param name - The name of the cookie to delete.
   */
  static deleteCookie(name: string): void {
    // Set the expiration date to a past date
    const pastDate = new Date(0);
    document.cookie = `${name}=; expires=${pastDate.toUTCString()}; path=/`;
  }
}

export default CookieUtils;
