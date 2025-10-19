"use client"
import { useState } from "react"
import {
	Form,
	Input,
	Table,
	Grid,
	Text,
	Flexbox,
	toast,
	capitalize,
} from "@julseb-lib/react"
import { ErrorMessage } from "components"
import { adminService } from "api"
import { navLinks } from "data"
import type { LibValidationStatus } from "@julseb-lib/react/types"
import { pageType, type IErrorMessage, type PageType } from "types"

type Inputs = {
	title: string
	url: string
	type: PageType
}

type Validation = {
	title: LibValidationStatus
	url: LibValidationStatus
}

export function NavForm() {
	const [inputs, setInputs] = useState<Inputs>({
		title: "",
		url: "",
		type: "all",
	})
	const [isLoading, setIsLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState<IErrorMessage>(undefined)
	const [validation, setValidation] = useState<Validation>({
		title: undefined,
		url: undefined,
	})

	const handleInputs = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { id, value } = e.target

		setInputs({ ...inputs, [id]: value })

		if (validation.title !== undefined || validation.url !== undefined) {
			if (id === "title" && validation.title !== undefined) {
				setValidation({
					...validation,
					title: value.length ? true : false,
				})
			}

			if (id === "url" && validation.url !== undefined) {
				setValidation({
					...validation,
					url: value.length ? true : false,
				})
			}
		}
	}

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()

		setIsLoading(true)

		if (!inputs.title.length || !inputs.url.length) {
			setValidation({
				title: !inputs.title.length ? false : undefined,
				url: !inputs.url.length ? false : undefined,
			})
			setIsLoading(false)
			return
		}

		adminService
			.navLink({ ...inputs, href: inputs.url })
			.then(res =>
				toast.success(`${res.data.navLink.title} has been added!`),
			)
			.catch(err => setErrorMessage(err.response.data.message))
			.finally(() => setIsLoading(false))
	}

	return (
		<>
			<Table
				headers={["Title", "URL", "Type"]}
				data={navLinks.map(link => [link.title, link.href, link.type])}
				variant="stripped"
			/>

			<Flexbox flexDirection="col" gap="sm">
				<Text tag="h2">Add a new link</Text>

				<Form
					buttonPrimary="Create a new link"
					onSubmit={handleSubmit}
					isLoading={isLoading}
				>
					<Grid cols={3} gap="sm">
						<Input
							id="title"
							label="Title"
							value={inputs.title}
							onChange={handleInputs}
							validation={{
								status: validation.title,
								message: "Title is required",
							}}
						/>

						<Input
							id="url"
							label="URL"
							value={inputs.url}
							onChange={handleInputs}
							validation={{
								status: validation.url,
								message: "URL is required",
							}}
						/>

						<Input
							id="type"
							label="Type"
							type="select"
							value={inputs.type}
							onChange={handleInputs}
						>
							{Object.keys(pageType).map(type => (
								<option value={type} key={type}>
									{capitalize(type)}
								</option>
							))}
						</Input>
					</Grid>
				</Form>

				<ErrorMessage>{errorMessage}</ErrorMessage>
			</Flexbox>
		</>
	)
}
