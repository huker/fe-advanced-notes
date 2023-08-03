// '/*#__PURE__*/_jsxs("h1", {\n' +
// '  children: ["hello ", /*#__PURE__*/_jsx("span", {\n' +
// '    style: {\n' +
// "      color: 'red'\n" +
// '    },\n' +
// '    children: "word"\n' +
// '  })]\n' +
// '});',

import {REACT_ELEMENT_TYPE} from "shared/ReactSymbols.js";

// 遍历对象的时候除了这些 别的都转移过去
const RESERVED_PROPS = {
    key: true,
    ref: true,
    __self: true,
    __source: true
}

function ReactElement(type, key, ref, props) {
    // 这就是react元素 也被称为虚拟dom
    return {
        $$typeof: REACT_ELEMENT_TYPE,
        type,
        key,
        ref,
        props
    }
}

export function jsxDEV(type, config) {
    let propName; // 属性名
    const props = {}; // 属性对象
    let ref = null;
    let key = null;

    // 避免原型上的属性
    if (Object.prototype.hasOwnProperty.call(config, 'key')) {
        key = config.key;
    }
    if (Object.prototype.hasOwnProperty.call(config, 'ref')) {
        ref = config.ref;
    }
    for (propName in config) {
        if (Object.prototype.hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
            props[propName] = config[propName];
        }
    }
    return ReactElement(type, key, ref, props);
}
