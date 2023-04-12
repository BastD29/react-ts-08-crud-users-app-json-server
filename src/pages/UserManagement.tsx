import { Layout, Form, Row, Col, Input, Button, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { SaveOutlined } from "@ant-design/icons";
import { UserForm } from "../models/UserForm";
import { useCallback, useMemo, useState } from "react";
import { User } from "../models/User";
import { useNavigate, useParams } from "react-router-dom";
import {
  createUserService,
  updateUserService,
} from "../services/users.service";

const { Content } = Layout;

export default function UserManagement() {
  const navigate = useNavigate();
  const params = useParams<{ userId: string }>();
  const isEditMode = useMemo(() => params?.userId !== "new", [params]);

  const [form] = useForm<UserForm>();

  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const formInitialValues = useMemo<UserForm>(() => {
    if (!user) return {} as UserForm;

    return {
      firstName: user.firstName,
      lastName: user.lastName,
    } as UserForm;
  }, [user]);

  const createUser = useCallback(async (data: UserForm) => {
    setIsFetching(true);

    try {
      createUserService(data);
      message.success("user created with success");
      navigate("/");
    } catch (error) {
      console.error(error);
      message.error("error from createUser in UserManagement");
    } finally {
      setIsFetching(false);
    }
  }, []);

  // const updateUser = useCallback(async (data: UserForm, id: string) => {
  const updateUser = useCallback(async (data: User) => {
    setIsFetching(true);

    try {
      // updateUserService(data, id);
      updateUserService(data);
      message.success("user updated with success");
      navigate("/");
    } catch (error) {
      console.error(error);
      message.error("error from updateUser in UserManagement");
    } finally {
      setIsFetching(false);
    }
  }, []);

  const submit = useCallback(
    (values: typeof formInitialValues) => {
      if (isEditMode) {
        // updateUser({ ...values, id: user?.id });
        updateUser({ ...values, id: user?.id });
      } else {
        createUser({ ...values });
      }
    },
    [createUser, updateUser]
  );

  return (
    <Content>
      <p>Create new user</p>

      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        initialValues={formInitialValues}
        onFinish={submit}
      >
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "email required, please fill field",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="First name"
              name="first_name"
              rules={[
                {
                  required: true,
                  message: "first name required, please fill field",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="Last name"
              name="last_name"
              rules={[
                {
                  required: true,
                  message: "last name required, please fill field",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Button
          type="primary"
          htmlType="submit"
          icon={<SaveOutlined />}
          size="middle"
          loading={isFetching}
        >
          Save
        </Button>
      </Form>
    </Content>
  );
}
