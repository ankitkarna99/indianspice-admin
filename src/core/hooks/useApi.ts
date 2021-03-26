import React from "react";
import NotificationService from "../services/NotificationService";

interface ExecuteOptions {
  showFailureNotification?: boolean;
}

const ExecuteOptionsDefault: ExecuteOptions = {
  showFailureNotification: true,
};

function useApi() {
  const [error, setError] = React.useState<any>(null);
  const [busy, setBusy] = React.useState<boolean>(false);

  const clearError = () => {
    setError(null);
  };

  const execute = async <T>(
    apiRequest: Promise<T>,
    options: ExecuteOptions = {}
  ): Promise<T> => {
    options = { ...ExecuteOptionsDefault, ...options };
    try {
      const response = await apiRequest;
      return response;
    } catch (err) {
      if (options.showFailureNotification) {
        NotificationService.showNotification("error", err);
      }
      throw err;
    }
  };

  const fetch = async <T>(
    apiRequest: Promise<T>,
    options: ExecuteOptions = {}
  ): Promise<T> => {
    options = { ...ExecuteOptionsDefault, ...options };
    clearError();
    setBusy(true);
    try {
      const response = await apiRequest;
      setBusy(false);
      return response;
    } catch (err) {
      setBusy(false);
      setError(err);
      if (options.showFailureNotification) {
        NotificationService.showNotification("error", err);
      }
      throw err;
    }
  };

  return {
    error,
    setError,
    busy,
    setBusy,
    hasError: error != null,
    clearError,
    execute,
    fetch,
  };
}

export default useApi;
