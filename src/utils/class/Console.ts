// The list of colors

const colors = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    underscore: "\x1b[4m",
    blink: "\x1b[5m",
    reverse: "\x1b[7m",
    hidden: "\x1b[8m",

    FgBlack: "\x1b[30m",
    FgRed: "\x1b[31m",
    FgGreen: "\x1b[32m",
    FgYellow: "\x1b[33m",
    FgBlue: "\x1b[34m",
    FgMagenta: "\x1b[35m",
    FgCyan: "\x1b[36m",
    FgWhite: "\x1b[37m",

    BgBlack: "\x1b[40m",
    BgRed: "\x1b[41m",
    BgGreen: "\x1b[42m",
    BgYellow: "\x1b[43m",
    BgBlue: "\x1b[44m",
    BgMagenta: "\x1b[45m",
    BgCyan: "\x1b[46m",
    BgWhite: "\x1b[47m",
} as const;

type ColorList = keyof typeof colors;
export class Console {
    static #numberTest = 0;

    /** 
     * @private 
     * method to display a number with a given number of characters 
     * @param number The number to modify
     * @param count The number of characters
     * @example
     * this.#numberDisplay (49, 3)
     * // return "049"
     */
    static #numberFormat(number: string|number, count: number = 2) {
        return (("0".repeat(count)) + String(number)).slice(count * -1);
    }
    /** 
     * @private 
     * Method to generate the time display
     * @param color1 Other value color
     * @param color2 Alphanumeric value color
     */
    static #time(color1: string, color2: string) {
        const date = new Date();
        return `${color1}[ ${color2}${this.#numberFormat(date.getDate())}${color1}/${color2}${this.#numberFormat(date.getMonth()+1)}${color1}/${color2}${date.getFullYear()} ${color1}| ${color2}${this.#numberFormat(date.getHours())}${color1}:${color2}${this.#numberFormat(date.getMinutes())}${color1}:${color2}${this.#numberFormat(date.getSeconds())}${color1}.${color2}${this.#numberFormat(date.getMilliseconds(), 3)} ${color1}]${colors.FgWhite}`;
    }
    /** 
     * @private 
     * Method to generate the title display
     * @param color1 Other value color
     * @param color2 Alphanumeric value color
     * @param title Console line title
     */
    static #title(color1: string, color2: string, title: string) {
        return `${color1}[ ${color2}${colors.bright}${title.toUpperCase()}${colors.reset} ${color1}]${colors.FgWhite}`
    }

    /** 
     * @param values Value displayed in the console
     * @alphanumericColor Foreground Cyan 
     * @otherColor Foreground Yellow
     */
    static log(...values: any) {
        console.log(this.#time(colors.FgYellow, colors.FgCyan), ...values);
    }

    /** 
     * @param values Value displayed in the error console
     * @alphanumericColor Foreground Red 
     * @otherColor Foreground Yellow
     */
    static error(...values: any) {
        console.error(this.#time(colors.FgYellow, colors.FgRed), this.#title(colors.FgYellow, colors.FgRed, "Error"), ...values);
    }

    /** 
     * @param title Console line title
     * @param values Value displayed in the console
     * @alphanumericColor Foreground Cyan 
     * @otherColor Foreground Yellow
     */
    static info(title: string, ...values: any) {
        console.log(this.#time(colors.FgYellow, colors.FgCyan), this.#title(colors.FgYellow, colors.FgCyan, title), ...values);
    }    
    
    /** 
     * @param values Value displayed in the console
     * @alphanumericColor Foreground Magenta 
     * @otherColor Foreground Yellow
     */
    static test(...values: any) {
        this.#numberTest++;
        console.log(this.#time(colors.FgYellow, colors.FgMagenta), this.#title(colors.FgYellow, colors.FgMagenta, `Test N°${this.#numberTest}`), ...values);
    }

    /** 
     * @param color1 Other value color
     * @param color2 Alphanumeric value color
     * @param title Console line title
     * @param values Value displayed in the console
     */
    static custom(color1: ColorList, color2: ColorList, title: string|undefined, ...values: any) {
        if (title) console.log(this.#time(colors[color1], colors[color2]), this.#title(colors[color1], colors[color2], title), ...values);
        else console.log(this.#time(colors[color1], colors[color2]), ...values);
    }
}