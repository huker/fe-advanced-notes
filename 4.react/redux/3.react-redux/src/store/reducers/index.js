/**
 * Created by huk on 2019/10/5.
 */
import counter1 from './counter1';
import counter2 from './counter2';
import { combineReducers } from '../../redux';

const reducer = combineReducers({
    counter1,
    counter2
});

export default reducer