import { Form, FormItemProps, Input } from 'antd';
import { styled } from 'styled-components';

interface Props extends FormItemProps {
  placeholder?: string;
  defaultValue?: string;
  value?: string;
}

const InputText = ({
  placeholder,
  defaultValue,
  value,
  ...props
}: Props) => {
  return (
    <InputTextStyled {...props}>
      <Input
        defaultValue={defaultValue}
        value={value}
        placeholder={placeholder}
        size='large' />
    </InputTextStyled>
  );
};

export default InputText;

const InputTextStyled = styled(Form.Item)`
  width: 100%;
`;