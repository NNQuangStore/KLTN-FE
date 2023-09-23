import { useEffect, useState } from 'react';
import { useColDataTable } from '../../../../pages/ScoreboardPage/hook/useColDataTable';
import { IScoreboard } from '../../../../pages/ScoreboardPage/service/types/scoreboard';
import { Input, Tooltip } from 'antd';
import { MESSAGE, checkNumberScore } from '../../../../utils/unit';

interface Props {
  defaultValue?: string;
  col?: [keyof IScoreboard, number?];
  row?: string;
  useSetValue?: any
}

const CellEditableTable = ({defaultValue, useSetValue, col, row}: Props) => {  
  const [value, setValue] =  useSetValue(row ?? '', col) ?? useState('');
  // const [valueSemesterCore, setValueSemesterCore] =  useSetValue(row ?? '', ['semesterCore']) ?? useState('');
  const [openError, setOpenError] = useState<boolean>(false);

  useEffect(() => {    
    if(checkNumberScore(value)) {
      setOpenError(false);      
      // setValueSemesterCore(value);
      return;
    } 
    setOpenError(true);
  },[value]);

  return (
    <>
      <Tooltip open={openError} title={MESSAGE._NUMBER_SCORE} color={'red'}>
        <input
          style={{
            outline: 'none',
            border: 'none',
            backgroundColor: 'transparent',
            width: '100%',
            textAlign: 'center'
          }}
          value={defaultValue ? defaultValue : value.toString()}
          onChange={(e) => {
            setValue(e?.target?.value ?? '');
          }}

        />
      </Tooltip>
    </>
  );
};

export default CellEditableTable;