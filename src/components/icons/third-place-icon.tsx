import { MedalThirdPlaceIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { JSX } from "react";

export default function ThirdPlaceIcon(props: JSX.IntrinsicAttributes) {
	return (
		<HugeiconsIcon
			icon={MedalThirdPlaceIcon}
			className="size-5"
			color="white"
			strokeWidth={0.5}
			{...props}
		/>
	);
}
