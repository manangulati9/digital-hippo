// TODO: FIX SUBMIT NOT TRIGGERING
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
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
	const searchParams = useSearchParams();
	const isSeller = searchParams.get("as") === "seller";
	const origin = searchParams.get("origin");

	const form = useForm<TAuthCredsValidator>({
		resolver: zodResolver(authCredsValidator),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const router = useRouter();

	const continueAsSeller = () => {
		router.push("?as=seller");
	};

	const continueAsBuyer = () => {
		router.replace("/sign-in", undefined);
	};

	const { mutate: signIn, isLoading } = trpc.auth.signIn.useMutation({
		onSuccess: () => {
			toast.success("Signed in successfully");

			router.refresh();

			if (origin) {
				router.push(`/${origin}`);
				return;
			}

			if (isSeller) {
				router.push("/sell");
				return;
			}

			router.push("/");
		},

		onError: (err) => {
			if (err.data?.code === "UNAUTHORIZED") {
				toast.error("Invalid email or password.");
				return;
			}

			toast.error("Something went wrong. Please try again.");
			console.log(err);
		},
	});

	const onSubmit = (values: TAuthCredsValidator) => {
    signIn(values)
	};

	return (
		<>
			<div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
				<div className="mx-auto flex flex-col justify-center w-full space-y-6 sm:w-[350px]">
					<div className="flex flex-col items-center space-y-2 text-center">
						<Icons.logo className="h-20 w-20" />
						<h1 className="text-2xl font-bold">
							Sign in to your {isSeller ? "seller" : " "} account
						</h1>
						<Link
							href="/sign-up"
							className={buttonVariants({
								variant: "link",
								className: "gap-1.5",
							})}
						>
							Don&apos;t have an account? Sign up
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
							<Button type="submit" disabled={isLoading}>
								{isLoading ? (
									<>
										<Icons.spinner />
										Submitting...
									</>
								) : (
									<>Sign in</>
								)}
							</Button>
						</form>
					</Form>

					<div className="relative">
						<div aria-hidden className="absolute inset-0 flex items-center">
							<span className="w-full border-t" />
						</div>
						<div className="relative flex justify-center text-xs uppercase">
							<span className="bg-background px-2 text-muted-foreground">
								or
							</span>
						</div>
					</div>

					{isSeller ? (
						<Button
							onClick={continueAsBuyer}
							variant="secondary"
							disabled={isLoading}
						>
							Continue as customer
						</Button>
					) : (
						<Button
							onClick={continueAsSeller}
							variant="secondary"
							disabled={isLoading}
						>
							Continue as seller
						</Button>
					)}
				</div>
			</div>
		</>
	);
}
