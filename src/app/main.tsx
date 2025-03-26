import ReactDOM from 'react-dom/client';

import App from './provider';

// import {worker} from './mock/browser'

// const initApp = async () => {
//     // if (process.env.NODE_ENV !== 'development' || import.meta.env.VITE_API_MSW === 'false') {
//     //     return;
//     // }

//     if (process.env.NODE_ENV === 'development') {
//         await worker.start({
//   onUnhandledRequest: 'warn' // 또는 더 가시적으로 하려면 'error'
// })
//     }

//     // const startApiMockWorker = await import('./mock/browser');
//     console.log('msw 확인', import.meta.env.VITE_BASE_API +import.meta.env.VITE_API_LOGIN)
// //    await worker.start()
//     // await startApiMockWorker.startApiMockWorker();
// };

// initApp().then(() => {
//     ReactDOM.createRoot(document.getElementById('root')!).render(
//         // <React.StrictMode>
//         <App />,
//         // </React.StrictMode>,
//     );
// });


// function startWorker() {
//     if (import.meta.env.VITE_API_MSW === 'true') {
//         // 목업 API 설정
//         return import('./mock/browser').then(({ worker }) => {
//             return worker.start({ onUnhandledRequest: 'bypass' });
//         });
//     }
//     return Promise.resolve();
// }
// startWorker().then(() => {
//      ReactDOM.createRoot(document.getElementById('root')!).render(
//         // <React.StrictMode>
//         <App />,
//         // </React.StrictMode>,
//     );
// });


// 2. main.ts에서 async/await 처리가 제대로 되는지 확인
// 모든 API 요청 전에 MSW가 완전히 초기화되도록 해야 합니다
// const initApp = async () => {
//   if (process.env.NODE_ENV === 'development') {
//     console.log('MSW 초기화 시작' , `${import.meta.env.VITE_BASE_API}${import.meta.env.VITE_API_LOGIN}`);
//     await worker.start({
//       onUnhandledRequest: 'warn'
//     });
//     console.log('MSW 초기화 완료');
//   }
  
//   // MSW 초기화 후에 앱 렌더링
//   ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
// };
// initApp().catch(console.error);


const initApp = async () => {
    if (process.env.NODE_ENV !== 'development' || import.meta.env.VITE_API_MSW === 'false') {
        return;
    }
    const startApiMockWorker = await import('./mock/browser');
    await startApiMockWorker.startApiMockWorker();
};

initApp().then(() => {
    ReactDOM.createRoot(document.getElementById('root')!).render(
        // <React.StrictMode>
        <App />,
        // </React.StrictMode>,
    );
});
