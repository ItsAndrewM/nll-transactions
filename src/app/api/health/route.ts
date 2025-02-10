import { NextResponse } from "next/server";

export async function GET() {
	try {
		const response = await fetch(
			"https://nll-transactions-server.fly.dev/api/health"
		);
		if (!response.ok) {
			throw new Error("Failed to fetch health");
		}
		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error(error);
		return NextResponse.json({ ok: false });
	}
}
