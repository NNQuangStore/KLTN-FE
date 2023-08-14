import { Form, FormItemProps, Input } from 'antd';

interface Props extends FormItemProps {
  placeholder?: string;

}

const InputTextPassword = ({
  placeholder,
  ...props
}: Props) => {
  return (
    <Form.Item {...props}>
      <Input.Password
        placeholder={placeholder}
        size='large' />
    </Form.Item>
  );
};

export default InputTextPassword;