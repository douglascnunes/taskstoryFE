// Panel.jsx
import Section from "./Section";
import style from './Panel.module.css';
import { SECTION_NAMES } from "../../../util/enum.jsx";
import {
  filterActivities,
  filterLateActivities,
  filterMonthActivities,
  filterPriorityActivities,
  filterTodayActivities,
  filterWeekActivities,
  generateInstances,
  orderActivities,
  updateCondiction,
} from "../../../util/panel/panel";
import { useContext, } from "react";
import { AppContext } from "../../../store/app-context";
import { useQuery } from "@tanstack/react-query";
import { getOverview } from "../../../api/activities";



export default function Panel() {
  const { startDate, endDate, filterCondictions, filterPriorities, filterKeywords } = useContext(AppContext);

  const { data: fetchedActivities } = useQuery({
    queryKey: ['activities', 'overview', startDate, endDate],
    queryFn: ({ signal }) =>
      getOverview({
        signal,
        startdateFilter: startDate,
        finaldateFilter: endDate,
      }),
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 10,
  });


  let activityInstances = generateInstances(
    fetchedActivities?.activities || [],
    fetchedActivities?.startdate || startDate,
    fetchedActivities?.finaldate || endDate
  );

  activityInstances = updateCondiction(activityInstances);


  activityInstances = filterActivities(activityInstances, filterCondictions, filterPriorities, filterKeywords);

  activityInstances = orderActivities(activityInstances);

  let [activitiesLate, remainingLateActivities] = filterLateActivities(activityInstances);
  activityInstances = remainingLateActivities;

  let [activitiesPriority, remainingPriorityActivities] = filterPriorityActivities(activityInstances);
  activityInstances = remainingPriorityActivities;

  let [activitiesToday, remainingTodayActivities] = filterTodayActivities(activityInstances);
  activityInstances = remainingTodayActivities;

  let [activitiesWeek, remainingWeekActivities] = filterWeekActivities(activityInstances);
  activityInstances = remainingWeekActivities;

  let activitiesMonths = filterMonthActivities(activityInstances, fetchedActivities?.startdate || startDate, fetchedActivities?.finaldate || endDate);

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const todayDay = today.getDate();

  let sectionMonthsBefore;
  let sectionMonthsAfter;

  activitiesMonths.forEach(month => {
    const { month: m, year } = month.date;
    const isCurrentMonth = m === currentMonth && year === currentYear;

    // Parte anterior ao dia de hoje
    if (
      (year < currentYear) ||
      (year === currentYear && m < currentMonth) ||
      (isCurrentMonth && month.name.includes(`1 - ${todayDay - 1}`))
    ) {
      sectionMonthsBefore = (
        <>
          {sectionMonthsBefore}
          <Section
            activities={month.activities}
            monthName={month.name}
            year={month.date.year}
            key={`before-${m}-${year}-${month.name}`}
          />
        </>
      );
    }

    // Parte do mês atual (de hoje até fim) ou meses futuros
    if (
      (year > currentYear) ||
      (year === currentYear && m > currentMonth) ||
      (isCurrentMonth && month.name.includes(`${todayDay} - fim`))
    ) {
      sectionMonthsAfter = (
        <>
          {sectionMonthsAfter}
          <Section
            activities={month.activities}
            monthName={month.name}
            year={month.date.year}
            key={`after-${m}-${year}-${month.name}`}
          />
        </>
      );
    }
  });


  return (
    <div className={style.panel}>
      {sectionMonthsBefore}
      <Section activities={activitiesLate} monthName={SECTION_NAMES[0]} year="" />
      <Section activities={activitiesPriority} monthName={SECTION_NAMES[1]} year="" />
      <Section activities={activitiesToday} monthName={SECTION_NAMES[2]} year="" />
      <Section activities={activitiesWeek} monthName={SECTION_NAMES[3]} year="" />
      {sectionMonthsAfter}
    </div>
  );
};