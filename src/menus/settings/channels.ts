import { GuildSchema } from "#database";
import { formatedChannelMention } from "#functions";
import { settings } from "#settings";
import { brBuilder, createEmbed, createRow } from "@magicyan/discord";
import { ChannelSelectMenuBuilder, ChannelType, StringSelectMenuBuilder } from "discord.js";
import { settingsNav } from "./nav.js";

const options = [
    { label: "Logs", value: "logs", description: "Canal de logs" },
    { label: "Transcripts", value: "transcripts", description: "Canal de transcrições" },
] as const;

export function settingsChannelsMenu(guildData: GuildSchema) {
    const channels = guildData.channels ?? {};

    const display = options.map(({ label, value }) => 
        `- ${label}: ${formatedChannelMention(channels[value]?.id, "`Não definido`")}`
    );

    const embed = createEmbed({
        color: settings.colors.primary,
        description: brBuilder(
            "Configurar canais",
            display
        )
    });

    const row = createRow(
        new StringSelectMenuBuilder({
            customId: "settings/channels/select",
            placeholder: "Selecione o canal que deseja",
            options: Array.from(options)
        })
    );

    const navRow = createRow(settingsNav.main);

    return { embeds: [embed], components: [row, navRow] };
}

export function settingsChannelMenu(guildData: GuildSchema, selected: string) {
    const channels = guildData.channels ?? {};

    const { label } = options.find(({ value }) => value === selected)!;

    const channelKey = selected as keyof typeof channels;

    const embed = createEmbed({
        color: settings.colors.warning,
        description: brBuilder(
            `Alterar o canal ${label}`,
            `Canal atual: ${formatedChannelMention(channels[channelKey]?.id, "`Não definido`")}`
        )
    });

    const row = createRow(
        new ChannelSelectMenuBuilder({
            custom_id: `settings/channel/${selected}`,
            placeholder: "Selecione o canal que deseja definir",
            channelTypes: [ChannelType.GuildText],
        })
    );

    const navRow = createRow(
        settingsNav.back("channels"),
        settingsNav.main
    );

    return { embeds: [embed], components: [row, navRow] };
}