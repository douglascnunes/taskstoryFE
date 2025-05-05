import { getOverview } from "../../api/activities";
import Panel from "../../components/app/panel/Panel";
import { queryClient } from "../../api/queryClient";
import { useQuery } from "@tanstack/react-query";
import FloatingActionButton from "../../components/app/panel/FloatingActionButton";
import Modal from "../../components/app/activities/modals/Modal";
import AppContextProvider from "../../store/app-context";
import ModalContextProvider from "../../store/modal-context";
import { dateToYYYYMMDD } from "../../util/date";


export default function MainApp() {
  let startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 2);
  startDate = dateToYYYYMMDD(startDate);
  let endDate = new Date();
  endDate.setMonth(endDate.getMonth() + 2);
  endDate = dateToYYYYMMDD(endDate);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['activities', 'overview'],
    queryFn: ({ signal }) => getOverview({ signal, startdateFilter: startDate, finaldateFilter: endDate }),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  if (isLoading) return <div>Carregando...</div>;
  if (isError) return <div>Erro ao carregar dados.</div>;

  return (
    <AppContextProvider >
      <ModalContextProvider>
        <Modal />
        <FloatingActionButton />
      </ModalContextProvider>
      <Panel
        activities={data.activities}
        mode="overview"
        startOverviewDate={data.startdate}
        endOverviewDate={data.finaldate}
      />
    </AppContextProvider>
  );
};


// export function loader() {
//   return queryClient.fetchQuery({
//     queryKey: ['activities', 'overview'],
//     queryFn: ({ signal }) => getOverview({ signal })
//   });
// };