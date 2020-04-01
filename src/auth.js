import createAuth0Client from '@auth0/auth0-spa-js';
import authConfig from './auth_config.json';

export const configureClient = async () => await createAuth0Client({
  domain: authConfig.domain,
  client_id: authConfig.clientId,
  audience: authConfig.audience
});

export class Auth {
  constructor(client) {
    this.client = client;
  }

  async getCurrentUser() {
    return await this.client.getUser();
  }

  async getAuthToken() {
    return await this.client.getTokenSilently();
  }

  async login() {
    await this.client.loginWithRedirect({
      redirect_uri: window.location.origin
    });
  }

  async logout() {
    try {
      if (!await this.client.isAuthenticated()) {
        return;
      }
      this.client.logout({
        returnTo: window.location.origin
      });
    } catch (e) {
      console.log('Logout error', e);
    }
  }

  async authenticate() {
    const query = window.location.search;
    if (query.includes("code=") && query.includes("state=")) {
      try {
        await this.client.handleRedirectCallback();
        // Use replaceState to redirect the user away and remove the querystring parameters
        window.history.replaceState({}, document.title, "/");
      } catch (err) {
        console.error("Error parsing redirect", err);
      }
    }
    return await this.client.isAuthenticated();
  }
}