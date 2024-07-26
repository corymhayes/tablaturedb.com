import { z } from "zod";

export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8, "Password must be at least 8 characters long.")
});

export const signupSchema = z
	.object({
		firstName: z.string(),
		lastName: z.string(),
		email: z.string().email(),
		password: z.string().min(8, "Password must be at least 8 characters long."),
		confirmPassword: z.string().min(8, "Password must be at least 8 characters long.")
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"]
	});

export const forgotPasswordSchema = z.object({
	email: z.string().email()
});

export const addTabSchema = z.object({
	song: z.string(),
	artist: z.string(),
	tuning: z.string(),
	instrument: z.string(),
	capo: z.coerce.number(),
	link: z.string()
});

export const updateTabSchema = z.object({
	id: z.string(),
	song: z.string(),
	artist: z.string(),
	tuning: z.string(),
	instrument: z.string(),
	capo: z.coerce.number(),
	link: z.string()
});

export const settingsSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8, "Password must be at least 8 characters long."),
	confirmPassword: z.string().min(8, "Password must be at least 8 characters long.")
});

export const tuningSchema = z.object({
	tuning: z.string()
});

export const instrumentSchema = z.object({
	instrument: z.string()
});

export const deleteSchema = z.object({
	id: z.string()
});

export type SettingsSchema = typeof settingsSchema;
