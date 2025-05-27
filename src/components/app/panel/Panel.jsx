import Section from "./Section";
import style from './Panel.module.css';
import { SECTION_NAMES } from "../../../util/enum";
import {
  filterLateActivities,
  filterMonthActivities,
  filterPriorityActivities,
  filterTodayActivities,
  filterWeekActivities,
  generateInstances,
  updateCondiction,
} from "../../../util/panel/panel";



export default function Panel({ activities, mode, startOverviewDate, endOverviewDate }) {
  let activityInstances = generateInstances(activities, startOverviewDate, endOverviewDate);
  // console.log('panel',activityInstances)
  activityInstances = updateCondiction(activityInstances);

  let [activitiesLate, remainingLateActivities] = filterLateActivities(activityInstances);
  activityInstances = remainingLateActivities;

  let [activitiesPriority, remainingPriorityActivities] = filterPriorityActivities(activityInstances);
  activityInstances = remainingPriorityActivities;

  let [activitiesToday, remainingTodayActivities] = filterTodayActivities(activityInstances);
  activityInstances = remainingTodayActivities;

  let [activitiesWeek, remainingWeekActivities] = filterWeekActivities(activityInstances);
  activityInstances = remainingWeekActivities;

  let activitiesMonths = filterMonthActivities(activityInstances, startOverviewDate, endOverviewDate);

  const today = new Date();
  let sectionMonthsBefore;
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  activitiesMonths.forEach(month => {
    const { month: m, year } = month.date;

    if (year < currentYear || (year === currentYear && m < currentMonth)) {
      sectionMonthsBefore = (
        <>
          {sectionMonthsBefore}
          <Section
            activities={month.activities}
            monthName={month.name}
            year={month.date.year}
            key={`${m}-${year}`}
          />
        </>
      );
    }
  });

  let sectionMonthsAfter;
  activitiesMonths.forEach(month => {
    const { month: m, year } = month.date;

    if (year > currentYear || (year === currentYear && m >= currentMonth)) {
      sectionMonthsAfter = (
        <>
          {sectionMonthsAfter}
          <Section
            activities={month.activities}
            year={month.date.year}
            monthName={month.name}
            key={`${m}-${year}`}
          />
        </>
      );
    }
  });


  if (mode === "overview") {
    return (
      <>
        <div className={style.panel}>
          {sectionMonthsBefore}
          <Section activities={activitiesLate} monthName={SECTION_NAMES[0]} year="" />
          <Section activities={activitiesPriority} monthName={SECTION_NAMES[1]} year="" />
          <Section activities={activitiesToday} monthName={SECTION_NAMES[2]} year="" />
          <Section activities={activitiesWeek} monthName={SECTION_NAMES[3]} year="" />
          {sectionMonthsAfter}
        </div>
      </>
    );
  }

  return (
    <h1>PANEL</h1>
  );
};