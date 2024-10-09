import React from "react";
import Sidebar from "../common/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex bg-mainbg h-screen">
      <Sidebar />
      <div className="ml-64 w-full h-screen overflow-y-auto mt-5">
        <h1 className="font-extrabold text-19xl pt-8 pb-5">Dashboard</h1>

        <iframe
          title="admin_dashboard"
          className="w-full h-full text-center"
          height=""
          src="https://app.powerbi.com/reportEmbed?reportId=8b36540d-f35f-4324-8cf4-dd165f99ef1b&autoAuth=true&ctid=2800c0a0-70e9-49be-8733-faeaa6aced99"
          frameborder="0"
          allowFullScreen="true"
        ></iframe>
      </div>
    </div>
  );
};

export default Dashboard;
