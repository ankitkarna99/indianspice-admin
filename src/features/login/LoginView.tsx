import React from "react";
import AuthTemplate from "../../common/templates/auth/AuthTemplate";
import logo from "../../assets/images/brand/logo.png";
import styled from "styled-components";
import { Button, Form, Input } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

const LoginViewStyles = styled.div`
  padding: 1rem;
  .company {
    text-align: center;
    img {
      width: 30%;
    }
  }

  .login {
    margin-top: 1rem;

    button {
      margin-top: 1rem;
    }
  }
`;

function LoginView() {
  const [form] = Form.useForm();

  return (
    <AuthTemplate>
      <LoginViewStyles>
        <div className="company">
          <img src={logo} />
        </div>
        <div className="login">
          <Form form={form} layout="vertical">
            <Form.Item
              name="username"
              label="Username"
              rules={[
                {
                  required: true,
                  message: "Username is required.",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Password is required." },
                {
                  min: 6,
                  message: "Password must be at least 6 characters long.",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              icon={<ArrowRightOutlined />}
              block
            >
              Login
            </Button>
          </Form>
        </div>
      </LoginViewStyles>
    </AuthTemplate>
  );
}

export default LoginView;
