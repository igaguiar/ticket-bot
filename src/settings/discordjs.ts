import { GuildSchema } from "#database";
import { HydratedDocument } from "mongoose";

declare module "discord.js" {
	interface Client {
		readonly mainGuildData: HydratedDocument<GuildSchema>
	}
}