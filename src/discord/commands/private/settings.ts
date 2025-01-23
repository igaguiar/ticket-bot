import { createCommand } from "#base";
import { menus } from "#menus";
import { ApplicationCommandType } from "discord.js";

createCommand({
    name: "configurações",
    description: "Comando de configurações",
    type: ApplicationCommandType.ChatInput,
    async run(interaction){
        interaction.reply(menus.settings.main());
    }
});