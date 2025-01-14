import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define matchers for public routes and API routes
const isPublicRoute = createRouteMatcher([
    "/sign-in",
    "/sign-up",
    "/",
    "/home",
]);

const isPublicApiRoute = createRouteMatcher([
    "/api/video",
]);

export default clerkMiddleware(async (auth, req) => {
    const { userId } = await auth();
    const currentUrl = req.nextUrl; // Use req.nextUrl for easier parsing
    const pathname = currentUrl.pathname;

    const isAccessingDashboard = pathname === "/home";
    const isApiRequest = pathname.startsWith("/api");

    if (userId) {
        // Redirect authenticated users accessing public routes (except /home) to /home
        if (isPublicRoute(req) && !isAccessingDashboard) {
            return NextResponse.redirect(new URL("/home", req.url));
        }
    } else {
        // Redirect unauthenticated users trying to access non-public routes
        if (!isPublicRoute(req) && !isPublicApiRoute(req)) {
            return NextResponse.redirect(new URL("/sign-in", req.url));
        }

        // Redirect unauthenticated API requests if not public
        if (isApiRequest && !isPublicApiRoute(req)) {
            return NextResponse.redirect(new URL("/sign-in", req.url));
        }
    }

    // Allow other requests to pass through
    return NextResponse.next();
});

// Configure matcher
export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
