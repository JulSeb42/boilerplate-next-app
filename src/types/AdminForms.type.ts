import type { PageType } from "./PageType.type"
import type { UserRole } from "./User.type"

export type EditUserRoleFormData = {
	role: UserRole
}

export type NavLinkFormData = {
	title: string
	href: string
	type: PageType
}
