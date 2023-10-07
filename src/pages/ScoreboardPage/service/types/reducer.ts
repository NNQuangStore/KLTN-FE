import { Evalution } from '../apis';
import { IScoreboardRes } from './scoreboard';

export interface IState {
  scoreboard: IScoreboardRes | null;
  params: {
    evaluation: keyof typeof Evalution;
  }
}