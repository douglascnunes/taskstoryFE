import { getOverview } from "../../api/activities";
import Panel from "../../components/app/panel/Panel";
import { useQuery } from "@tanstack/react-query";
import FloatingActionButton from "../../components/app/panel/FloatingActionButton";
import Modal from "../../components/app/activities/modals/Modal";
import ModalContextProvider from "../../store/modal-context/modal-context";
import { dateToYYYYMMDD } from "../../util/date";
import { AppContext } from "../../store/app-context";
import { getUser } from "../../api/user";
import { useContext, useEffect } from "react";



export default function MainApp() {
  const { loadUser } = useContext(AppContext);

  const { data: fetchedUser } = useQuery({
    queryKey: ['user'],
    queryFn: ({ signal }) => getUser({ signal }),
  })

  useEffect(() => {
    if (fetchedUser) {
      loadUser(fetchedUser);
    }
  }, [fetchedUser]);


  let startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 2);
  startDate = dateToYYYYMMDD(startDate);
  let endDate = new Date();
  endDate.setMonth(endDate.getMonth() + 2);
  endDate = dateToYYYYMMDD(endDate);

  const { data: fetchedActivities, isLoading, isError } = useQuery({
    queryKey: ['activities', 'overview'],
    queryFn: ({ signal }) => getOverview({ signal, startdateFilter: startDate, finaldateFilter: endDate }),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  if (isLoading) return <div>Carregando...</div>;
  if (isError) return <div>Erro ao carregar dados.</div>;

  return (
    <ModalContextProvider>
      <Modal />
      <FloatingActionButton />
      <Panel
        activities={fetchedActivities.activities}
        mode="overview"
        startOverviewDate={fetchedActivities.startdate}
        endOverviewDate={fetchedActivities.finaldate}
      />
    </ModalContextProvider>
  );
};


// export function loader() {
//   return queryClient.fetchQuery({
//     queryKey: ['activities', 'overview'],
//     queryFn: ({ signal }) => getOverview({ signal })
//   });
// };