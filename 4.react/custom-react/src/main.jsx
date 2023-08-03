import {createRoot} from 'react-dom/client';

let ele = (
    <h1>
        hello<span style={{color: 'red'}}>word</span>
    </h1>
);

console.log(ele)

debugger
const root = createRoot(document.getElementById('root'));
root.render(ele);


