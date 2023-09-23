
export interface IScoreboard {
  stt:string;
  studentCode: string;
  spokenExamScore?: (number | '')[];
  _15MExamScore?: (number | '')[];
  _1SessionExamScore?: (number | '')[];
  finalScore?: number;
  semesterCore: number;
}

export interface IScoreboardAttr {
  row: string,
  col: [keyof IScoreboard, number?],
  value: string,

}