import { useContext } from "react";
import Modal from "../common/Modal";
import { OnboardingContext } from "../../store/onboarding-context";
import { ACCOUNT_NAMES } from '../../util/data';
import { getColorFromAngle } from '../../util/helpers/keyword.js';
import style from './OnboardingModal.module.css';

function OnboardingModal({ isOpen, onConfirm, onClose }) {
  const { accountType, areaOfLife } = useContext(OnboardingContext);
  const accountText = ACCOUNT_NAMES.find(a => a[0] === accountType);
  const { desirable, mostPracticed } = areaOfLife;

  return (
    <Modal
      isOpen={isOpen}
      onConfirm={onConfirm}
      onClose={onClose}
      acceptBtnText="Confirmar"
      declineBtnText="Voltar"
    >
      <div className={style.modalDiv}>
        <p>Deseja confirmar as suas escolhas?</p>

        <div>
          <h1>Tipo de conta</h1>
          <strong>{accountText ? accountText[1] : ''}</strong>
        </div>

        <div>
          <h2>Áreas da vida mais praticadas</h2>
          {mostPracticed.map(area => (
            <p
              key={area.id}
              className={style.areaoflife}
              style={{ backgroundColor: getColorFromAngle(area.colorAngle) }}
            >
              {area.name}
            </p>
          ))}
        </div>

        <div>
          <h2>Áreas da vida mais desejadas</h2>
          {desirable.map(area => (
            <p
              key={area.id}
              className={style.areaoflife}
              style={{ backgroundColor: getColorFromAngle(area.colorAngle) }}
            >
              {area.name}
            </p>
          ))}
        </div>
      </div>
    </Modal>
  );
}

export default OnboardingModal;
