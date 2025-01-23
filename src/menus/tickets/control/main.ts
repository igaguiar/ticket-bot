import { URLStore } from "#base";
import { settings } from "#settings";
import { brBuilder, createEmbed, createEmbedAuthor, createRow } from "@magicyan/discord";
import { ButtonBuilder, ButtonStyle, GuildMember } from "discord.js";

export function ticketControlPanel(member: GuildMember, urlStore: URLStore) {
    const embed = createEmbed({
        url: urlStore,
        color: settings.colors.green,
        author: createEmbedAuthor(member, { prefix: "Ticket de " }),
        thumbnail: member.displayAvatarURL(),
        description: brBuilder(
            `Este é o seu ticket ${member}`,
            ">>> Para acelerar o processo, envie detalhes",
            "sobre o assunto deste ticket e em breve",
            "nossa equipe irá respondê-lo(a)."
        )
    });

    const row = createRow(
        new ButtonBuilder({
            customId: "ticket/control/staff",
            label: "Painel staff",
            style: ButtonStyle.Primary,
        }),
        new ButtonBuilder({
            customId: "ticket/control/close",
            label: "Fechar ticket",
            style: ButtonStyle.Danger,
        }),
    )

    return { embeds: [embed], components: [row] };
}