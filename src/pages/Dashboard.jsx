import DashboardLayout from "../features/dashboard/components/DashboardLayout";
//import DashboardFilter from "../features/dashboard/components/DashboardFilter";
import Heading from "../shared/ui/Heading";
import Row from "../shared/ui/Row";
import Filter from "../shared/ui/Filter";

function Dashboard() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <Filter
          filterField="last"
          options={[
            { value: "7", label: "Last 7 days" },
            { value: "30", label: "Last 30 days" },
            { value: "90", label: "Last 90 days" },
          ]}
        />
      </Row>

      <DashboardLayout />
    </>
  );
}

export default Dashboard;
