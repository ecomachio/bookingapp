import { Outlet } from "react-router-dom";

const BookingList = () => {
  return (
    <div className="container mx-auto ">
      <Outlet />
    </div>
  );
};

export default BookingList;
