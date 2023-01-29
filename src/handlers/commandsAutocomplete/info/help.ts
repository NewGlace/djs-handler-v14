import { HandlerInteraction } from "../../../utils/class";
import { HandlerType } from "../../../utils/typings";
import helpConfig from "../../../res/help.json";

export default new HandlerInteraction<HandlerType.CommandsAutocomplete>("help",
	async (client, interaction) => {
        const choices: {name: string, value: string}[] = []
        const categoryList: string[] = [];

        // Loop to recover the different categories 
        for (const [k, v] of client.commands) {
            // So we look for all the commands without a slash (the names of the commands correspond to their path)
            if (!k.includes("/")) {
                // We check that there is no such category and see if it is blacklisted
                if (!choices.find(r => r.name == k) && !helpConfig.ignore.includes(v.category)) choices.push({name: k, value: k});
            }
        }
        const focusedOption = interaction.options.getFocused(true);
        
        // We sort according to the search
        const filtered = choices.filter(choice => (choice.name.toLowerCase()+"").includes(focusedOption.value.toLocaleLowerCase())).slice(0, 24)
        await interaction.respond(filtered)
	}
);