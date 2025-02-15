import { Player } from "@/types/players";
import { Instagram, Twitter, Youtube } from "lucide-react";

export function PlayerSocials({ player }: { player: Player }) {
	return (
		<div className="mt-8 flex justify-center space-x-4">
			{player.twitter_url && (
				<a
					href={player.twitter_url}
					target="_blank"
					rel="noopener noreferrer"
					className="text-blue-400 hover:text-blue-600"
				>
					<Twitter className="h-6 w-6" />
				</a>
			)}
			{player.instagram_url && (
				<a
					href={player.instagram_url}
					target="_blank"
					rel="noopener noreferrer"
					className="text-pink-400 hover:text-pink-600"
				>
					<Instagram className="h-6 w-6" />
				</a>
			)}
			{player.youtube_url && (
				<a
					href={player.youtube_url}
					target="_blank"
					rel="noopener noreferrer"
					className="text-red-400 hover:text-red-600"
				>
					<Youtube className="h-6 w-6" />
				</a>
			)}
		</div>
	);
}
