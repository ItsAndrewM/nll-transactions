import { getTeamColors } from "@/lib/utils";
import { Player } from "@/types/players";
import { useId } from "react";

export const DynamicBackground = ({ player }: { player: Player }) => {
	// Use unique IDs for SVG elements to prevent conflicts
	const gradientId = useId();
	const gridId = useId();
	const [primaryColor, secondaryColor] = getTeamColors(player.team_code);
	const patternSize = Number.parseInt(player.jerseyNumber) * 5 + 20;

	return (
		<div className="absolute inset-0 overflow-hidden">
			<svg
				className="w-full h-full"
				xmlns="http://www.w3.org/2000/svg"
				preserveAspectRatio="xMidYMid slice"
			>
				<defs>
					<pattern
						id={gridId}
						width={patternSize}
						height={patternSize}
						patternUnits="userSpaceOnUse"
						patternTransform="rotate(45)"
					>
						<path
							d={`M ${patternSize} 0 L 0 0 0 ${patternSize}`}
							fill="none"
							stroke={secondaryColor}
							strokeWidth="0.5"
							strokeOpacity="0.3"
						/>
					</pattern>
					<linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" stopColor={primaryColor}>
							<animate
								attributeName="stop-opacity"
								values="0.7;0.3;0.7"
								dur="4s"
								repeatCount="indefinite"
							/>
						</stop>
						<stop offset="100%" stopColor={secondaryColor}>
							<animate
								attributeName="stop-opacity"
								values="0.7;0.3;0.7"
								dur="4s"
								repeatCount="indefinite"
								begin="-2s"
							/>
						</stop>
					</linearGradient>
					<filter id="blur-sm">
						<feGaussianBlur in="SourceGraphic" stdDeviation="1" />
					</filter>
				</defs>

				{/* Base gradient */}
				<rect width="100%" height="100%" fill={`url(#${gradientId})`} />

				{/* Pattern overlay */}
				<rect width="100%" height="100%" fill={`url(#${gridId})`} />

				{/* Position-specific decorative elements */}
				{player.position === "F" && (
					<g>
						{[...Array(3)].map((_, i) => (
							<circle
								key={i}
								cx={`${25 + i * 25}%`}
								cy="50%"
								r={patternSize / 2}
								fill="none"
								stroke={i % 2 ? primaryColor : secondaryColor}
								strokeWidth="1"
								strokeOpacity="0.2"
								filter="url(#blur-sm)"
							>
								<animate
									attributeName="r"
									values={`${patternSize / 2};${patternSize};${
										patternSize / 2
									}`}
									dur={`${3 + i}s`}
									repeatCount="indefinite"
								/>
							</circle>
						))}
					</g>
				)}
			</svg>
		</div>
	);
};
