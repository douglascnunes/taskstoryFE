import { useContext, useState } from 'react';
import DependenceModal from '../DependenceModal';
import styles from './DependenceSetter.module.css';
import DependenceCard from './DependenceCard';
import { ModalContext } from '../../../../store/modal-context/modal-context';
import { generateInstance } from '../../../../util/helpers/activity';


export default function DependenceSetter() {
  const { dependencies } = useContext(ModalContext);
  const [isOpenDependencyModal, setIsOpenDependency] = useState(false);

  function openDependencyModal() {
    setIsOpenDependency(true);
  };

  function closeDependencyModal() {
    setIsOpenDependency(false);
  };

  return (
    <>
      <DependenceModal
        isOpenModal={isOpenDependencyModal}
        closeModal={closeDependencyModal}
      />
      <div className={styles.container}>
        <div className={styles.label}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3" />
          </svg>
          <label htmlFor="keywords">Dependências</label>
        </div>
        <div className={styles.dependenciesContainer}>
          {dependencies && dependencies.map((dependency, index) => {
            const updatedDependency = {
              type: dependency.type,
              activity: generateInstance(dependency.activity),
              description: dependency.description,
            };
            return (<DependenceCard key={index} dependency={updatedDependency} viewMode="card" />)
          })}
          <button className={`${styles.addKeywordButton} button`} onClick={openDependencyModal}>+</button>
        </div>
      </div>
    </>
  )
};