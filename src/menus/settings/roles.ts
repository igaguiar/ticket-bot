import { GuildSchema } from "#database";
import { getIncludesRoles } from "#functions";
import { settings } from "#settings";
import { brBuilder, createEmbed, createRow } from "@magicyan/discord";
import { ButtonBuilder, ButtonStyle, Guild, RoleSelectMenuBuilder, StringSelectMenuBuilder } from "discord.js";
import { settingsNav } from "./nav.js";

export function settingsRolesMenu(guildData: GuildSchema, guild: Guild) {
    const roles = getIncludesRoles(guildData.tickets?.roles, guild);

    const embed = createEmbed({
        color: settings.colors.primary,
        description: brBuilder(
            "# Cargos dos tickets",
            "Cargos que podem gerenciar os tickets:",
            roles.size < 1 ? "Nenhuma" :
            roles.map(role => `- ${role} ${role.members.size} membros`)
        )
    });

    const row = createRow(
        new ButtonBuilder({
            customId: "settings/roles/add",
            label: "Adicionar",
            style: ButtonStyle.Success
        }),
        new ButtonBuilder({
            customId: "settings/roles/remove",
            label: "Remover",
            style: ButtonStyle.Danger,
            disabled: roles.size < 1
        }),
    );
    const navRow = createRow(settingsNav.main);

    return { embeds: [embed], components: [row, navRow] };
}

export function settingsRolesAddMenu(guild: Guild) {
    const embed = createEmbed({
        color: settings.colors.success,
        description: "Selecione o cargo que deseja adicionar"
    });

    const row = createRow(
        new RoleSelectMenuBuilder({
            customId: "settings/roles/add",
            placeholder: "Selecione os cargos",
            minValues: 1,
            maxValues: Math.min(25, guild.roles.cache.size),
        })
    );

    const navRow = createRow(
        settingsNav.back("roles"),
        settingsNav.main,
    );

    return { embeds: [embed], components: [row, navRow] };
}

export function settingsRolesRemoveMenu(guildData: GuildSchema, guild: Guild) {
    const roles = getIncludesRoles(guildData.tickets?.roles, guild);

    const embed = createEmbed({
        color: settings.colors.danger,
        description: "Selecione o cargo que deseja remover"
    });

    const row = createRow(
        new StringSelectMenuBuilder({
            customId: "settings/roles/remove",
            placeholder: "Selecione os cargos",
            minValues: 1,
            maxValues: Math.min(25, roles.size),
            options: roles.first(25).map(role => ({ 
                label: role.name, 
                value: role.id, 
                description: `${role.members.size} membros`
            }))
        })
    );

    const navRow = createRow(
        settingsNav.back("roles"),
        settingsNav.main,
    );

    return { embeds: [embed], components: [row, navRow] };
}