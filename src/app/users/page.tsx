import type { Metadata } from "next"
import { Text } from "@julseb-lib/react"
import { Page } from "components"
import { userService } from "api"
import { UsersList } from "./users-list"
import type { ResponseAllUsers } from "types"

async function getUsers() {
	return (await userService
		.allUsers(1, 24)
		.then(res => res.data)
		.catch(err => {
			console.error(err)
			return null
		})) as ResponseAllUsers
}

export const metadata: Metadata = {
	title: "Users",
}

export default async function Users() {
	const { users, pagination } = await getUsers()

	return (
		<Page type="none">
			<Text tag="h1">Users</Text>

			<UsersList initialUsers={users} initialPagination={pagination} />
		</Page>
	)
}
