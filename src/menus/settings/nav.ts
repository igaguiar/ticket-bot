import { ButtonBuilder, ButtonStyle } from "discord.js";

export const settingsNav = {
    main: new ButtonBuilder({
        customId: "settings/main",
        label: "Menu principal",
        style: ButtonStyle.Success,
    }),
    back: (menu: string) => new ButtonBuilder({
        custom_id: `settings/${menu}`,
        label: "Voltar",
        style: ButtonStyle.Danger,
    }),
};