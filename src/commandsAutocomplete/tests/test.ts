import { HandlerInteraction } from '../../utils/class';
import { HandlerType } from '../../utils/types';

export default new HandlerInteraction<HandlerType.CommandsAutocomplete>("test", (client, interaction) => {

    const focusedOption = interaction.options.getFocused(true);
    const choices: {name: string, value: string}[] = [ {name: "Cat!", value: "cat"}, {name: "Dog?", value: "dog"} ];

    const filtered = choices.filter(choice => (choice.name.toLowerCase()+"").includes(focusedOption.value.toLocaleLowerCase())).slice(0, 24)
    interaction.respond(filtered)

});
