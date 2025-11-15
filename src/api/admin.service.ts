import { http } from "./http-common"
import { generateServerRoute } from "utils"
import type { SERVER_PATHS } from "./server-paths"
import type {
	ApiResponse,
	User,
	NavLinkFormData,
	EditUserRoleFormData,
} from "types"

type PATHS = keyof typeof SERVER_PATHS.ADMIN

const generateRoute = (route: Exclude<PATHS, "ROOT">, id?: string) =>
	generateServerRoute("ADMIN", route, id)

class AdminService {
	navLink = async (data: NavLinkFormData) =>
		await http.post(generateRoute("ADD_NAV_LINK"), data)

	updateNavLinks = async (data: Array<NavLinkFormData>) =>
		await http.put(generateRoute("UPDATE_NAV_LINKS"), { navLinks: data })

	deleteNavLink = async (id: string) =>
		await http.delete(generateRoute("DELETE_NAV_LINK", id))

	editUserRole = async (
		id: string,
		data: EditUserRoleFormData,
	): ApiResponse<User> =>
		await http.put(generateRoute("EDIT_USER_ROLE", id), data)

	resetPassword = async (id: string): ApiResponse<{ message: string }> =>
		await http.put(generateRoute("RESET_PASSWORD", id))

	deleteUser = async (id: string): ApiResponse<{ message: string }> =>
		await http.delete(generateRoute("DELETE_USER", id))

	/* Prepend route - DO NOT REMOVE */
}

export const adminService = new AdminService()
