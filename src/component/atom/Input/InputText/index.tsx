import { Form, FormItemProps, Input } from 'antd';

interface Props extends FormItemProps {
  placeholder?: string;
}

const InputText = ({
  placeholder,
  ...props
}: Props) => {
  return (
    <Form.Item {...props}>
      <Input
        placeholder={placeholder}
        size='large' />
    </Form.Item>
  );
};

export default InputText;