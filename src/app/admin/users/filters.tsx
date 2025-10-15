"use client"
import { Grid, Input } from "@julseb-lib/react"

export function UsersFilters({
	search,
	setSearch,
	filter,
	setFilter,
}: IUsersFilters) {
	return (
		<Grid cols={2} gap="sm">
			<Input
				id="search"
				label="Search by name"
				value={search}
				onChange={e => setSearch(e.target.value)}
			/>

			<Input
				id="filter"
				label="Filter by role"
				value={filter}
				onChange={e => setFilter(e.target.value as UserFilter)}
				type="select"
			>
				<option value="none">None</option>
				<option value="user">User</option>
				<option value="admin">Admin</option>
			</Input>
		</Grid>
	)
}

export type UserFilter = "none" | "user" | "admin"

interface IUsersFilters {
	search: string
	setSearch: DispatchState<string>
	filter: UserFilter
	setFilter: DispatchState<UserFilter>
}
