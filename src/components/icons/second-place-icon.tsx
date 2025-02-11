import { MedalSecondPlaceIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { JSX } from "react";

export default function SecondPlaceIcon(props: JSX.IntrinsicAttributes) {
	return (
		<HugeiconsIcon
			icon={MedalSecondPlaceIcon}
			className="size-5"
			color="white"
			strokeWidth={0.5}
			{...props}
		/>
	);
}
