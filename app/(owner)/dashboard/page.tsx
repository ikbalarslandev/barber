import { cookies } from "next/headers";
import { getBusinessByEmail } from "@/actions/getbusinessbyEmail";

const Dashboard = async () => {
  // Get cookies on the server
  const cookieStore = await cookies();
  console.log("niki", cookieStore);
  const email = cookieStore.get("email")?.value;

  const business = email ? await getBusinessByEmail(email) : null;

  return (
    <div>
      <pre>{business?.name}</pre>
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard!</p>
    </div>
  );
};

export default Dashboard;
