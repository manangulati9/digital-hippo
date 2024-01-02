"use client";

import { useEffect, useRef, useState } from "react";
import { PRODUCT_CATEGORIES } from "../config/index";
import NavItem from "./NavItem";
import { useOnClickOutside } from "../hooks/useOnClickOutside";

export default function NavItems() {
	const [activeIndex, setActiveIndex] = useState<null | number>(null);
	const navRef = useRef<HTMLDivElement | null>(null);
	const isAnyOpen = activeIndex !== null;
	const close = () => setActiveIndex(null);

	useOnClickOutside(navRef, () => setActiveIndex(null));

	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				setActiveIndex(null);
			}
		};
		document.addEventListener("keydown", handler);
		return () => {
			document.removeEventListener("keydown", handler);
		};
	});

	return (
		<div className="flex gap-4 h-full" ref={navRef}>
			{PRODUCT_CATEGORIES.map((category, index) => {
				const handleOpen = () => {
					if (activeIndex === index) {
						setActiveIndex(null);
					} else {
						setActiveIndex(index);
					}
				};

				const isOpen = index === activeIndex;

				return (
					<NavItem
						category={category}
						close={close}
						handleOpen={handleOpen}
						isOpen={isOpen}
						key={category.value}
						isAnyOpen={isAnyOpen}
					/>
				);
			})}
		</div>
	);
}
