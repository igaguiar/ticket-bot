import { settings } from "#settings";
import { brBuilder, createEmbed, createRow } from "@magicyan/discord";
import { ButtonBuilder, ButtonStyle } from "discord.js";

export function settingsMainMenu(){
    const embed = createEmbed({
        color: settings.colors.primary,
        description: brBuilder(
            "# Configurações",
            "- Definir canais",
            "- Definir categorias do servidor",
            "- Definir cargos de tickets",
        )
    });

    const row = createRow(
        new ButtonBuilder({
            customId: "settings/channels",
            label: "Canais",
            style: ButtonStyle.Secondary
        }),
        new ButtonBuilder({
            customId: "settings/parents",
            label: "Categorias",
            style: ButtonStyle.Secondary
        }),
        new ButtonBuilder({
            customId: "settings/roles",
            label: "Cargos de tickets",
            style: ButtonStyle.Secondary
        }),
    );

    return { ephemeral: true, embeds: [embed], components: [row]};
}