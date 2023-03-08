import React from "react";
import { useTranslation } from "react-i18next";
import { HelmetTitle } from "../../../../utils";
import { Layout } from "../../Layouts";

const Settings = () => {
  let { t } = useTranslation(["user"]);

  return (
    <>
      <HelmetTitle title={`${t("team")} - ${t("personal")}`} />
      <Layout>settings</Layout>
    </>
  );
};

export default Settings;
