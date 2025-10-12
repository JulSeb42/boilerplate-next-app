import { NextResponse } from "next/server"
import { connectDb, verifyAccessToken, ServerCookies } from "lib/server"
import { UserModel } from "models"

export async function PUT(
	req: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	await connectDb()

	try {
		const { id } = await params

		if (!id) {
			return NextResponse.json(
				{ message: "User ID is required" },
				{ status: 400 },
			)
		}

		// Verify user authentication
		const token = await ServerCookies.getAuthToken()

		if (!token) {
			return NextResponse.json(
				{ message: "Authentication required" },
				{ status: 401 },
			)
		}

		let decodedToken

		try {
			decodedToken = verifyAccessToken(token) as any
		} catch {
			return NextResponse.json(
				{ message: "Invalid authentication token" },
				{ status: 401 },
			)
		}

		// Ensure user can only edit their own account
		if (decodedToken.userId !== id) {
			return NextResponse.json(
				{ message: "Not authorized to edit this account" },
				{ status: 403 },
			)
		}

		const { fullName, avatar } = await req.json()

		// Validate input
		if (!fullName || fullName.trim().length === 0) {
			return NextResponse.json(
				{ message: "Full name is required" },
				{ status: 400 },
			)
		}

		// Update user in database
		const updatedUser = await UserModel.findByIdAndUpdate(
			id,
			{
				fullName: fullName.trim(),
				...(avatar && { avatar }),
			},
			{
				new: true, // Return updated document
				runValidators: true,
				select: "-password -resetToken -verifyToken", // Exclude sensitive fields
			},
		)

		if (!updatedUser) {
			return NextResponse.json(
				{ message: "User not found" },
				{ status: 404 },
			)
		}

		return NextResponse.json(
			{
				user: updatedUser,
				message: "Account updated successfully",
			},
			{ status: 200 },
		)
	} catch (err: any) {
		console.error("❌ Edit account error:", err)
		return NextResponse.json(
			{ message: "Failed to update account" },
			{ status: 500 },
		)
	}
}
