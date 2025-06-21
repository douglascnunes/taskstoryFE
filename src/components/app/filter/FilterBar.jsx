import { useContext, useState } from 'react';
import styles from './FilterBar.module.css';
import AddFilterButton from './add/AddFilterButton';
import DateFilterCard from './cards/DateFilterCard';
import { AppContext } from '../../../store/app-context';
import FilterCard from './cards/FilterCard';


export default function FilterBar() {
  const { filterCondictions, filterPriorities, filterKeywords } = useContext(AppContext);

  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(prev => !prev);
  };


  let filterButtonList = [
    ...filterCondictions.map(condiction => (
      <FilterCard key={condiction} type="condiction" value={condiction} />
    )),
    ...filterPriorities.map(priority => (
      <FilterCard key={priority} type="priority" value={priority} />
    )),
    ...filterKeywords.map(keyword => (
      <FilterCard key={keyword} type="keyword" value={keyword} />
    ))
  ];


  return (
    <div className={`${styles.container} ${expanded ? styles.expanded : ''}`}>
      <div className={styles.fixedMenu}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
        </svg>
        <div className={styles.dates}>
          <div className={styles.date}>
            <label>Início:</label>
            <DateFilterCard type="start" />
          </div>
          <div className={styles.date}>
            <label>Final:</label>
            <DateFilterCard type="end" />
          </div>
          <AddFilterButton />
        </div>
      </div>

      <div className={styles.filterButtonList}>
        {filterButtonList}
      </div>

      <button className={`${styles.expandFiltersButton} button`} onClick={toggleExpand}>
        {expanded ? 'Mostrar menos' : 'Mostrar Mais'}
      </button>
    </div>
  );
};