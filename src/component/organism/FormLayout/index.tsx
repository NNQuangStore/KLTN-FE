import { Form } from 'antd';
import { FormProps, useForm } from 'antd/es/form/Form';
import RowH from '../../atom/Row/RowH';
import ButtonOutline from '../../atom/Button/ButtonOutline';
import ButtonPrimary from '../../atom/Button/ButtonPrimary';
import { styled } from 'styled-components';
import { useShowModal } from '../ModalButton/hooks/useShowModal';

interface Props<T> extends FormProps {
  children?: React.ReactNode,
  onSubmit: (value: any) => void,
  renderButton?: React.ReactElement
}

const FormLayout = <T extends {}> ({
  children,
  onSubmit,
  renderButton,
  ...props
}: Props<T>) => {

  const [form] = useForm<T>();
  const [, setOpen] = useShowModal(false);


  const ButtonForm = () => {
    return renderButton ?? <ActionFormStyled justify={'center'} >
      <ButtonOutline onClick={() => setOpen(false)} label='Cancel'/>
      <ButtonPrimary htmlType='submit' label='Save'/>
    </ActionFormStyled>;
  };

  return (
    <FormStyled
      form={form}
      autoComplete='off'
      layout='vertical'
      onFinish={onSubmit}
      {...props}
    >
      {children}
      <ButtonForm />
    </FormStyled>
  );
};

export default FormLayout;

const FormStyled = styled(Form)`
  .ant-form-item-label {
    font-weight: bold;
  }
`;

const ActionFormStyled = styled(RowH)`
  & > button:first-child {
    margin-right: 12px;
  }

`;