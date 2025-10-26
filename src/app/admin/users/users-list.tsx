"use client"
import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Text, Grid, usePaginatedData } from "@julseb-lib/react"
import { UserCardAdmin, Pagination } from "components"
import { UsersFilters, type UserFilter } from "./filters"
import type { User } from "types"

export function UsersList({ initialUsers }: IUsersList) {
	const searchParams = useSearchParams()
	const page = Number(searchParams.get("page") ?? 1)

	const [users, setUsers] = useState(initialUsers)
	const [search, setSearch] = useState("")
	const [filter, setFilter] = useState<UserFilter>("none")

	let filteredUsers = users

	if (search.length) {
		filteredUsers = filteredUsers.filter(u =>
			u.fullName.toLowerCase().includes(search.toLowerCase()),
		)
	}

	if (filter !== "none") {
		filteredUsers = filteredUsers.filter(u => u.role === filter)
		console.log({ filter })
	}

	const { paginatedData, totalPages } = usePaginatedData(filteredUsers, page)

	return (
		<>
			<UsersFilters
				search={search}
				setSearch={setSearch}
				filter={filter}
				setFilter={setFilter}
			/>

			{users?.length > 0 ? (
				filteredUsers.length ? (
					<>
						<Grid cols={4} gap="sm">
							{paginatedData.map(user => (
								<UserCardAdmin
									user={user}
									setUsers={setUsers}
									key={user._id}
								/>
							))}
						</Grid>
					</>
				) : (
					<Text>Your search did not return any result.</Text>
				)
			) : (
				<Text>No user yet.</Text>
			)}

			<Pagination page={page} totalPages={totalPages} />
		</>
	)
}

interface IUsersList {
	initialUsers: Array<User>
}
