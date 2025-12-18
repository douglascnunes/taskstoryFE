import Panel from "../../components/app/panel/Panel";
import { useQuery } from "@tanstack/react-query";
import FloatingActionButton from "../../components/app/panel/FloatingActionButton";
import Modal from "../../components/app/activities/modals/Modal";
import ModalContextProvider from "../../store/modal-context/modal-context";
import { AppContext } from "../../store/app-context";
import { getUser } from "../../api/user";
import { useContext, useEffect } from "react";
import FilterBar from "../../components/app/filter/FilterBar";
import FloatingDateButton from "../../components/app/panel/FloatingDateButton";
import styles from './MainApp.module.css';


export default function MainApp() {
  const { loadUser } = useContext(AppContext);

  const { data: fetchedUser } = useQuery({
    queryKey: ['user'],
    queryFn: ({ signal }) => getUser({ signal }),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  useEffect(() => {
    if (fetchedUser) {
      loadUser(fetchedUser);
    }
  }, [fetchedUser]);


  return (
    <div className={styles.container}>
      <ModalContextProvider>
        <Modal />
        <FloatingActionButton />
        <FloatingDateButton type="start" />
        <FloatingDateButton type="end" />
        <FilterBar />
        <Panel />
      </ModalContextProvider>
    </div>
  );
};