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
	.refine((data) => data.password == data.confirmPassword, "Passwords don't match");

export const forgotPasswordSchema = z.object({
	email: z.string().email()
});

export const addTabSchema = z.object({
	song: z.string(),
	artist: z.string(),
	tuning: z.string(),
	instrument: z.string(),
	link: z.string()
});

export const updateTabSchema = z.object({
	id: z.string(),
	song: z.string(),
	artist: z.string(),
	tuning: z.string(),
	instrument: z.string(),
	link: z.string()
});
