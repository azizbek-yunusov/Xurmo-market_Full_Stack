import React from "react";
import { HelmetTitle } from "../../../../utils";
import { Layout } from "../../Layouts";
import CabinetTabs from "./CabinetTabs";
import CabinetTop from "./CabinetTop";

const Projects = () => {
  return (
    <>
      <HelmetTitle title={"Cabinet"} />
      <Layout>
        <section className="my-4">
          <CabinetTop />
          <CabinetTabs />
          <div className="my-5">Project</div>
        </section>
      </Layout>
    </>
  );
};

export default Projects;
