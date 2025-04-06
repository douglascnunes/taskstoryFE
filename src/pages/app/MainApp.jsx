import { getOverview } from "../../api/activities";
import Panel from "../../components/app/Panel";
import { queryClient } from "../../api/queryClient";
import { useQuery } from "@tanstack/react-query";


export default function MainApp() {
  const { data } = useQuery({
    queryKey: ['activities', 'overview'],
    queryFn: ({ signal }) => getOverview({ signal })
  });

  return (
    <>
      <Panel
        activities={data.activities}
        mode="overview"
        startdate={data.startdate}
        finaldate={data.finaldate}
      />
    </>
  );
};


export function loader() {
  return queryClient.fetchQuery({
    queryKey: ['activities', 'overview'],
    queryFn: ({ signal }) => getOverview({ signal })
  });
}