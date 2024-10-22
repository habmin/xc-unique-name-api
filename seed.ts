
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { epithets, names, users } from "./src/db/schema";
import { config } from "dotenv";
import monsters from "./src/db/monsters.json";

config({ path: ".dev.vars" });

// biome-ignore lint/style/noNonNullAssertion: error from neon client is helpful enough to fix
const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

async function seed() {
	// Don't need users for
	// await db.insert(users).values([
	// 	{
	// 		name: "Laszlo Cravensworth",
	// 	},
	// 	{
	// 		name: "Nadja Antipaxos",
	// 	},
	// 	{
	// 		name: "Colin Robinson",
	// 	},
	// ]);
	for (const epithet of monsters.epithets) {
		await db.insert(epithets).values({
			epithet: epithet[0],
			source: epithet[1],
		});
	}
	for (const name of monsters.names) {
		await db.insert(names).values({
			name: name[0],
			source: name[1],
		});
	}
}

async function main() {
	try {
		await seed();
		console.log("Seeding completed");
	} catch (error) {
		console.error("Error during seeding:", error);
		process.exit(1);
	} finally {
		process.exit(0);
	}
}
main();
