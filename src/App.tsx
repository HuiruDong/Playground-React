// import { useRef } from 'react'
// import { transform } from '@babel/standalone'; // babel 的浏览器版本，可以实时将 tsx 编译成 js
// import type { PluginObj } from '@babel/core';

// const App: React.FC = () => {

//   const utils = `
//     function add(a, b) {
//       return a + b;
//     }
//     export { add };
//   `;

//   /**
//    * 对于 import 来说，直接在浏览器中运行是你不可能的，我们需要动态引入这些依赖
//    * 要不就是学 vite 的 dev server 那样根据 moduleId 返回编译过后的内容，但是作为一个页面，性价比太低
//    * 还可以把一段 JS 代码，用 URL.createObjectURL 和 new Blob 的方式变为一个 url
//    *  URL.createObjectURL(new Blob([code], { type: 'application/javascript' }))
//    */
//   const url = URL.createObjectURL(new Blob([utils], { type: 'application/javascript' }));

//   // 对于 react 和 react-dom 来说可以用 import maps 来实现呢，原理就是用了 esm.sh 提供的 cdn 服务

//   const code = `import { add } from './utils.ts'; console.log(add(2, 3));`

//   const transformImportSourcePlugin: PluginObj = {
//     visitor: {
//       ImportDeclaration(path) {
//         path.node.source.value = url;
//       }
//     },
//   }

//   const onClick = () => {
//     const res = transform(code, {
//       presets: ['react', 'typescript'],
//       filename: 'yi.ts',
//       plugins: [transformImportSourcePlugin]
//     })


//     console.log(res.code)
//   }

//   return <div>
//     <button onClick={onClick}>编译</button>
//   </div>
// }

// export default App


import ReactPlayground from './ReactPlayground';
import './App.scss'

const App:React.FC = () => {
  return <ReactPlayground />
}

export default App