import { Checkbox, Form, FormItemProps } from 'antd';

interface Props extends FormItemProps {
  labelCheckbox: string
}

const InputCheckbox = ({
  labelCheckbox,
  ...props
}: Props) => {
  return (
    <Form.Item {...props} valuePropName='checked'>
      <Checkbox>{labelCheckbox}</Checkbox>
    </Form.Item>
  );
};

export default InputCheckbox;