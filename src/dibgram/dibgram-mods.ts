export type DibgramMods = {
    chat_enableSyntaxHighlighting: boolean
};

const dibgramMods: DibgramMods = JSON.parse(localStorage.getItem('dibgramMods') || '{}');
export default dibgramMods;

export function saveDibgramMod<T extends keyof DibgramMods>(name: T, value: DibgramMods[T]): void {
    dibgramMods[name]= value;
    localStorage.setItem('dibgramMods', JSON.stringify(dibgramMods));
}
