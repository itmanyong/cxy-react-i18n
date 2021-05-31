import { MODEL_NAME, STORE_LANG_KEY } from '../configs/vars';
/**
 * 根据当前lang的存在性重置lang
 */
export const watch_lang_message = {
	fn: ({ lang, message }, o, f) => {
		if (!lang && Object.keys(message)[0]) {
			if (localStorage.getItem(STORE_LANG_KEY)) {
				f.refCtx.reducer[MODEL_NAME].setLang(localStorage.getItem(STORE_LANG_KEY));
			} else {
				f.refCtx.reducer[MODEL_NAME].setLang(Object.keys(message)[0]);
			}
		}
		if (lang && lang != o.lang) {
			localStorage.setItem(STORE_LANG_KEY, lang);
		}
	},
	depKeys: ['lang', 'message'],
	compare: true,
	immediate: true,
};
