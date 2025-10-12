"use client"
import Link from "next/link"
import { Text, Avatar, Image, getInitials, clsx } from "@julseb-lib/react"
import type { IUserCard } from "./types"

export function UserCard({ user }: IUserCard) {
	return (
		<Link
			href={`/users/${user._id}`}
			className={clsx(
				"flex flex-col items-center gap-2 p-2 border border-gray-200 rounded-lg",
				"hover:scale-105",
			)}
		>
			<Avatar>
				{user.avatar ? (
					<Image
						src={user.avatar}
						alt={`Avatar ${user.fullName}`}
						className="w-full h-full"
						fit="cover"
					/>
				) : (
					getInitials(user.fullName)
				)}
			</Avatar>

			<Text textAlign="center">{user.fullName}</Text>
		</Link>
	)
}
