import Nav from "@/components/Nav";
import Dashboard from "@/components/Dashboard";

const DashboardHome = () => {

  console.log("its working");
  return (
    <div className="flex">
      <Nav />
      <Dashboard />
    </div>
  );
};

export default DashboardHome;
