import Link from "next/link";
import MaxWidthWrapper from "../components/MaxWidthWrapper";
import { Button, buttonVariants } from "../components/ui/button";
import { ArrowDownToLine, CheckCircle, Leaf } from "lucide-react";

const perks = [
	{
		name: "Instant delivery",
		icon: ArrowDownToLine,
		description:
			"Get your assets delivered to your email in seconds and download them right away.",
	},

	{
		name: "Guaranteed Quality",
		icon: CheckCircle,
		description:
			"Every asset on our platform is verified by our team to ensure our highest quality standards. Not happy? We offer a 30-day refund guarantee.",
	},

	{
		name: "For The Planet",
		icon: Leaf,
		description:
			"We've pledged 1% of sales to the preservation and restoration of the environment",
	},
];

export default function Home() {
	return (
		<>
			<MaxWidthWrapper>
				<div className="py-20 space-y-6 mx-auto text-center flex flex-col items-center max-w-3xl">
					<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
						Your marketplace for high quality assets{" "}
						<span className="text-blue-600">digital assets</span>
					</h1>
					<p className="text-lg max-w-prose text-muted-foreground">
						Welcome to DigitalHippo. Every asset on our platform is verified by
						our team to ensure our highest quality standards.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 mt-6">
						<Link href="/products" className={buttonVariants()}>
							Browse Trending
						</Link>
						<Button variant="ghost">Our quality promise &rarr;</Button>
					</div>
				</div>
			</MaxWidthWrapper>
			<section className="border-t border-gray-200 bg-gray-50">
				<MaxWidthWrapper className="py-20">
					<div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
						{perks.map((perk) => (
							<div
								key={perk.name}
								className="text-center md:flex md:items-start md:text-left lg:block"
							>
								<div className="md:flex-shrink-0 flex justify-center">
									<div className="h-16 w-16 flex justify-center items-center rounded-full bg-blue-100 text-blue-900">
										{<perk.icon className="w-1/3 h-1/3" />}
									</div>
								</div>
								<div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
									<h3 className="text-center text-base font-medium text-gray-900">
										<p className="mt-3 text-sm text-muted-foreground">
											{perk.description}
										</p>
									</h3>
								</div>
							</div>
						))}
					</div>
				</MaxWidthWrapper>
			</section>
		</>
	);
}
