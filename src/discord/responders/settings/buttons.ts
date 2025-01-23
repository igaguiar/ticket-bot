import { createResponder, ResponderType } from "#base";
import { menus } from "#menus";

createResponder({
    customId: "settings/:menu/:action",
    types: [ResponderType.Button], cache: "cached",
    async run(interaction, { menu, action }) {
        const { client, guild } = interaction;
        const guildData = client.mainGuildData;
        
        switch(menu){
            case "roles": {

                switch(action){
                    case "add": {
                        interaction.update(menus.settings.roles.add(guild));
                        return;
                    }
                    case "remove": {
                        interaction.update(menus.settings.roles.remove(guildData, guild));
                        return;
                    }
                }

                return;
            }
        }
    },
});