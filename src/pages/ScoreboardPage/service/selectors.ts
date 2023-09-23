import { get } from 'lodash';
import { RootState } from '../../../store';
import { useAppSelector } from '../../../store/hooks';
import { IScoreboard } from './types/scoreboard';
import { calculateAverage } from '../../../utils/unit';



type MyState = RootState['scoreboard'];

const getCurrentState = (state: RootState): MyState => state.scoreboard;

const selector = <T = MyState>(key: keyof T, defaultValue?: any) => useAppSelector(state => get(getCurrentState(state), key, defaultValue));

const getScoreboard = () => { 
  const data = selector('scoreboard') as IScoreboard[];
  return data.map(o => {
    const finalScore = (
      calculateAverage(o.spokenExamScore as number[]) + 
      calculateAverage(o._15MExamScore as number[]) +
      calculateAverage(o._1SessionExamScore as number[]) + 
      (o.finalScore ?? 0)) / 4;
    return {
      ...o,
      finalScore: finalScore,
    };}) ?? [];
};


const scoreboardSelectors = {
  getScoreboard
};
export default scoreboardSelectors;
