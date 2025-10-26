import type { Metadata } from "next"
import { Text } from "@julseb-lib/react"
import { AdminPage } from "components"
import { userService } from "api"
import { UsersList } from "./users-list"
import type { User } from "types"

export const metadata: Metadata = {
	title: "Users",
}

async function getAllUsers() {
	return (await userService
		.allUsers()
		.then(res => res.data)
		.catch(err => console.error(err))) as Array<User>
}

export default async function AdminUsers() {
	const users = await getAllUsers()

	return (
		<AdminPage>
			<Text tag="h1">Users</Text>
			<UsersList initialUsers={users} />
		</AdminPage>
	)
}
