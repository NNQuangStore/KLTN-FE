import { styled } from 'styled-components';

interface ActionTableProps {
  actions: ActionItem[];
}

interface ActionItem {
  icon: React.ReactNode,
  label: string,
  handle: () => void,
  color?: string;
}

const ActionTable = ({actions} : ActionTableProps) => {
  return (
    <ActionTableStyled>
      {actions.map((o, index) => (
        <ActionTableItemStyled color={o.color ?? 'black'} key={index}>
          {o.icon}
          {o.label}
        </ActionTableItemStyled>
      ))}
    </ActionTableStyled>
  );
};

export default ActionTable;

const ActionTableStyled = styled.ul`
  list-style: none;
  display: flex;
  padding: 0px;
`;

const ActionTableItemStyled = styled.li<{color: string}>`
    display: flex;
    color: ${props => props.color};
    flex-wrap: nowrap;
    margin-right: 14px;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
    /* border-bottom: 1px solid ${props => props.color}; */
    span:first-child {
      margin-right: 0.5px;
    }
`;