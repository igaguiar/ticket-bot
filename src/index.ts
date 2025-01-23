import { bootstrap } from "#base";
import { db } from "#database";

const { MAIN_GUILD_ID } = process.env;

await bootstrap({ 
    meta: import.meta,
    async whenReady(client) {
        const mainGuildData = await db.guilds.get(MAIN_GUILD_ID);
        Object.assign(client, { mainGuildData });
    },
});