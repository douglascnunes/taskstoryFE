import { useQuery } from "@tanstack/react-query";
import AreaOfLifeButton from "./AreaOfLifeButton";
import { fetchAreasOfLife } from "../../api/onboarding";
import { OnboardingContext } from "../../store/onboarding-context";
import { useContext } from "react";

import { AREAOFLIFE_TYPE, AREAOFLIFE_COLORS } from '../../util/color';

function OnboardingAreaOfLife() {
  const { areaOfLife } = useContext(OnboardingContext);
  const { desirable, mostPracticed } = areaOfLife;

  const { data: areasOfLife } = useQuery({
    queryKey: ['areasoflife'],
    queryFn: ({ signal }) => fetchAreasOfLife({ signal })
  })

  return (
    <div>
      <p>Cada tipo de conta no aplicativo oferece uma abordagem personalizada para ajudar o usuário a vencer a procrastinação Serão entregues
        missões especificas que guiamodesenvolvimento da autorregulação e da autoeficácia, focando nas áreas que precisam ser melhoradas.</p>
      <div>
        <div>
          <h3>Pergunta 1- Áreas da vida mais praticadas</h3>
          <p>Quais dessas áreas da vida você realiza mais atividades (tarefas, projetos, metas e planejamentos)?</p>
        </div>
        <div>
          {areasOfLife.map(area => {
            return (
              <AreaOfLifeButton
                key={area.id}
                type={AREAOFLIFE_TYPE[1]}
                isSelected={mostPracticed.includes(area.name)}
                colors={AREAOFLIFE_COLORS.find(a => a[0] === area.name)}
              >
                {area.name}
              </AreaOfLifeButton>
            )
          })}
        </div>
        <div>
          <h3>Pergunta 2 - Áreas da vida mais desejadas</h3>
          <p>Quais dessas áreas da vida você deseja realizar mais atividades (tarefas, projetos, metas e planejamentos)?</p>
        </div>
        <div>
        {areasOfLife.map(area => {
            return (
              <AreaOfLifeButton
                key={area.id}
                type={AREAOFLIFE_TYPE[0]}
                isSelected={desirable.includes(area.name)}
                colors={AREAOFLIFE_COLORS.find(a => a[0] === area.name)}
              >
                {area.name}
              </AreaOfLifeButton>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default OnboardingAreaOfLife;