
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { epithets, names, users } from "./src/db/schema";
import { config } from "dotenv";
import { eq } from "drizzle-orm";
import monsters from "./src/db/monsters.json";

config({ path: ".dev.vars" });

// biome-ignore lint/style/noNonNullAssertion: error from neon client is helpful enough to fix
const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

async function update() {
    for (const epithet of monsters.epithets) {
        const existingEpithet = await db
            .select()
            .from(epithets)
            .where(eq(epithets.epithet, epithet[0]))
            .limit(1);

        if (existingEpithet.length > 0) {
            // Update the existing epithet
            await db
                .update(epithets)
                .set({ source: epithet[1] })
                .where(eq(epithets.epithet, epithet[0]));
        } else {
            // Insert the new epithet
            await db.insert(epithets).values({
                epithet: epithet[0],
                source: epithet[1],
            });
        }
    }

    for (const name of monsters.names) {
        const existingName = await db
            .select()
            .from(names)
            .where(eq(names.name, name[0]))
            .limit(1);

        if (existingName.length > 0) {
            // Update the existing name
            await db
                .update(names)
                .set({ source: name[1] })
                .where(eq(names.name, name[0]));
        } else {
            // Insert the new name
            await db.insert(names).values({
                name: name[0],
                source: name[1],
            });
        }
    }
}

async function main() {
	try {
		await update();
		console.log("Updating completed");
	} catch (error) {
		console.error("Error during updating:", error);
		process.exit(1);
	} finally {
		process.exit(0);
	}
}
main();
