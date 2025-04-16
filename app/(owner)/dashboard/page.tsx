import { cookies } from "next/headers";
import { getBusinessByEmail } from "@/actions/getbusinessbyEmail";
import DashboardPage from "@/components/pages/dashboard";
import { TBusiness } from "@/prisma/types";

const Dashboard = async () => {
  // Get cookies on the server
  const cookieStore = await cookies();
  const email = cookieStore.get("email")?.value;

  const business = email
    ? ((await getBusinessByEmail(email)) as TBusiness)
    : null;

  if (!business) {
    return <div className="text-center">Business not found</div>;
  }

  return <DashboardPage business={business} />;
};

export default Dashboard;
