import { z } from "zod";

const authCredsValidator = z
	.object({
		email: z.string().email("Invalid email address"),
		password: z.string().min(8, "Password must be at least 8 characters"),
		confirmPassword: z
			.string()
			.min(8, "Password must be at least 8 characters")
			.optional(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

type TAuthCredsValidator = z.infer<typeof authCredsValidator>;

export { authCredsValidator };
export type { TAuthCredsValidator };
