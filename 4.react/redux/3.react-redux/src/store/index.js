/**
 * Created by huk on 2019/9/27.
 */

import reducer from './reducers';
import { createStore } from '../redux/index';

let store = createStore(reducer);

export default store