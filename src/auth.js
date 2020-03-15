import createAuth0Client from '@auth0/auth0-spa-js';
import authConfig from './auth_config.json';

let auth0 = null;

const configureClient = async () => {
  auth0 = await createAuth0Client({
    domain: authConfig.domain,
    client_id: authConfig.clientId
  });
};

export const getCurrentUser = async () => {
  return await auth0.getUser();
};

export const login = async () => {
  console.log('login with redir');

  await auth0.loginWithRedirect({
    redirect_uri: window.location.origin
  });
};

export const logout = async () => {
  try {
    if (!(await auth0.isAuthenticated())) {
      console.log('nem ta logado');
      return;
    }
    auth0.logout({
      returnTo: window.location.origin
    });
  } catch (e) {
    console.log(auth0, 'logout error', e);
  }
};

export const authenticate = async () => {
  await configureClient();

  const query = window.location.search;
  if (query.includes("code=") && query.includes("state=")) {
    try {
      await auth0.handleRedirectCallback();
      // Use replaceState to redirect the user away and remove the querystring parameters
      window.history.replaceState({}, document.title, "/");
    } catch (err) {
      console.error("Error parsing redirect:", err);
    }
  }

  return await auth0.isAuthenticated();
};