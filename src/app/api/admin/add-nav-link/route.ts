import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function POST(req: Request) {
	try {
		const { title, href, type } = await req.json()

		const url = href[0] === "/" ? href : `/${href}`

		const navLinksPath = path.join(process.cwd(), "src/data/nav-links.tsx")
		const fileContent = fs.readFileSync(navLinksPath, "utf-8")

		const newNavLink = `\t{ title: "${title}", href: "${url}", type: "${type}" },`

		const navLinksArrayRegex =
			/(export const navLinks: Array<NavLink> = \[\n)([\s\S]*?)(\n\])/
		const match = fileContent.match(navLinksArrayRegex)

		if (!match) {
			return NextResponse.json(
				{ error: "Could not find navLinks array in file" },
				{ status: 500 },
			)
		}

		const updatedContent = fileContent.replace(
			navLinksArrayRegex,
			`$1$2\n${newNavLink}$3`,
		)

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
