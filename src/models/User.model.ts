import { Schema, model, models, type Model } from "mongoose"
import { userRoles, type User } from "types"

const userSchema = new Schema<User>(
	{
		fullName: String,
		email: { type: String, unique: true },
		password: String,
		avatar: String,
		role: { type: String, enum: Object.keys(userRoles) },
		verified: Boolean,
		verifyToken: String,
		resetToken: String,
	},
	{ timestamps: true },
)

export const UserModel = models?.User
	? (models.User as Model<User>)
	: model<User>("User", userSchema)
