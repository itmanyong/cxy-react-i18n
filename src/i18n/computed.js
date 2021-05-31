/**
 * 当前使用的语言
 */
export function i18nLang({ lang }) {
	return lang || '';
}
/**
 * 当前使用的语言包
 */
export function i18nMessage({ lang, message }) {
	try {
		return message[lang] ? message[lang] : {};
	} catch (error) {
		console.warn(`cxy-react-i18n error:`, error);
		return {};
	}
}

/**
 * 当前所有的语言包类型对象
 */
export function i18nLangObj({ message }) {
	try {
		const lang = {};
		for (let key in message) {
			lang[key] = key;
		}
		return lang;
	} catch (err) {
		return {};
	}
}

/**
 * 当前所有的语言包类型数组
 */
export function i18nLangKeys({ message }) {
	try {
		return Object.keys(message);
	} catch (err) {
		return [];
	}
}

/**
 * 当前语言包内容的key值
 * @returns i18n message key to array
 */
export function i18nMessageKeys({ message }, o, f) {
	try {
		const { i18nLangKeys } = f.cuVal;
		if (i18nLangKeys[0]) {
			return Object.keys(message[i18nLangKeys[0]]);
		} else {
			return [];
		}
	} catch (err) {
		return [];
	}
}
