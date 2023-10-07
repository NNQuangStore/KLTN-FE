import { useAppDispatch } from '../../../store/hooks';
import scoreboardActions from '../service/actions';
import scoreboardSelectors from '../service/selectors';
import { IScoreboard } from '../service/types/scoreboard';


export const useColDataTable = (row: string, col : [keyof IScoreboard, number?]) : [string, (value: string) => void] => {
  const dispatch = useAppDispatch();
  // const rowData = scoreboardSelectors.getScoreboard().find(o => o.studentCode === row);
  const [name, index] = col;
  // const valueTable = rowData?.[name] as string ?? '';  
  // const value = index !== undefined ? (rowData?.[name] as any[])?.[index]?.toString() ?? ''  : valueTable ?? '';  

  const setValue = (value: string) => {
    dispatch(scoreboardActions.setColScoreboard({row, col, value}));
  };

  // return [value, setValue];
  return ['', setValue];
};