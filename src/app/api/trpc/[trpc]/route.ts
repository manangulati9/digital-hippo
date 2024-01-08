import { appRouter } from "@/src/trpc";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

const handler = (req: Request) => {
	fetchRequestHandler({
		endpoint: "/api/trpc",
		req,
		router: appRouter,
		//@ts-expect-error Context already passed from middleware
		createContext: () => ({}),
	});
};

export { handler as GET, handler as POST };
