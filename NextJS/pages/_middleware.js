import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import Constants from '../Support/Constants';

export async function middleware(req, ev) {

    const cookies = req.cookies || "";
    const allPaths = ['/profile', '/messages', '/settings', '/logout'];

    const { pathname } = req.nextUrl;

    //only in login and register routes
    
    if(pathname === "/login" || pathname === "/register"){

        if(cookies.token !== undefined){

            let isLoggedIn = await fetch(Constants.apiUrl + "isloggedin", {
                headers: {
                    Cookie: `token=${cookies.token};`
                }
            });

            let resp = await isLoggedIn.json();

            if(resp.isLoggedIn){
                return NextResponse.redirect('/profile');
            }
            else{
                return NextResponse.next();
            }

        }

    }
    else if(allPaths.includes(pathname)){

        //if token cookie not avail redirect to login
        if(cookies.token === undefined){
            return NextResponse.redirect('/login');
        }

        //if token cookie avail validate session from server
        let isLoggedIn = await fetch(Constants.apiUrl + "isloggedin", {
            headers: {
                Cookie: `token=${cookies.token};`
            }
        });

        let resp = await isLoggedIn.json();

        if(!resp.isLoggedIn){
            return NextResponse.redirect('/login');
        }
        else{
            return NextResponse.next();
        }

    }
    else{

        return NextResponse.next();

    }


    

  }