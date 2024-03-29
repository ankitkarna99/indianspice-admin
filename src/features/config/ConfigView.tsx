import { Button, Spin, Form, Input, Select, Switch, Drawer } from "antd";
import FormItem from "antd/lib/form/FormItem";
import styled from "styled-components";
import Center from "../../common/components/Center";
import MainTemplate from "../../common/templates/main/MainTemplate";
import useConfigView from "./useConfigView";

const ConfigViewStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 4rem;
`;

function ConfigView() {
  const {
    apiManager,
    config,
    privateConfig,
    formConfig,
    formPrivateConfig,
    getConfigs,
    saveConfigs,
    savePrivateConfigs,
    savingConfig,
    savingPrivateConfig,
  } = useConfigView();

  return (
    <MainTemplate>
      {apiManager.busy && (
        <Center>
          <Spin size="large" />
        </Center>
      )}
      {apiManager.hasError && (
        <Center>
          <Button htmlType="button" onClick={getConfigs}>
            Try Again
          </Button>
        </Center>
      )}
      {!apiManager.hasError && !apiManager.busy && (
        <ConfigViewStyles>
          <div>
            <Form form={formConfig} layout="vertical" onFinish={saveConfigs}>
              <div className="title">Configs</div>

              {Object.entries(config).map(([key, value]) => {
                return (
                  <FormItem
                    key={key}
                    label={key}
                    name={key}
                    rules={[{ required: true, message: `${key} is required.` }]}
                  >
                    <Input />
                  </FormItem>
                );
              })}
              <Button type="primary" htmlType="submit" loading={savingConfig}>
                Save Configuration
              </Button>
            </Form>
          </div>
          <div>
            <Form
              form={formPrivateConfig}
              layout="vertical"
              onFinish={savePrivateConfigs}
            >
              <div className="title">Private Configs</div>

              {Object.entries(privateConfig).map(([key, value]) => (
                <FormItem
                  key={key}
                  label={key}
                  name={key}
                  initialValue={value}
                  rules={[{ required: true, message: `${key} is required.` }]}
                >
                  <Input />
                </FormItem>
              ))}
              <Button
                type="primary"
                htmlType="submit"
                loading={savingPrivateConfig}
              >
                Save Configuration
              </Button>
            </Form>
          </div>
        </ConfigViewStyles>
      )}
    </MainTemplate>
  );
}

export default ConfigView;
