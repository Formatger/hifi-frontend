import React from "react";
import Sidebar from "@/components/common/Sidebar";

const Documentations = () => {
  return (
    <div>
      <h1>Documentations</h1>
    </div>
  );
};

const DocumentationsPage = () => {
  return <Sidebar layout={<Documentations />} />;
};

export default DocumentationsPage;
