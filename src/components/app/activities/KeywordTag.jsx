import style from './KeywordTag.module.css';
import { getColorFromAngle } from '../../../util/helpers/keyword.js';

export default function KeywordTag({ keyword, hoverColor = false, viewMode = "normal" }) {
  const hslColor = getColorFromAngle(keyword.colorAngle);
  const className = `${style.keywordTag} ${hoverColor ? style.hoverable : ''}`;
  const height = viewMode === "normal" ? "rem" : "0.5rem";

  return (
    <div style={{ backgroundColor: hslColor, height: height }} className={className}>
      {viewMode === "normal" &&
        <p>{keyword.name}</p>
      }
    </div>
  );
}
