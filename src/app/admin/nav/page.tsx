import type { Metadata } from "next"
import { Text } from "@julseb-lib/react"
import { AdminPage } from "components"
import { NavForm } from "./nav-form"

export const metadata: Metadata = {
	title: "Navigation",
}

export default function AdminNav() {
	return (
		<AdminPage>
			<Text tag="h1">Navigation</Text>
			<NavForm />
		</AdminPage>
	)
}
