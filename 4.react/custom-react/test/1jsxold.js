const babel = require('@babel/core')

const code = `
 <h1>
 hello <span style={{color: 'red'}}>word</span>
 </h1>`;

const _code = babel.transform(code, {
    plugins: [
        ['@babel/plugin-transform-react-jsx', {
            runtime: 'classic'
        }]
    ]
})

// node test/old.js 运行
console.log(_code)

// '/*#__PURE__*/React.createElement("h1", null, "hello ", /*#__PURE__*/React.createElement("span", {\n' +
// '  style: {\n' +
// "    color: 'red'\n" +
// '  }\n' +
// '}, "word"));',

React.createElement("h1", null, "hello ", React.createElement("span", {
    style: {
        color: "red"
    }
}))
