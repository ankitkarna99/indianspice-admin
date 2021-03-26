export default abstract class LocalStorageService {
  private static ACCESS_TOKEN: string = "INDIAN_SPICE_ACCESS_TOKEN";

  static clearTokens() {
    localStorage.clear();
  }

  static setAccessToken(token: string): void {
    localStorage.setItem(this.ACCESS_TOKEN, token);
  }

  static getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN);
  }
}
