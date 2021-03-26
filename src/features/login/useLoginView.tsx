import React from "react";
import { useHistory } from "react-router-dom";
import useApi from "../../core/hooks/useApi";
import AuthApi from "../../core/http/providers/auth/auth.api";
import LocalStorageService from "../../core/services/LocalStorageService";
import NotificationService from "../../core/services/NotificationService";

function useLoginView() {
  const apiManager = useApi();
  const history = useHistory();

  const doLogin = async (data: any) => {
    try {
      const response = await apiManager.execute(AuthApi.login(data));
      NotificationService.showNotification("success", response.message);
      LocalStorageService.setAccessToken(response.token);
      history.replace("/home");
    } catch (err) {}
  };

  return {
    apiManager,
    doLogin,
  };
}

export default useLoginView;
