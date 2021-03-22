import { getType, deepClone } from "../utils/utils";

/**
 * 设置使用的语言包
 * @param {string} newLang i18n state message key
 */
export function setLang(newLang, _, f) {
  if (!newLang) {
    console.warn(`cxy-react-i18n 设置语言 值不能为空`);
  } else if (getType(newLang) !== "string") {
    console.warn(`cxy-react-i18n 设置语言 新语言类型格式错误,期望:string`);
  } else if (!f.moduleComputed.i18nLangObj[newLang]) {
    console.warn(`cxy-react-i18n 设置语言 新语言类型的包未定义`);
  } else {
    return {
      lang: deepClone(newLang),
    };
  }
}

/**
 * 设置新的语言包-覆盖性
 * @param {object} newMessage 新的完整的语言包 object
 */
export function setMessage(newMessage, _, f) {
  if (!newMessage) {
    console.warn(`cxy-react-i18n 设置语言包 值不能为空`);
  } else if (getType(newMessage) !== "object") {
    console.warn(`cxy-react-i18n 设置语言包 值的类型不正确,需要一个对象`);
  } else if (_.lang && !newMessage[_.lang]) {
    console.warn(
      `cxy-react-i18n 设置语言包 当前正在使用的语言在新语言包中不存在,请补充/先重置正在使用的语言包`
    );
  } else {
    return {
      message: { ...newMessage },
    };
  }
}

/**
 * 批量添加不存在的语言包-已有的不添加
 * @param {*} newMesaage 不存在的语言包
 */
export function addMessageItem(messageItems, _, f) {
  // 新语言包需要做已有语言包的内容比对，新语言包必须只能包含已存在语言包的key-排除已有语言包
  if (!messageItems) {
    console.warn(`cxy-react-i18n 添加新语言包 值不能为空`);
  } else if (getType(messageItems) !== "object") {
    console.warn(`cxy-react-i18n 添加新语言包 值的类型不正确,需要一个对象`);
  } else {
    return {
      message: deepClone({
        ..._.message,
        ...messageItems,
      }),
    };
  }
}

/**
 * 删除单个语言包
 * @param {string} messageKey 已存在的语言类型
 */
export function deleteMessageItem(messageKey, _, f) {
  const { i18nLangObj = {} } = f.moduleComputed;
  if (!messageKey) {
    console.warn(`cxy-react-i18n 删除语言包 值不能为空`);
  } else if (getType(messageKey) !== "string") {
    console.warn(`cxy-react-i18n 删除语言包 值类型错误`);
  } else if (!i18nLangObj[messageKey]) {
    console.warn(`cxy-react-i18n 删除语言包 指定的语言包key不存在`);
  } else {
    const nowMessage = deepClone(_.message);
    delete nowMessage[messageKey];
    return {
      message: nowMessage,
    };
  }
}

/**
 * 批量添加语言包内容-增量性
 * @param {object} messageItems 新的语言包,当前已存在的语言包
 */
export function addMessageText(messageItems, _, f) {
  // 还需要判断数据结构
  if (!messageItems) {
    console.warn(`cxy-react-i18n 添加已有语言包内容 值不能为空`);
  } else if (getType(messageItems) !== "object") {
    console.warn(
      `cxy-react-i18n 添加已有语言包内容 值的类型不正确,需要一个对象`
    );
  } else {
    const { i18nLangKeys } = f.moduleComputed;
    if (i18nLangKeys && i18nLangKeys.length) {
      const nowMessage = deepClone(_.message);
      i18nLangKeys.forEach((msgKey) => {
        nowMessage[msgKey] = {
          ...nowMessage[msgKey],
          ...messageItems[msgKey],
        };
      });
      return {
        message: nowMessage,
      };
    } else {
      return {
        message: deepClone(messageItems),
      };
    }
  }
}

/**
 * 更新当前已存在的语言包信息-增量性
 * @param {*} messageItems 新的语言包,当前已存在的语言包
 */
export function updateMessageText(messageItems, _, f) {
  // 要进行格式验证
  if (!messageItems) {
    console.warn(`cxy-react-i18n 更新语言包内容 值不能为空`);
  } else if (getType(messageItems) !== "object") {
    console.warn(`cxy-react-i18n 更新语言包内容 值的类型不正确,需要一个对象`);
  } else {
    const nowMessage = deepClone(_.message);
    const notLnag = [];
    for (let key in messageItems) {
      if (nowMessage[key]) {
        for (let textKey in messageItems[key]) {
          nowMessage[key][textKey] = messageItems[key][textKey];
        }
      } else {
        notLnag.push(key);
      }
    }
    if (notLnag.length) {
      console.warn(
        `cxy-react-i18n 添加语言包 未添加的语言包类型:${notLnag.join(
          "、"
        )},原因：已有语言类型中不存在这些语言类型`
      );
    }
    return {
      message: nowMessage,
    };
  }
}

/**
 * 删除某语言包下面的文字key
 * @param {object} _ i18n state
 * @param {*} messageTextKey 语言包下的对照文字key
 * @returns boolean
 */
export function deleteMessageText(messageTextKey, _, f) {
  if (!messageTextKey) {
    console.warn(`cxy-react-i18n 删除语言包对应文本 值不能为空`);
  } else if (getType(messageTextKey) !== "string") {
    console.warn(`cxy-react-i18n 删除语言包对应文本 值类型错误`);
  } else if (f.moduleComputed.i18nMessageKeys.indexOf(messageTextKey) === -1) {
    console.warn(`cxy-react-i18n 删除语言包对应文本 值不存在于当前语言包内`);
  } else {
    const nowMessage = deepClone(_.message);
    for (let key in nowMessage) {
      delete nowMessage[key][messageTextKey];
    }
    return {
      message: nowMessage,
    };
  }
}