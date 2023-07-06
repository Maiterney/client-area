import { NextRequest, NextResponse } from "next/server";
export async function middleware(req: NextRequest) {
    const urlBase = req.nextUrl.pathname
    const res = NextResponse.next();
    const tokenVerify = req.cookies.has('nextAuth.token')
    if (!urlBase.includes(".")) {
        if (!tokenVerify) {
            res.cookies.set("previous", urlBase, {
                httpOnly: false,
                domain: `${process.env.NEXT_PUBLIC_DOMAIN}`
            });
            res.cookies.set("type", 'client', {
                httpOnly: false,
                domain: `${process.env.NEXT_PUBLIC_DOMAIN}`
            });
        }
    }
    return res;
}