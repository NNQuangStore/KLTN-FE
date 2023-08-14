import { MaskedInput } from 'antd-mask-input';
import NumberMask from '../../../utils/Mask/number';
import { PhoneOutlined } from '@ant-design/icons';
import { Form, FormItemProps } from 'antd';

interface Props extends FormItemProps {

}

const InputPhone = ({
  ...props
}: Props) => {
  return (
    <Form.Item {...props}>
      <MaskedInput mask={NumberMask.PHONE} addonBefore={<PhoneOutlined />} size='large'/>
    </Form.Item>
  );
};

export default InputPhone;