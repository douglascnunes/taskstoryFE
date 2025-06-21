import { useQuery } from "@tanstack/react-query";
import AreaOfLifeButton from "./AreaOfLifeButton";
import { fetchAreasOfLife } from "../../api/onboarding";
import { OnboardingContext } from "../../store/onboarding-context";
import { useContext } from "react";
import { getColorFromAngle } from "../../util/helpers/keyword.js";

function OnboardingAreaOfLife() {
  const { areaOfLife } = useContext(OnboardingContext);
  const { desirable, mostPracticed } = areaOfLife;

  const { data: areasOfLife = [] } = useQuery({
    queryKey: ['areasoflife'],
    queryFn: ({ signal }) => fetchAreasOfLife({ signal }),
  });

  return (
    <div>
      <p>
        Cada tipo de conta no aplicativo oferece uma abordagem personalizada para ajudar o usuário a vencer a procrastinação.
        Serão entregues missões específicas que guiam o desenvolvimento da autorregulação e da autoeficácia, focando nas áreas que precisam ser melhoradas.
      </p>

      <div>
        <div>
          <h3>Pergunta 1 - Áreas da vida mais praticadas</h3>
          <p>Quais dessas áreas da vida você realiza mais atividades (tarefas, projetos, metas e planejamentos)?</p>
        </div>

        <div>
          {areasOfLife.map(area => (
            <AreaOfLifeButton
              key={area.id}
              type="mostPracticed"
              isSelected={mostPracticed.includes(area.name)}
              colorAngle={area.colorAngle}
            >
              {area.name}
            </AreaOfLifeButton>
          ))}
        </div>

        <div>
          <h3>Pergunta 2 - Áreas da vida mais desejadas</h3>
          <p>Quais dessas áreas da vida você deseja realizar mais atividades (tarefas, projetos, metas e planejamentos)?</p>
        </div>

        <div>
          {areasOfLife.map(area => (
            <AreaOfLifeButton
              key={area.id}
              type="DESIRABLE"
              isSelected={desirable.includes(area.name)}
              colorAngle={area.colorAngle}
            >
              {area.name}
            </AreaOfLifeButton>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OnboardingAreaOfLife;
