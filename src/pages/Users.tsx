import { Button, Layout, Space, Table, message } from "antd";
import { ColumnsType } from "antd/es/table";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import { User } from "../models/User";
import { getUsersService } from "../services/users.service";
import TableAction from "../components/TableAction";

const { Content } = Layout;

export default function Users() {
  const navigate = useNavigate();

  const [users, setUsers] = useState<User[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const columns = useMemo<ColumnsType<User>>(() => {
    return [
      {
        title: "First name",
        dataIndex: "first_name",
        key: "first_name",
      },
      {
        title: "Last name",
        dataIndex: "last_name",
        key: "last_name",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Update",
        key: "update",
        // USING TABLE ACTION
        render: (_, user) => {
          return (
            <Space size="middle">
              <TableAction
                link={`/${user.id}`}
                tooltip="edit"
                icon={<EditOutlined />}
              />
            </Space>
          );
        },
      },
      {
        title: "Delete",
        key: "delete",
        // NOT USING TABLE ACTION
        render: (_: any, user) => (
          <Button onClick={() => console.log(user.id)}>Delete</Button>
        ),
      },
    ];
  }, []);

  const getUsers = useCallback(async () => {
    try {
      setIsFetching(true);

      const _users = await getUsersService();
      console.log("_users", _users);

      setUsers(_users);
    } catch (error) {
      message.error("error from Users component");
    } finally {
      setIsFetching(false);
    }
  }, []);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <Content>
      <Button
        type="primary"
        className="mb-1"
        icon={<PlusOutlined />}
        onClick={() => navigate("/new")}
      >
        New user
      </Button>
      <Table
        columns={columns}
        dataSource={users}
        loading={isFetching}
        rowKey={"id"}
      />
    </Content>
  );
}
