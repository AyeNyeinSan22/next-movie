import { Inter } from "next/font/google";
import "./globals.css";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input"

import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarSeparator,
	MenubarShortcut,
	MenubarTrigger,
} from "@/components/ui/menubar";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Next Movie",
	description: "Generated by create next app",
};

async function fetchGenres() {
    const token = process.env.TOKEN;
    const res = await fetch("https://api.themoviedb.org/3/genre/movie/list", {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    return await res.json();
}
export default async function RootLayout({ children }) {
	const data = await fetchGenres();

	async function search(formData){
		"use server";

		const q= formData.get("q");
		redirect(`/search?q=${q}`);
	}

	return (
		<html lang="en">
			<body className={inter.className}>
				<div className="container mt-4">
					<Menubar className="justify-between">
						<h1 className="mx-4">Next Movie</h1>

						<form action={search} className="flex space-x-2">

						     <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                            <Input type="text" name="q"/>
							<Button type="submit">Search</Button>
						</form>
					</Menubar>

					<main className="mt-4">
						<div className="flex">
							<div className="pr-4 border-r w-[250px]">
								<Button
									variant="ghost"
									className="justify-start">
									<Link
										href="/"
										className="flex items-center gap-2">
										<svg
											width="15"
											height="15"
											viewBox="0 0 15 15"
											fill="none"
											xmlns="http://www.w3.org/2000/svg">
											<path
												d="M3.24182 2.32181C3.3919 2.23132 3.5784 2.22601 3.73338 2.30781L12.7334 7.05781C12.8974 7.14436 13 7.31457 13 7.5C13 7.68543 12.8974 7.85564 12.7334 7.94219L3.73338 12.6922C3.5784 12.774 3.3919 12.7687 3.24182 12.6782C3.09175 12.5877 3 12.4252 3 12.25V2.75C3 2.57476 3.09175 2.4123 3.24182 2.32181ZM4 3.57925V11.4207L11.4288 7.5L4 3.57925Z"
												fill="currentColor"
												fill-rule="evenodd"
												clip-rule="evenodd"></path>
										</svg>
										All Movies
									</Link>
								</Button>
								{data.genres.map(genre => {
									return (
										<Button
											key={genre.id}
											variant="ghost"
											className="w-full justify-start gap-2">
											<Link
												href={`/genres/${genre.name}/${genre.id}`}
												className="flex items-center gap-2">
												<svg
													width="15"
													height="15"
													viewBox="0 0 15 15"
													fill="none"
													xmlns="http://www.w3.org/2000/svg">
													<path
														d="M3.24182 2.32181C3.3919 2.23132 3.5784 2.22601 3.73338 2.30781L12.7334 7.05781C12.8974 7.14436 13 7.31457 13 7.5C13 7.68543 12.8974 7.85564 12.7334 7.94219L3.73338 12.6922C3.5784 12.774 3.3919 12.7687 3.24182 12.6782C3.09175 12.5877 3 12.4252 3 12.25V2.75C3 2.57476 3.09175 2.4123 3.24182 2.32181ZM4 3.57925V11.4207L11.4288 7.5L4 3.57925Z"
														fill="currentColor"
														fill-rule="evenodd"
														clip-rule="evenodd"></path>
												</svg>
												{genre.name}
											</Link>
										</Button>
									);
								})}
							</div>

							<div className="pl-4">{children}</div>
						</div>
					</main>
				</div>
			</body>
		</html>
	);
	
}