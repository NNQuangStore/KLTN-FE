import { get } from 'lodash';
import { RootState } from '../../../store';
import uiSelector from '../../../services/UI/selectors';
import { PATH_LOADING } from './constants';
import { useAppSelector } from '../../../store/hooks';



type MyState = RootState['lesion'];

const getCurrentState = (state: RootState): MyState => state.lesion;

const selector = <KEY = keyof MyState>(key: KEY, defaultValue?: any) => useAppSelector(state => get(getCurrentState(state), key as any, defaultValue));

const getLesionList = () => selector('lesionList');






// const getStudentDetail = () => selector('studentDetail');





// const getParams = () => selector('params') as IStudentParam;

const lesionSelectors = {
  getLesionList,
  // getlesionDetail,
};

export default lesionSelectors;