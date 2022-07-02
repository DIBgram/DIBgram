import React from 'react';
import Dialog from '../../../ui/dialog/dialog';
import SmallButton from '../../../ui/elements/small-button';
import ScrollView from '../../../ui/scroll/scrollbar';
import RippleEffect, { handleMyMouseEventsFunction, RippleEffectProps_AutoSettable } from '../../../ui/elements/ripple-effect';
import BoxSearch from '../../../ui/dialog/search';
import __, { getCurrentLanguagePack } from '../../../language-pack/language-pack';
import TdLib from '../../../TdWeb/tdlib';
import './choose-language.scss';
import { addDialog } from '../../../ui/dialog/dialogs';
import ConfirmDialog from '../../../ui/dialog/confirm-dialog';
import ToolStrip from '../../../ui/tool-strip/tool-strip';
import TdApi from '../../../TdWeb/td_api';

type ChooseLanguageDialog= {
    id: string
}

export default function ChooseLanguageDialog({id}: ChooseLanguageDialog): JSX.Element {
    const ref = React.useRef<Dialog>() as React.RefObject<Dialog>;
    // eslint-disable-next-line prefer-const
    let [languages, setLanguages] = React.useState<TdApi.languagePackInfo[]>([]);
    const [search, setSearch] = React.useState('');

    if(search.length > 0) { // Search
        languages = languages.filter(country => country.name.toLowerCase().startsWith(search.toLowerCase()));
    }

    React.useEffect(() => {
        TdLib.sendQuery({
            '@type': 'getLocalizationTargetInfo',
            'only_local': false
        }).then((response) => {
            response= response as TdApi.localizationTargetInfo;
            setLanguages(response.language_packs);
        });
    }, []);

    const currentPack= getCurrentLanguagePack(true);

    return (
        <Dialog ref={ref} id={id} width="320px" className="confirm-dialog">
            <h1>{__('lng_languages')}</h1>

            <BoxSearch value={search} onChange={(e) => setSearch(e.target.value)} />

            <ScrollView scrollAlwaysVisible>
                <ToolStrip.Section>
                    {languages.map(pack => (
                        <LanguagePack 
                            key={pack.id} 
                            pack={pack} 
                            onClick={()=> selectLanguage(pack)} 
                            selected={currentPack.id == pack.id}/>
                    ))}
                </ToolStrip.Section>
            </ScrollView>

            <div className="options">
                <SmallButton onClick={()=> {ref.current?.close();}}>{__('lng_close')}</SmallButton>
            </div>
        </Dialog>
    );
}

type LanguagePackProps= {
    pack: TdApi.languagePackInfo,
    onClick: (e: React.MouseEvent<HTMLDivElement>)=> void,
    selected: boolean
}

export function LanguagePack({pack, onClick, selected}: LanguagePackProps): JSX.Element {
    const ripple = React.useState<RippleEffectProps_AutoSettable>({state: 'off'});
    const rippleEvents = handleMyMouseEventsFunction(ripple);
    return (
        <div className="language-pack-item" onClick={onClick} {...rippleEvents}>
            <RippleEffect {...ripple[0]} color="var(--theme-color-windowBgRipple)"/>
            <div className="content">
                <input type="radio" name="settings-language-pack-selector" checked={selected}/>
                <div className="right">
                    <div className="name">{pack.native_name}</div>
                    <div className="english-name">{pack.name}</div>
                </div>
            </div>
        </div>
    );
}

type SpecialLanguageStrings= {
    [key: string]: string
}
type SpecialLanguageStringsCache= {
    [id: string]: SpecialLanguageStrings
}

function selectLanguage(pack: TdApi.languagePackInfo): void {
    const cache: SpecialLanguageStringsCache= JSON.parse(localStorage.getItem('dibgram-special-language-strings-cache') || '{}');
    let specialStringsImport: Promise<{default:SpecialLanguageStrings}|null>;
    if(!cache[pack.id] && pack.id!='en'){
        specialStringsImport= import(`../../../language-pack/special-strings/${pack.id}.json`);
    } else {
        specialStringsImport= Promise.resolve(null);
    }

    function apply(){
        specialStringsImport.then(specialStrings => {
            if(!cache[pack.id] && pack.id!='en') {
                specialStrings= specialStrings as {default:SpecialLanguageStrings};
                cache[pack.id]= specialStrings.default;
                localStorage.setItem('dibgram-special-language-strings-cache', JSON.stringify(cache));
            }

            localStorage.setItem('dibgram-active-language', JSON.stringify(pack));
            window.location.reload();
        });
    }

    TdLib.sendQuery({
        '@type': 'getLanguagePackStrings',
        language_pack_id: pack.id,
        keys: [ 'lng_sure_save_language' ]
    })
        .then(response => {
            response= response as TdApi.languagePackStrings;
            addDialog('settings-language-restart-confirm-dialog', (
                <ConfirmDialog id="settings-language-restart-confirm-dialog"
                    largeFont={true} onOK={apply}>

                    {__('lng_sure_save_language')}
                    <br/><br/>
                    {(response.strings[0].value as TdApi.languagePackStringValueOrdinary).value}
                </ConfirmDialog>
            ));

            TdLib.sendQuery({ // Request language pack strings so it is already cached after restart
                '@type': 'getLanguagePackStrings',
                language_pack_id: pack.id,
            });
        });
}
