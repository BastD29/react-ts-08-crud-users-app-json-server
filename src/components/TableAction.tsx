import { Tooltip } from "antd";
import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import theme from "../constants/theme";

interface Props {
  link: string;
  tooltip?: string;
  icon?: ReactNode;
  text?: string;
  onClick?: (...args: any[]) => void;
}

const TableAction: FC<Props> = ({ link, tooltip, icon, text, onClick }) => {
  return (
    <Link to={link} onClick={onClick}>
      {tooltip ? (
        <Tooltip title={tooltip} color={theme.colors.primary}>
          {icon ? icon : null}
          {text ? text : null}
        </Tooltip>
      ) : (
        <>
          {icon ? icon : null}
          {text ? text : null}
        </>
      )}
    </Link>
  );
};

export default TableAction;
