import { createResponder, ResponderType } from "#base";
import { menus } from "#menus";
import { findChannel } from "@magicyan/discord";
import { ChannelType } from "discord.js";

createResponder({
    customId: "settings/:menu/:arg",
    types: [ResponderType.StringSelect, ResponderType.ChannelSelect, ResponderType.RoleSelect], cache: "cached",
    async run(interaction, { menu, arg }) {
        const { client, guild } = interaction;
        const guildData = client.mainGuildData;
        
        const [selected] = interaction.values;

        switch(menu){
            case "channels": {
                interaction.update(menus.settings.channels.submenu(guildData, selected));
                return;
            }
            case "channel": {
                const { id, url } = findChannel(guild).byId(selected)!;
                guildData.$set(`channels.${arg}`, { id, url });

                interaction.update(menus.settings.channels.main(guildData));
                guildData.save();
                return;
            }
            case "parents": {
                interaction.update(menus.settings.parents.submenu(guildData, selected));
                return;
            }
            case "parent": {
                const { id, name } = findChannel(guild, ChannelType.GuildCategory).byId(selected)!;
                guildData.$set(`parents.${arg}`, { id, name });

                interaction.update(menus.settings.parents.main(guildData));
                guildData.save();
                return;
            }
            case "roles": {
                const current = guildData.tickets?.roles ?? [];

                switch(arg){
                    case "add": {
                        current.push(...interaction.values);
                        const updated = Array.from(new Set(current));
                        guildData.$set("tickets.roles", updated);
                        break;
                    }
                    case "remove": {
                        const values = interaction.values;
                        const filtered = current.filter(id => !values.includes(id));
                        guildData.$set("tickets.roles", filtered);
                        break;
                    }
                }
                interaction.update(menus.settings.roles.main(guildData, guild));
                guildData.save();
                return;
            }
        }
    },
});