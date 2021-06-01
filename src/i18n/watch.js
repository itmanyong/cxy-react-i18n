import { MODEL_NAME, STORE_LANG_KEY } from '../configs/vars';
import { dispatch } from 'concent';

// 延迟到下一个事件循环执行reducer函数，确保watch流程中的改变数据先落地，之后触发的另外一轮computed函数
const invokeReducer = (reducer, payload) => setTimeout(() => dispatch(reducer, payload), 0);

/**
 * 根据当前lang的存在性重置lang
 */
export const watch_lang_message = {
	fn: ({ lang, message }, o, f) => {
		if (!lang && Object.keys(message)[0]) {
			const setLang = f.refCtx.reducer[MODEL_NAME].setLang;
			if (localStorage.getItem(STORE_LANG_KEY)) {
				invokeReducer(setLang, localStorage.getItem(STORE_LANG_KEY));
			} else {
				invokeReducer(setLang, Object.keys(message)[0]);
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
