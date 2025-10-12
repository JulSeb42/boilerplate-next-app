import { http } from "./http-common"
import { generateServerRoute } from "utils"
import type { SERVER_PATHS } from "./server-paths"
import type {
	ApiResponse,
	User,
	ResponseAllUsers,
	EditAccountFormData,
	EditPasswordFormData,
} from "types"

type PATHS = keyof typeof SERVER_PATHS.USER

const generateRoute = (
	route: Exclude<PATHS, "ROOT">,
	param?: string | Array<string>,
) => generateServerRoute("USER", route, param)

class UserService {
	allUsers = async (
		page: number = 1,
		limit: number = 12,
	): ApiResponse<ResponseAllUsers> =>
		await http.get(
			`${generateRoute("ALL_USERS")}?page=${page}&limit=${limit}`,
		)

	getUser = async (id: string): ApiResponse<User> =>
		await http.get(generateRoute("USER", id))

	editAccount = async (
		id: string,
		data: EditAccountFormData,
	): ApiResponse<{ user: User; message: string }> =>
		await http.put(generateRoute("EDIT_ACCOUNT", id), data)

	editPassword = async (
		id: string,
		data: EditPasswordFormData,
	): ApiResponse<{ user: User; message: string }> =>
		await http.put(generateRoute("EDIT_PASSWORD", id), data)

	deleteAccount = async (id: string): ApiResponse<{ message: string }> =>
		await http.delete(generateRoute("DELETE_ACCOUNT", id))

	/* Prepend route - DO NOT REMOVE */
}

export const userService = new UserService()
