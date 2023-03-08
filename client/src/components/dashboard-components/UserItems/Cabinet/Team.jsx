import React from "react";
import { useTranslation } from "react-i18next";
import { HelmetTitle } from "../../../../utils";
import { Layout } from "../../Layouts";
import CabinetTabs from "./CabinetTabs";
import CabinetTop from "./CabinetTop";

const Team = () => {
  let { t } = useTranslation(["user"]);

  return (
    <>
      <HelmetTitle title={`${t("team")} - ${t("personal")}`} />

      <Layout>
        <section className="my-4">
          <CabinetTop />
          <CabinetTabs />
          <div className="my-5">team</div>
        </section>
      </Layout>
    </>
  );
};

export default Team;
