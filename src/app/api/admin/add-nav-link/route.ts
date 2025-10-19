import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function POST(req: Request) {
	try {
		const { title, href, type } = await req.json()

		// Validate input
		// if (!title || !href || !type) {
		// 	return NextResponse.json(
		// 		{ error: "Missing required fields: title, href, type" },
		// 		{ status: 400 },
		// 	)
		// }

		// Validate type
		// const validTypes = ["none", "anon", "protected", "admin"]
		// if (!validTypes.includes(type)) {
		// 	return NextResponse.json(
		// 		{
		// 			error: "Invalid type. Must be one of: none, anon, protected, admin",
		// 		},
		// 		{ status: 400 },
		// 	)
		// }

		const url = href[0] === "/" ? href : `/${href}`

		// Read current nav-links file
		const navLinksPath = path.join(process.cwd(), "src/data/nav-links.tsx")
		const fileContent = fs.readFileSync(navLinksPath, "utf-8")

		// Create new nav link object
		const newNavLink = `\t{ title: "${title}", href: "${url}", type: "${type}" },`

		// Find the navLinks array and add the new item before the closing bracket
		const navLinksArrayRegex =
			/(export const navLinks: Array<NavLink> = \[\n)([\s\S]*?)(\n\])/
		const match = fileContent.match(navLinksArrayRegex)

		if (!match) {
			return NextResponse.json(
				{ error: "Could not find navLinks array in file" },
				{ status: 500 },
			)
		}

		// Insert the new nav link
		const updatedContent = fileContent.replace(
			navLinksArrayRegex,
			`$1$2\n${newNavLink}$3`,
		)

		// Write the updated content back to the file
		fs.writeFileSync(navLinksPath, updatedContent, "utf-8")

		return NextResponse.json(
			{
				message: "Nav link added successfully",
				navLink: { title, href, type },
			},
			{ status: 201 },
		)
	} catch (error) {
		console.error("Error adding nav link:", error)
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		)
	}
}
