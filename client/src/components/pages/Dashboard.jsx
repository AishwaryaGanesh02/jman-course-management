import React from "react";
import Sidebar from "../common/Sidebar";

const Dashboard = () => {
  const reportUrl = "../../../../data/reports/admin_dashboard.pbip";

  return (
    <div>
      <Sidebar />
      <div style={{ height: "600px", overflow: "hidden" }}>
        <iframe
          title="Power BI Report"
          src={reportUrl}
          width="100%"
          height="100%"
          frameBorder="0"
          allowFullScreen="true"
        />
      </div>
    </div>
  );
};

export default Dashboard;
