import React from "react";
import TopData from "./TopData";
import { Layout } from "../Layouts";
import { HelmetTitle } from "../../../utils";
import { useTranslation } from "react-i18next";
import UserBar from "./User/UserBar";

const HomeDashboard = () => {
  let { t } = useTranslation(["home"]);
  const userAgent = navigator.userAgent;
  console.log("User-Agent: ", userAgent);
  return (
    <>
      <HelmetTitle title={t("admin-panel")} />
      <Layout>
        <h1 className="text-2xl xl:text-3xl text-gray-700 dark:text-gray-200 font-semibold mt-3 xl:ml-4">
          {t("overview")}
        </h1>
        <TopData />
        <UserBar />
      </Layout>
    </>
  );
};

export default HomeDashboard;
