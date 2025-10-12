import { CLIENT_PATH, TEMPLATES_PATH, toTitleCase } from "../utils/index.js"
import type { NodePlopAPI, ActionType } from "plop"

export default (plop: NodePlopAPI) => {
	const { setGenerator } = plop

	setGenerator("page", {
		description: "Generate page",
		prompts: [
			{
				type: "input",
				name: "name",
				message: "Enter page's name",
			},
			{
				type: "input",
				name: "title",
				message: "Enter page title",
				default: (data: { name: string }) => toTitleCase(data.name),
			},
			{
				type: "list",
				name: "type",
				message: "What type of page is it?",
				choices: ["none", "protected", "anon", "admin"],
				default: "none",
			},
			{
				type: "confirm",
				name: "async",
				message: "Is this an async page?",
				default: false,
			},
		],
		actions: data => {
			const actions: Array<ActionType> = ["Creating your new page"]

			if (data?.type === "admin") {
				actions.push({
					type: "add",
					path: `${CLIENT_PATH}/app/admin/{{>kebabName}}/page.tsx`,
					templateFile: `${TEMPLATES_PATH}/admin-page.hbs`,
				})
			} else {
				actions.push({
					type: "add",
					path: `${CLIENT_PATH}/app/{{>kebabName}}/page.tsx`,
					templateFile: `${TEMPLATES_PATH}/page.hbs`,
				})
			}

			return actions
		},
	})
}
