import { createResponder, ResponderType, URLStore } from "#base";
import { getIncludesRoles, res } from "#functions";
import { menus } from "#menus";
import { createLinkButton, createRow, findChannel, limitText } from "@magicyan/discord";
import { ChannelType, OverwriteData } from "discord.js";

createResponder({
    customId: "ticket/panel/open",
    types: [ResponderType.Button], cache: "cached",
    async run(interaction) {
        const { client, member, guild } = interaction;

        const guildData = client.mainGuildData;
        const ticketParentId = guildData.parents?.tickets?.id ?? "";
        const ticketParent = findChannel(guild, ChannelType.GuildCategory).byId(ticketParentId);

        await interaction.reply(res.warning("Aguarde um momento..."));
        if (!ticketParent) {
            interaction.editReply(res.danger("O sistema de tickets não foi configurado corretamente."));
            return;
        }

        const ticketChannel = findChannel(guild)
            .inCategoryId(ticketParent.id)
            .byFilter(c => Boolean(c.topic?.includes(member.id)));

        if (ticketChannel) {
            const row = createRow(
                createLinkButton({
                    url: ticketChannel.url,
                    label: "Acessar ticket",
                })
            );

            interaction.editReply(res.danger("Você já possui um ticket aberto.", { components: [row] }));
            return;
        }

        const roles = getIncludesRoles(guildData.tickets?.roles, guild);
        const perms: OverwriteData[] = roles.map(role => ({
            id: role.id, allow: ["ViewChannel"]
        }))
        perms.push(
            { id: guild.id, deny: ["ViewChannel"], allow: ["SendMessages"] },
            { id: member.id, allow: ["ViewChannel"] },
        )

        guild.channels.create({
            name: `${limitText(member.user.username, 18)}-ticket`,
            parent: ticketParent,
            permissionOverwrites: perms,
            topic: member.id,
            type: ChannelType.GuildText,
        })
        .then(channel => {
            const row = createRow(
                createLinkButton({
                    url: channel.url,
                    label: "Acessar ticket",
                })
            );

            const urlStore = new URLStore();
            urlStore.set("ownerId", member.id);
            urlStore.set("ownerUsername", member.user.username);
            urlStore.set("createdAt", new Date().toString());

            channel.send(menus.tickets.control.main(member, urlStore));

            interaction.editReply(res.success("Ticket criado com sucesso.", { components: [row] }));
        })
        .catch(() => {
            interaction.editReply(res.danger("Não foi possível criar o ticket."));
        })
    },
});