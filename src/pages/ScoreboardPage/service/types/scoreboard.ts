
export interface IScoreboard {
  stt: number;
  studentCode: string;
  fullName: string;
}

export interface IScoreboardAttr {
  row: string,
  col: [keyof IScoreboard, number?],
  value: string,

}

export interface IScoreboardRes {
  typeEvalution: string;
  data: Datum[];
  classId: string;
}

interface Datum {
  studentName: string;
  studentId: string;
  scores: Score[];
  id: string;
  EvaluationSheetId: string;
}

interface Score {
  talent?: string | string;
  subjectType: string;
  subjectName?: string | string;
  subjectId?: string | string;
  subjectGroupName?: (null | string)[];
  subjectGroupId?: (null | string)[];
  score?: number;
  id: string;
  evaluationType?: string | string;
  evaluationComment?: string;
}