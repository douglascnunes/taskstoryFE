import { getOverview } from "../../api/activities";
import Panel from "../../components/app/panel/Panel";
import { queryClient } from "../../api/queryClient";
import { useQuery } from "@tanstack/react-query";
import FloatingActionButton from "../../components/app/panel/FloatingActionButton";
import Modal from "../../components/app/activities/modals/Modal";
import AppContextProvider from "../../store/app-context";
import ModalContextProvider from "../../store/modal-context";


export default function MainApp() {

  const { data } = useQuery({
    queryKey: ['activities', 'overview'],
    queryFn: ({ signal }) => getOverview({ signal })
  });


  return (
    <AppContextProvider >
      <ModalContextProvider>
        <Modal />
      </ModalContextProvider>
      <FloatingActionButton />
      <Panel
        activities={data.activities}
        mode="overview"
        startdate={data.startdate}
        finaldate={data.finaldate}
      />
    </AppContextProvider>
  );
};


export function loader() {
  return queryClient.fetchQuery({
    queryKey: ['activities', 'overview'],
    queryFn: ({ signal }) => getOverview({ signal })
  });
}