import notification from "./notification";

export const showSuccessNotification = ({
  message = "",
  description = "",
  ...config
} = {}) => {
  notification.success({
    message: <strong>{message}</strong>,
    description,
    // icon: <CheckCircleFilled style={{ color: "#52C41A", fontSize: 22 }} />,
    style: {
      backgroundColor: "#f6ffed",
      border: "1px solid #b7eb8f",
      borderRadius: 6,
    },
    ...config,
  });
};

export const showErrorNotification = ({
  message = "",
  description = "",
  ...config
} = {}) => {
  notification.error({
    message: <strong>{message}</strong>,
    description,
    // icon: <CloseCircleFilled style={{ color: "#F5222D", fontSize: 22 }} />,
    style: {
      backgroundColor: "rgba(255, 241, 240, 1)",
      border: "1px solid rgba(255, 163, 158, 1)",
      borderRadius: 6,
    },
    ...config,
  });
};

export const showWarningNotification = ({
  message = "",
  description = "",
  ...config
} = {}) => {
  notification.warning({
    message: <strong>{message}</strong>,
    description,
    // icon: <InfoCircleFilled style={{ color: "#faad14", fontSize: 22 }} />,
    style: {
      backgroundColor: "#fffbe6",
      border: "1px solid #ffe58f",
      borderRadius: 6,
    },
    ...config,
  });
};
