import { NextResponse } from "next/server"
import { connectDb } from "lib/server"

export async function DELETE(req: Request) {
	await connectDb()

	try {

	} catch(err) {
		
	}
}
