import { redirect } from "react-router-dom";

//No component here.
export function action(){
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    return redirect('/');

}