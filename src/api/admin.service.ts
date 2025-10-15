import { http } from "./http-common"
import { generateServerRoute } from "utils"
import type { SERVER_PATHS } from "./server-paths"
import type { ApiResponse, User } from "types"

type PATHS = keyof typeof SERVER_PATHS.ADMIN

const generateRoute = (route: Exclude<PATHS, "ROOT">, id?: string) =>
	generateServerRoute("ADMIN", route, id)

class AdminService {
	editUserRole = async (): ApiResponse<User> =>
		await http.put(generateRoute("EDIT_USER_ROLE"))

	resetPassword = async (): ApiResponse<User> =>
		await http.put(generateRoute("RESET_PASSWORD"))

	deleteUser = async () => await http.delete(generateRoute("DELETE_USER"))

	/* Prepend route - DO NOT REMOVE */
}

export const adminService = new AdminService()
