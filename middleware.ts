import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define allowed public routes
const isPublicRoute = (pathname: string) => ["/sign-in", "/sign-up"].includes(pathname);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const currentUrl = req.nextUrl;
  const pathname = currentUrl.pathname;

  if (userId) {
    // Redirect authenticated users trying to access sign-in or sign-up pages
    if (isPublicRoute(pathname)) {
      return NextResponse.redirect(new URL("/home", req.url));
    }
  } else {
    // Redirect unauthenticated users trying to access non-public routes
    if (!isPublicRoute(pathname)) {
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
