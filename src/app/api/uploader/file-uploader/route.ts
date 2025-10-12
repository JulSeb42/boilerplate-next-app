import { NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import multer from "multer"
import "dotenv/config"

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_KEY,
	api_secret: process.env.CLOUDINARY_SECRET,
})

const storage = new CloudinaryStorage({
	cloudinary,
	params: {
		// @ts-expect-error
		allowed_formats: ["jpg", "png", "svg"],
		folder: "julseb-lib-fullstack",
	},
})

export const fileUploader = multer({ storage })

export async function PUT(req: Request) {
	try {
		if (
			!process.env.CLOUDINARY_NAME ||
			!process.env.CLOUDINARY_KEY ||
			!process.env.CLOUDINARY_SECRET
		) {
			console.error("❌ Missing Cloudinary configuration")
			return NextResponse.json(
				{
					errorMessage:
						"Server configuration error: Missing Cloudinary credentials",
				},
				{ status: 500 },
			)
		}

		const formData = await req.formData()
		const file = formData.get("image") as File

		if (!file) {
			console.error("❌ No file uploaded")
			return NextResponse.json(
				{
					errorMessage: "No file uploaded",
				},
				{ status: 400 },
			)
		}

		// Convert File to Buffer for Cloudinary upload
		const bytes = await file.arrayBuffer()
		const buffer = Buffer.from(bytes)

		// Upload to Cloudinary (you'll need to adapt your cloudinary config)
		const uploadResult = await new Promise((resolve, reject) => {
			cloudinary.uploader
				.upload_stream(
					{ resource_type: "auto" },
					(error: any, result: any) => {
						if (error) reject(error)
						else resolve(result)
					},
				)
				.end(buffer)
		})

		return NextResponse.json({
			image_url: (uploadResult as any).secure_url,
		})
	} catch (error) {
		console.error("❌ Upload error:", error)
		return NextResponse.json(
			{ errorMessage: "Upload failed" },
			{ status: 500 },
		)
	}
}
