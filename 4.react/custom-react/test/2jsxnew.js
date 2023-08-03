const babel = require('@babel/core')


const code = `
 <h1>
 hello <span style={{color: 'red'}}>word</span>
 </h1>`;

const _code = babel.transform(code, {
    plugins: [
        ['@babel/plugin-transform-react-jsx', {
            runtime: 'automatic'
        }]
    ]
})
// automatic 最新的转换方式

// node test/2jsxnew.js 运行
console.log(_code)
// 'import { jsx as _jsx } from "react/jsx-runtime";\n' +
// 'import { jsxs as _jsxs } from "react/jsx-runtime";\n' +
// '/*#__PURE__*/_jsxs("h1", {\n' +
// '  children: ["hello ", /*#__PURE__*/_jsx("span", {\n' +
// '    style: {\n' +
// "      color: 'red'\n" +
// '    },\n' +
// '    children: "word"\n' +
// '  })]\n' +
// '});',

/**
 * React.createElement 和 jsx 是一个事情
 *
 * 1.结构不一样了
 * 2.以前的版本需要自己手动引入react 现在不需要了
 *
 * import React from 'react';
 * 这行代码 因为 React在实际编译的时候需要用到 所以虽然代码中没有写React 也需要引入
 *
 *
 */

