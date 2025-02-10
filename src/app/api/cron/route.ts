import { getGame } from "@/server/cron/get-game";
import { NextResponse } from "next/server";
// import { NextResponse } from "next/server";
import { Pool } from "pg";

type GameData = {
	id: number;
	gameInfo: unknown;
	boxScore: unknown;
	teamStats: unknown;
	scoring: unknown;
	penalties: unknown;
	playerStats: unknown;
	gameLeaders: unknown;
};

const gameIds = [
	686551329, 686554369, 686551586, 686552098, 686562833, 686568738, 686567459,
	686567971, 686568195, 686570259, 686584097, 686587665, 686587409, 686587154,
	686584866, 686586642, 686586898, 686601504, 686600737, 686603521, 686603793,
	686616608, 686620144, 686617344, 686619664, 686619648, 686619905, 703144992,
	703146768, 703147536, 703154962, 703155698, 703155986, 703155475, 703152675,
	703155219, 703155459, 703168801, 703168546, 703169282, 703169570, 703172082,
	703171586, 703169826, 703171859, 703187968, 703188752, 703185441, 703187985,
	703193123, 703193379, 703204849, 703204625, 703204609, 703202593, 703204881,
	703212307, 703213331, 703221008, 703218432, 703226626, 703228930, 703227170,
	703225891, 703226915, 703229427, 703228947, 703237120, 703242529, 703245569,
	703246097, 703243010, 703243298, 703245314, 703245842, 703258912, 703259168,
	703269905, 703270145, 703268129, 703275043, 703276323, 703278611, 703286768,
	703286544, 703286032, 703291426, 703295250, 703294739, 703291683, 703292451,
	703294467, 703303184, 703307809, 703311345, 703308546, 703308834, 703310850,
	703311634, 703308067, 703327504, 703324705, 703327729, 703327249, 703326994,
	703343632, 703344400, 703340577, 703341089, 703343377, 703343873, 703341858,
	703349507, 703357216, 703357984, 703360272, 703360496, 703360257, 703365890,
	703366434, 703368722, 703365667, 703367955, 703368979, 703368195, 703368211,
];

if (!process.env.DB_URL) {
	console.error("DATABASE_URL is not set in environment");
	process.exit(1);
}
console.log("Database host:", new URL(process.env.DB_URL).hostname);

// Database connection
const pool = new Pool({
	connectionString: process.env.DB_URL,
	ssl: {
		rejectUnauthorized: false,
	},
});

// Database inserter
async function insertGameData(gameData: GameData) {
	const client = await pool.connect();
	try {
		const query = `
  INSERT INTO games (
        id,
        game_info,
        box_score,
        team_stats,
        scoring,
        penalties,
        player_stats,
        game_leaders
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (id) DO UPDATE SET
        game_info = $2,
        box_score = $3,
        team_stats = $4,
        scoring = $5,
        penalties = $6,
        player_stats = $7,
        game_leaders = $8,
        updated_at = CURRENT_TIMESTAMP
      RETURNING id;
    `;

		const values = [
			gameData.id,
			gameData.gameInfo,
			gameData.boxScore,
			gameData.teamStats,
			gameData.scoring,
			gameData.penalties,
			gameData.playerStats,
			JSON.stringify(gameData.gameLeaders),
		];

		const result = await client.query(query, values);
		console.log(`Game ${result.rows[0].id} successfully upserted`);
		return result.rows[0];
	} catch (error) {
		console.error("Error inserting game data:", error);
		throw error;
	} finally {
		client.release();
	}
}

async function handleGame(gameId: string) {
	try {
		console.log(`Processing game ${gameId}...`);

		const gameData = await getGame(gameId);

		// Insert into database
		// @ts-expect-error gameData is of type GameData
		await insertGameData(gameData);

		console.log(`Game ${gameId} processing complete`);
	} catch (error) {
		console.error(`Failed to process game ${gameId}:`, error);
		throw error;
	}
}

// export async function GET() {
// 	try {
// 		console.log("Starting cron job...");
// 		for (const gameId of gameIds) {
// 			await handleGame(gameId.toString());
// 		}
// 		console.log("Cron job complete");
// 		return NextResponse.json({ ok: true });
// 	} catch (error) {
// 		console.log(error);
// 		return NextResponse.json({ ok: false });
// 	} finally {
// 		await pool.end();
// 	}
// }

export async function GET() {
	try {
		console.log("Starting cron job...");

		// Get current hour and use it to select games
		// This way, different games will be processed each hour
		const currentHour = new Date().getHours();
		const gamesPerRun = 2; // Process 2 games per run
		const startIndex = (currentHour * gamesPerRun) % gameIds.length;
		const gamesToProcess = gameIds.slice(startIndex, startIndex + gamesPerRun);

		console.log(
			`Processing games at indices ${startIndex}-${startIndex + gamesPerRun}`
		);

		for (const gameId of gamesToProcess) {
			await handleGame(gameId.toString());
		}

		console.log("Games processing complete");
		return NextResponse.json({
			ok: true,
			processed: gamesToProcess,
			startIndex,
			hour: currentHour,
		});
	} catch (error) {
		console.log(error);
		return NextResponse.json({ ok: false });
	} finally {
		await pool.end();
	}
}
