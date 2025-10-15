import { NextResponse } from "next/server"
import { connectDb } from "lib/server"
import { UserModel } from "models"

export async function GET(req: Request) {
	await connectDb()

	try {
		const { searchParams } = new URL(req.url)
		const page = Number(searchParams.get("page")) ?? 1
		const limit = Number(searchParams.get("limit")) ?? 12

		if (page) {
			const skip = (page - 1) * limit

			const users = await UserModel.find()
				.select("-password")
				.skip(skip)
				.limit(limit)
			// .sort({
			// 	createdAt: -1, // Latest users first
			// 	_id: -1, // Use _id as secondary sort for consistent ordering
			// })

			const totalUsers = await UserModel.countDocuments()
			const totalPages = Math.ceil(totalUsers / limit)
			const hasMore = page < totalPages

			return NextResponse.json(
				{
					users,
					pagination: {
						currentPage: page,
						totalPages,
						totalUsers,
						hasMore,
						limit,
					},
				},
				{ status: 200 },
			)
		}

		const users = await UserModel.find()

		return NextResponse.json(users, { status: 200 })
	} catch (err) {
		console.error("Error fetching users:", err)
		return NextResponse.json(
			{ error: "Failed to fetch users" },
			{ status: 500 },
		)
	}
}
