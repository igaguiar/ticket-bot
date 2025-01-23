import { ticketControlPanel } from "./control/main.js";
import { ticketMainPanel } from "./main.js";

export const ticketsMenus = {
    main: ticketMainPanel,
    control: {
        main: ticketControlPanel,
    }
};