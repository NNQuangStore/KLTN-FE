import { Checkbox, Form, FormItemProps } from 'antd';

interface Props extends FormItemProps {
  labelCheckbox: string,
  onChange?: any
}

const InputCheckbox = ({
  labelCheckbox,
  onChange,
  ...props
}: Props) => {
  return (
    <Form.Item {...props} valuePropName='checked'>
      <Checkbox onChange={onChange} style={{fontWeight: 600}}>{labelCheckbox}</Checkbox>
    </Form.Item>
  );
};

export default InputCheckbox;