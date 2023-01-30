import { redirect } from "react-router-dom";

export function getTokenDuration(){

    const storedExpirationDate = localStorage.getItem('expiration');
    const expirationDate = new Date(storedExpirationDate);
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();
    return duration;


  }

export function getAuthToken(){
    const token = localStorage.getItem('token');
    if(!token)
    {
        return null;
    }
    const tokenDuration = getTokenDuration();
    if(tokenDuration>0)
    {
        return token;
    }
    else
    {
        return 'EXPIRED';
    }

}

export function tokenLoader(){
    const token = getAuthToken();
    return token;
}

export function routeProtectionLoader(){
    const token = getAuthToken();
    if(!token)
    {
        return redirect('/auth?mode=login');
    }
    console.log('Nothing wrong with the loader i believe');
    return token;
}

export function loggedInRouteProtectorLoader(){
    const token = getAuthToken();
    if(token)
    {
        return redirect('/');
    }
}