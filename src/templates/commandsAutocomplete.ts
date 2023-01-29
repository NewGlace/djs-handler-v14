import { Console, HandlerInteraction } from "../utils/class";
import { HandlerType } from "../utils/typings";

export default new HandlerInteraction<HandlerType.CommandsAutocomplete>("templateButton", (client, interaction) => {

    Console.info("CommandsAutocomplete Template", interaction);

    const choices: {name: string, value: string}[] = [
        { name: "Dog!", value: "dog" },
        { name: "Cat!", value: "cat" },
    ]

    const focusedOption = interaction.options.getFocused(true);
    
    const filtered = choices.filter(choice => (choice.name.toLowerCase()+"").includes(focusedOption.value.toLocaleLowerCase())).slice(0, 24)
    
    interaction.respond(filtered)
});