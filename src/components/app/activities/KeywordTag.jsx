import style from './KeywordTag.module.css';
import { getColorFromAngle } from '../../../util/helpers/keyword.js';

export default function KeywordTag({ keyword, hoverColor = false }) {
  const hslColor = getColorFromAngle(keyword.colorAngle);
  const className = `${style.keywordTag} ${hoverColor ? style.hoverable : ''}`;

  return (
    <div style={{ backgroundColor: hslColor }} className={className}>
      <p>{keyword.name}</p>
    </div>
  );
}
