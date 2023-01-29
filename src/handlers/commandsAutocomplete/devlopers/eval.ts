import { HandlerInteraction } from "../../../utils/class";
import { HandlerType } from "../../../utils/typings";
import { inspect } from 'util';

export default new HandlerInteraction<HandlerType.CommandsAutocomplete>("eval",
	async (client, interaction) => {
        const choices: {name: string, value: string}[] = []
        
        try {
            const value = (interaction.options.getFocused(true)?.value??"undefined");
            const stringCode = value.replace(/--page \d{1,}/, "")

            const evalCode = await eval(!stringCode.includes("await") ? stringCode : "(async() => {\n"+stringCode+"\n})();")
            const resultCode = inspect(evalCode, { depth: 1 })
            const splitResultCode = resultCode.replace(/(\d|\D){99}/g, (v) => v+"\n").split(/\n/g)

            let page = (Number(value.split(/--page (\d{1,})/)?.at(1))??1)|0;
            if (page < 1) page = 1;
            if (Math.ceil(splitResultCode.length/24) < page) page = 1;

            for (let i = 0+(24*(page-1)); i < 24*page; i++) {
                if (!splitResultCode[i]) break;
                choices.push({name: splitResultCode[i], value: String(i)});
            }
            
            await interaction.respond(choices.filter(r => Number(r.value) < 24*page && Number(r.value) >= 0+(24*(page-1))))

        } catch (err) {
            const splitResultCode =  String(err).replace(/\w{99}/g, (v) => v+"\n").split(/\n/g)
            for (let i = 0; i < 24; i++) {
                if (!splitResultCode[i]) break;
                choices.push({name: splitResultCode[i], value: String(i)});
            }
            await interaction.respond(choices)
        }
	}, {
        permissions: {
            user: {
                dev: true
            }
        }
    }
);