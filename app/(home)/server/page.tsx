import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import React from "react";

type Props = {};

const OrdersPage = async (props: Props) => {
  const data = await getServerSession(authOptions);

  return <div>Server Page</div>;
};

export default OrdersPage;
