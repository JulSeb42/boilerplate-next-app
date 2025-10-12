import type { PageType } from "types"

type NavLink = {
	title: string
	href: string
	type: PageType
}

export const navLinks: Array<NavLink> = [
	{ title: "Homepage", href: "/", type: "none" },
	{ title: "Users", href: "/users", type: "none" },
	{ title: "Signup", href: "/signup", type: "anon" },
	{ title: "Login", href: "/login", type: "anon" },
	{ title: "My account", href: "/my-account", type: "protected" },
	{ title: "Admin", href: "/admin", type: "admin" },
]
