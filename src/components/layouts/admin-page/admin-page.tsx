import { PageLoading, Main } from "@julseb-lib/react"
import { AdminRoute } from "../admin-route"
import { AdminNav } from "./admin-nav"
import type { IAdminLayout } from "./types"

export function AdminPage({ children, isLoading, mainSize }: IAdminLayout) {
	if (isLoading) return <PageLoading />

	return (
		<AdminRoute>
			<section className="pl-(--admin-nav-width) admin-page">
				<AdminNav />

				<Main
					size={mainSize}
					className="mx-auto w-[calc(100%-var(--admin-nav-width))]"
				>
					{children}
				</Main>
			</section>
		</AdminRoute>
	)
}
