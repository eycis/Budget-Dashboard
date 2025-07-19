import Nav from "@/components/Nav";

import NotificationSettings from "@/components/NotificationSettings";

const Notifications = () => {

  console.log("its working");
  return (
    <div className="flex">
      <Nav />
      <NotificationSettings />
    </div>
  );
};

export default Notifications;
