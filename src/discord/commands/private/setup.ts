import { createCommand } from "#base";
import { res } from "#functions";
import { menus } from "#menus";
import { ApplicationCommandOptionType, ApplicationCommandType, ChannelType, codeBlock } from "discord.js";

createCommand({
    name: "setup",
    description: "Comando de setup",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "tickets",
            description: "Fazer o setup do sistema de tickets",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "canal",
                    description: "Selecione o canal onde o painel será enviado",
                    type: ApplicationCommandOptionType.Channel,
                    channelTypes: [ChannelType.GuildText],
                    required
                }
            ],
        }
    ],
    async run(interaction){
        const { options, guild } = interaction;

        switch(options.getSubcommand(true)) {
            case "tickets": {
                await interaction.deferReply({ ephemeral: true });

                const channel = options.getChannel("canal", true, [ChannelType.GuildText]);
                channel.send(menus.tickets.main(guild))
                .then(message => {
                    interaction.editReply(res.success(`O painel de tickets foi enviado com sucesso! [Clique aqui](${message.url})`));
                })
                .catch(err => {
                    interaction.editReply(res.danger(`Não foi possiver enviar o painel de tickets ${codeBlock(err)}`));
                })
                break;
            }
        }
    }
});