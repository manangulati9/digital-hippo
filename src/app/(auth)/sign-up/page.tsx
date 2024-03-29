"use client";

import { Icons } from "@/src/components/icons";
import { Button, buttonVariants } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { authCredsValidator } from "@/src/schemas";
import type { TAuthCredsValidator } from "@/src/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@src/components/ui/form";
import { trpc } from "@/src/trpc/client";
import { toast } from "sonner";
import { ZodError } from "zod";
import { useRouter } from "next/navigation";

export default function Page() {
	const form = useForm<TAuthCredsValidator>({
		resolver: zodResolver(authCredsValidator),
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const router = useRouter();

	const { mutate, isLoading } = trpc.auth.createPayloadUser.useMutation({
		onError: (err) => {
			if (err.data?.code === "CONFLICT") {
				toast.error("This email is already is in use. Sign in instead?");
				return;
			}

			if (err instanceof ZodError) {
				toast.error(err.issues[0].message);
				return;
			}

			toast.error("Something went wrong. Please try again.");
		},

		onSuccess: ({ sentToEmail }) => {
			toast.success(`Verification email sent to ${sentToEmail}`);
			router.push(`/verify-email?to=${sentToEmail}`);
		},
	});

	const onSubmit = (values: TAuthCredsValidator) => {
		mutate(values);
	};

	return (
		<>
			<div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
				<div className="mx-auto flex flex-col justify-center w-full space-y-6 sm:w-[350px]">
					<div className="flex flex-col items-center space-y-2 text-center">
						<Icons.logo className="h-20 w-20" />
						<h1 className="text-2xl font-bold">Create an account</h1>
						<Link
							href="/sign-in"
							className={buttonVariants({
								variant: "link",
								className: "gap-1.5",
							})}
						>
							Already have an account? Sign in
							<ArrowRight className="h-4 w-4" />
						</Link>
					</div>
					<Form {...form}>
						<form className="grid gap-6" onSubmit={form.handleSubmit(onSubmit)}>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="you@example.com"
												type="email"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="Password"
												type="password"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="confirmPassword"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Confirm Password</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="Re-enter password"
												type="text"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type="submit">
								{isLoading ? (
									<>
										<Icons.spinner />
										Submitting...
									</>
								) : (
									<>Sign up</>
								)}
							</Button>
						</form>
					</Form>
				</div>
			</div>
		</>
	);
}
