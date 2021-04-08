import { useForm } from "antd/lib/form/Form";
import React from "react";
import useApi from "../../core/hooks/useApi";
import PageApi from "../../core/http/providers/page/page.api";
import NotificationService from "../../core/services/NotificationService";

function usePageView() {
  const apiManager = useApi();
  const [pages, setPages] = React.useState<any>([]);
  const [form] = useForm();
  const [savingPages, setSavingPages] = React.useState<boolean>(false);

  const savePages = async (data: any) => {
    try {
      setSavingPages(true);
      const response = await apiManager.execute(PageApi.savePages(data));
      NotificationService.showNotification("success", response.message);
      setSavingPages(false);
    } catch (e) {
      setSavingPages(false);
    }
  };



  const getPages = async () => {
    try {
      const pageResponse =await
        apiManager.fetch(PageApi.getPages());
        
        let fields: {[key: string]: any} = {};
        pageResponse.forEach((p:any) => {
            fields[p.name] = p.content;
        })
      form.setFieldsValue(fields);

      setPages(pageResponse);
    } catch (err) {}
  };

  React.useEffect(() => {
    getPages();
  }, []);

  return {
    apiManager,
    form,
    pages,
    savePages,
    savingPages,
    getPages
  };
}

export default usePageView;
