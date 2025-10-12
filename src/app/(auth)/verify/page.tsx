import type { Metadata } from "next"
import { Text } from "@julseb-lib/react"
import { Page } from "components"
import { VerifyPage } from "./verify-page"

export const metadata: Metadata = {
	title: "Verify",
}

export default function Verify() {
	return (
		<Page type="none">
			<Text tag="h1">Verify your account</Text>
			<VerifyPage />
		</Page>
	)
}
