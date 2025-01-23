import { ButtonBuilder, ButtonStyle } from "discord.js";

export const ticketNav = {
    staff: new ButtonBuilder({
        customId: "ticket/control/back",
        label: "Voltar",
        style: ButtonStyle.Success,
    }),
    close: new ButtonBuilder({
        custom_id: "ticket/control/close",
        label: "Voltar",
        style: ButtonStyle.Danger,
    }),
};