import { Button, Spin, Form } from "antd";
import FormItem from "antd/lib/form/FormItem";
import TextArea from "antd/lib/input/TextArea";
import styled from "styled-components";
import Center from "../../common/components/Center";
import MainTemplate from "../../common/templates/main/MainTemplate";
import usePageView from "./usePageView";

const ConfigViewStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 4rem;
`;

function PageView() {
  const {
    apiManager,
    form,
    pages,
    savePages,
    savingPages,
    getPages
  } = usePageView();

  return (
    <MainTemplate>
      {apiManager.busy && (
        <Center>
          <Spin size="large" />
        </Center>
      )}
      {apiManager.hasError && (
        <Center>
          <Button htmlType="button" onClick={getPages}>
            Try Again
          </Button>
        </Center>
      )}
      {!apiManager.hasError && !apiManager.busy && pages && (
        <ConfigViewStyles>
          <div>
            <Form form={form} layout="vertical" onFinish={savePages}>
              <div className="title">Pages</div>

              {pages.map((page: any) => {
                return (
                  <FormItem
                    key={page.id}
                    label={page.name}
                    name={page.name}
                    rules={[{ required: true, message: `${page.name} is required.` }]}
                  >
                    <TextArea rows={5}/>
                  </FormItem>
                );
              })}
              <Button type="primary" htmlType="submit" loading={savingPages}>
                Save Pages
              </Button>
            </Form>
          </div>
        </ConfigViewStyles>
      )}
    </MainTemplate>
  );
}

export default PageView;
