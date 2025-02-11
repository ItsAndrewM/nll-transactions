import { ChampionIcon as HugeChampionIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { JSX } from "react";

export default function ChampionIcon(props: JSX.IntrinsicAttributes) {
	return (
		<HugeiconsIcon
			icon={HugeChampionIcon}
			className="size-5"
			color="white"
			strokeWidth={0.5}
			{...props}
		/>
	);
}
