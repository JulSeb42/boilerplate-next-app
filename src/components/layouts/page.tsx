import { Fragment } from "react"
import { PageLayout, PageLoading } from "@julseb-lib/react"
import { AdminRoute } from "./admin-route"
import { AnonRoute } from "./anon-route"
import { ProtectedRoute } from "./protected-route"
import { Header } from "./header"
import type { ILibPageLayout } from "@julseb-lib/react/component-props"
import type { LibMainSize } from "@julseb-lib/react/types"
import type { PageType } from "types"

export function Page({
	type,
	children,
	isLoading,
	noWrapper,
	noMain,
	mainSize,
	...rest
}: IPage) {
	const Element =
		type === "admin"
			? AdminRoute
			: type === "protected"
				? ProtectedRoute
				: type === "anon"
					? AnonRoute
					: Fragment

	if (isLoading) return <PageLoading />

	return (
		<Element>
			<PageLayout
				header={<Header />}
				noMain={noMain as any}
				noWrapper={noWrapper as any}
				wrapperProps={{
					className:
						"pt-8 pb-12 min-h-[calc(100svh-56px)] bg-transparent",
					...rest.wrapperProps,
				}}
				mainProps={{ className: "py-0 bg-transparent", size: mainSize }}
				{...rest}
			>
				{children}
			</PageLayout>
		</Element>
	)
}

type IPage = ILibPageLayout & {
	type: PageType
	isLoading?: boolean
	mainSize?: LibMainSize
}
