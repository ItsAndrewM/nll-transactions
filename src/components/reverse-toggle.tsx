"use client";

import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { ArrowDown, ArrowUp } from "lucide-react";

export default function ReverseToggle({
	setChecked,
	checked,
}: {
	setChecked: React.Dispatch<React.SetStateAction<boolean>>;
	checked: boolean;
}) {
	return (
		<div className="flex items-center space-x-2 my-4 md:px-6">
			<Switch
				id="recent"
				name="recent"
				checked={checked}
				onCheckedChange={(value) => setChecked(value)}
			/>
			<Label
				htmlFor="recent"
				className="flex items-center justify-center gap-2"
			>
				Recent {checked ? <ArrowUp color="#F87117" /> : <ArrowDown />}
			</Label>
		</div>
	);
}
