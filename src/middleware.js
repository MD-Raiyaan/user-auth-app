import { NextResponse } from "next/server";

export function middleware(request) {
  const path=request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value || "";
  const ispublic= path=='/login' || path=='/signup';
  if(ispublic && token){
     return NextResponse.redirect(new URL('/',request.nextUrl));
  }
  if(!ispublic && !token){
     return NextResponse.redirect(new URL('/login',request.nextUrl));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/login',
    '/',
    '/signup',
    '/profile/:id*',
    '/profile'
  ],
};
