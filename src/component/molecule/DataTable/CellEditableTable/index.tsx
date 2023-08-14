import { useState } from 'react';
import ContentEditable from 'react-contenteditable';

type Props = {
  defaultValue?: string
}

const CellEditableTable = ({defaultValue}: Props) => {

  const [value, setValue] = useState<string>();

  return (
    <>
      <ContentEditable
        html={(value === undefined ? value : defaultValue) ?? ''}
        onChange={(e) => setValue(e?.target?.value ?? '')}
      />
    </>
  );
};

export default CellEditableTable;