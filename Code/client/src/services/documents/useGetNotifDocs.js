import { useState, useEffect } from "react";
import documents from "./documents";

export const useGetNotifDocs = () => {
  const [notifDocs, updateNotifDocs] = useState([]);

  useEffect(() => {
      updateNotifs()
  }, [])

  const updateNotifs = async () => {
    const response = await documents.getNotifDocs();
    if (response) {
      const json = await response;
      updateNotifDocs(json);
    }
  };

  return [notifDocs, updateNotifs];
};
