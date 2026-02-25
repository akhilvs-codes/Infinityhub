


export const fetchDashboard = async (params: {
  fromDate?: string;
  toDate?: string;
  status?: string;
  category?: string;
}) => {
  const query = new URLSearchParams(params as any).toString();

  const response = await fetch(`http://localhost:8000/api/dashboard?${query}`);
  if (!response.ok) {
    throw new Error("Failed to fetch dashboard");
  }

  return response.json();
};