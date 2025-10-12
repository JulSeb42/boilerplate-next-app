import { NextResponse } from "next/server"

export async function POST() {
	const res = NextResponse.json({ success: true })

	res.cookies.set("access_token", "", {
		httpOnly: true,
		path: "/",
		maxAge: 0,
	})

	res.cookies.set("refresh_token", "", {
		httpOnly: true,
		path: "/",
		maxAge: 0,
	})

	res.cookies.set("auth_status", "", {
		httpOnly: false,
		path: "/",
		maxAge: 0,
	})

	return res
}
