// import {useEffect} from 'react';
// import {useHistory} from 'react-router-dom';

// /**
//  * Хук, выполняющий коллбек при навигации стрелками вперед/назад в браузере
//  */
// export const useArrowBrowserNavigation = (callback: () => void) => {
//   const history = useHistory();

//   useEffect(
//     () =>
//       history.listen((_, action) => {
//         if (action === 'POP') {
//           callback();
//         }
//       }),
//     [history, callback]
//   );
// };
