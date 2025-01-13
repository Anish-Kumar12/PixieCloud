import { clerkMiddleware , createRouteMatcher} from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher([
    "/signin",
    "/signup",
    "/",
    "/home"
])

const ispublicApiRoute = createRouteMatcher([
    "/api/videos"
])

export default clerkMiddleware(async (auth, req) => {
    const { userId } = await auth()
    const currenturl = new URL(req.url)
    const isAccessingDashboard = currenturl.pathname === "/home"
    const isApiRequest = currenturl.pathname.startsWith("api")

    if(userId && isPublicRoute(req) && !isAccessingDashboard) {
        return NextResponse.redirect(new URL("/home",req.url))
    }
    if(!userId ){
        if(!ispublicApiRoute(req) && !ispublicApiRoute(req)){
            return NextResponse.redirect(new URL("/signin",req.url))
        }
        if(!isApiRequest && ispublicApiRoute(req)){
            return NextResponse.redirect(new URL("/signin",req.url))
        
        }
    }

    return NextResponse.next()

})

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],

}