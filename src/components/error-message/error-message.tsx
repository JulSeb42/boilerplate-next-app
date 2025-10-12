import { Alert } from "@julseb-lib/react"
import type { IErrorMessage } from "./types"

export function ErrorMessage({ children }: IErrorMessage) {
	if (!children) return null

	return <Alert color="danger">{children.toString()}</Alert>
}
