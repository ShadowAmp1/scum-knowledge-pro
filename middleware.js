import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(request) {
  // Handle static files
  if (request.nextUrl.pathname.startsWith('/_next/static/')) {
    return NextResponse.next();
  }
  
  // Handle public files
  if (request.nextUrl.pathname.startsWith('/_next/')) {
    return NextResponse.next();
  }
  
  return NextResponse.next();
}
