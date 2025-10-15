"use client"
import { Text } from "@julseb-lib/react"
import { useAuth } from "context"

export function AdminHeader() {
	const { user } = useAuth()

	return <Text tag="h1">Hello {user?.fullName}</Text>
}
