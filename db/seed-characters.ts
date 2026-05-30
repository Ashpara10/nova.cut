
import { db } from "./index";
import { characters } from "./schema";
import { charactersMap } from "../remotion/constants";
import { v4 } from "uuid";

async function seed() {
    console.log("🌱 Seeding characters...");

    for (const [voiceId, data] of Object.entries(charactersMap)) {
        console.log(`Inserting ${data.name}...`);

        // Use the voiceId as the primary key if it matches the generated scriptIDs
        // Or we can use data.id ('stewie', 'brian')
        // Given the previous server-actions use dialogue.speakerId (which will be voiceId),
        // we should use voiceId as the ID.

        await db.insert(characters).values({
            id: v4(),
            name: data.name,
            description: data.description,
            systemPrompt: data.systemPrompt,
            avatarUrl: data.avatarUrl,
            defaultVoiceId: data.defaultVoiceId || voiceId,
        }).onConflictDoUpdate({
            target: characters.id,
            set: {
                name: data.name,
                description: data.description,
                systemPrompt: data.systemPrompt,
                avatarUrl: data.avatarUrl,
                defaultVoiceId: data.defaultVoiceId || voiceId,
            }
        });
    }

    console.log("✅ Seeding complete!");
    process.exit(0);
}

seed().catch((err) => {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
});
