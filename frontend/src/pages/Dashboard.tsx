import { useEffect, useState } from "react";
import { fetchDashboard } from "../api/dashboardApi";
import StatusChart from "../components/StatusChart";

interface DashboardData {
  summary: {
    total: number;
  };
  charts: {
    statusDistribution: { status: string; count: number }[];
  };
}

const Dashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(false);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [status, setStatus] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await fetchDashboard({
        fromDate,
        toDate,
        status,
      });
      console.log(res,"data from backed");
      
      setData(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [fromDate, toDate, status]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Dashboard</h2>

      {/* Filters */}
      <div style={{ marginBottom: 20 }}>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />

        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      {/* Loading */}
      {loading && <p>Loading...</p>}

      {/* Summary */}
      {!loading && data && (
        <div>
          <h3>Total Records: {data.summary.total}</h3>

          <StatusChart
            data={data.charts.statusDistribution}
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;