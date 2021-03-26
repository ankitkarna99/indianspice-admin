import { useForm } from "antd/lib/form/Form";
import React from "react";
import useApi from "../../core/hooks/useApi";
import ConfigApi from "../../core/http/providers/config/config.api";
import NotificationService from "../../core/services/NotificationService";

function useConfigView() {
  const apiManager = useApi();
  const [config, setConfig] = React.useState<any>({});
  const [privateConfig, setPrivateConfig] = React.useState<any>({});
  const [formConfig] = useForm();
  const [formPrivateConfig] = useForm();
  const [savingPrivateConfig, setSavingPrivateConfig] = React.useState<boolean>(
    false
  );
  const [savingConfig, setSavingConfig] = React.useState<boolean>(false);

  const saveConfigs = async (data: any) => {
    try {
      setSavingConfig(true);
      const response = await apiManager.execute(ConfigApi.saveConfig(data));
      NotificationService.showNotification("success", response.message);
      setSavingConfig(false);
    } catch (e) {
      setSavingConfig(false);
    }
  };

  const savePrivateConfigs = async (data: any) => {
    try {
      setSavingPrivateConfig(true);
      const response = await apiManager.execute(
        ConfigApi.savePrivateConfig(data)
      );
      NotificationService.showNotification("success", response.message);
      setSavingPrivateConfig(false);
    } catch (e) {
      setSavingPrivateConfig(false);
    }
  };

  const getConfigs = async () => {
    try {
      const [configResponse, privateConfigResponse] = await Promise.all([
        apiManager.fetch(ConfigApi.getConfig()),
        apiManager.fetch(ConfigApi.getPrivateConfig()),
      ]);
      formConfig.setFieldsValue(configResponse);
      formPrivateConfig.setFieldsValue(privateConfigResponse);
      setConfig(configResponse);
      setPrivateConfig(privateConfigResponse);
    } catch (err) {}
  };

  React.useEffect(() => {
    getConfigs();
  }, []);

  return {
    apiManager,
    formConfig,
    formPrivateConfig,
    config,
    privateConfig,
    getConfigs,
    saveConfigs,
    savePrivateConfigs,
    savingPrivateConfig,
    savingConfig,
  };
}

export default useConfigView;
