import { Checkbox, Form, FormItemProps } from 'antd';

interface Props extends FormItemProps {
  labelCheckbox: string,
  onChange?: any
}

const InputCheckbox = ({
  labelCheckbox,
  onChange,
  name,
  ...props
}: Props) => {
  const form = Form.useFormInstance();
  console.log(form.getFieldValue(name ?? ''));
  

  return (
    <Form.Item {...props} valuePropName='checked'>
      <Checkbox checked={!!form.getFieldValue(name ?? '')} onChange={onChange} style={{fontWeight: 600}}>{labelCheckbox}</Checkbox>
    </Form.Item>
  );
};

export default InputCheckbox;