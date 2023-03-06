import React from "react";
import { useTranslation } from "react-i18next";
import { HelmetTitle } from "../../../../utils";
import { Layout } from "../../Layouts";

const Team = () => {
  let { t } = useTranslation(["profile"]);

  return (
    <>
      <HelmetTitle title={`${t("team")} - ${t("personal")}`} />
      <Layout>
        team
      </Layout>
    </>
  );
};

export default Team;
