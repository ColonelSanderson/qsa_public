import React, {useState, useEffect} from 'react';
import {Http} from '../utils/http';
import AppContext from './AppContext';

class SessionCookie {
  private static COOKIE_NAME = 'archives_search_session';

  static loadSessionFromCookie(): string | null {
    for (const cookie of document.cookie.split(';')) {
      if (cookie.trim().startsWith(`${SessionCookie.COOKIE_NAME}=`)) {
        return cookie.trim().split("=")[1];
      }
    }

    return null;
  }

  static clearSessionCookie() {
    document.cookie = `${SessionCookie.COOKIE_NAME}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
}


const AppContextProvider: React.FC<any> = (props) => {
  const [appContext, setAppContext]: [any, any] = useState({})

  /* Configure our initial state */
  useEffect(() => {
    const existingSession = SessionCookie.loadSessionFromCookie();

    setAppContext(Object.assign({}, {
      initialised: true,
      sessionLoaded: !existingSession,
      cart: null,
      user: null,
      sessionId: existingSession,

      /* Update the currently logged in user */
      setUser: (user: any) => {
        setAppContext((oldState: any) => Object.assign({}, oldState, { user: user }));
      },

      /* Record the current user session token */
      setSessionId: (sessionId: string) => {
        const isSecure = window.location.protocol === 'https:' ? ';secure' : '';
        document.cookie = `archives_search_session=${sessionId};samesite=strict${isSecure}`

        Http.login(sessionId);

        setAppContext((oldState: any) => {
          return Object.assign({}, oldState, { sessionId: sessionId })
        });
      },

      /* Mark the session loading process as complete or not */
      setSessionLoaded: (value: boolean) => {
        setAppContext((oldState: any) => {
          return Object.assign({}, oldState, { sessionLoaded: value })
        });
      },

      /* Log out the current user */
      clearSession: () => {
        Http.logout();
        SessionCookie.clearSessionCookie();

        setAppContext((oldState: any) => {
          return Object.assign({}, oldState, { sessionId: null, sessionLoaded: true, user: null })
        });
      },

    }));
  }, []);


  /* If a child component sets a new session ID, fetch the current user */
  useEffect(() => {
    if (!appContext.initialised) {
      /* Wait for our initial state to turn up. */
      return;
    }

    if (appContext.sessionId) {
      Http.login(appContext.sessionId);

      Http.get().getCurrentUser().then((response) => {
        appContext.setUser(response.data);
        appContext.setSessionLoaded(true);
      }, () => {
        appContext.clearSession();
      });
    } else {
      appContext.clearSession();
    }
  }, [appContext.initialised, appContext.sessionId]);

  return <AppContext.Provider value={ appContext }>{ props.children }</AppContext.Provider>;
};


export default AppContextProvider;
