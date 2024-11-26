import {
	type ErrorComponentProps,
	rootRouteId,
	useMatch,
	useRouter,
} from "@tanstack/react-router";

import { SiteLink } from "~/components/SiteLink";
import { Button } from "~/components/ui/button";

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
	const router = useRouter();
	const isRoot = useMatch({
		strict: false,
		select: (state) => state.id === rootRouteId,
	});

	console.error(error);

	// return (
	//   <div className="min-w-0 flex-1 p-4 flex flex-col items-center justify-center gap-6">
	//     <ErrorComponent error={error} />
	//     <div className="flex gap-2 items-center flex-wrap">
	//       <button
	//         onClick={() => {
	//           router.invalidate();
	//         }}
	//         className={`px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded text-white uppercase font-extrabold`}
	//       >
	//         Try Again
	//       </button>
	//       {isRoot ? (
	//         <Link
	//           to="/"
	//           className={`px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded text-white uppercase font-extrabold`}
	//         >
	//           Home
	//         </Link>
	//       ) : (
	//         <Link
	//           to="/"
	//           className={`px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded text-white uppercase font-extrabold`}
	//           onClick={(e) => {
	//             e.preventDefault();
	//             window.history.back();
	//           }}
	//         >
	//           Go Back
	//         </Link>
	//       )}
	//     </div>
	//   </div>
	// );

	return (
		<div className="flex min-w-0 flex-1 flex-col items-center justify-center gap-4 p-8">
			<div className="text-error text-lg">Something went wrong.</div>
			<p className="flex flex-wrap items-center gap-2">
				<Button onClick={() => window.history.back()}>Go back</Button>
				<Button variant="outline" asChild>
					<SiteLink to="/">Start Over</SiteLink>
				</Button>
			</p>
		</div>
	);
}
