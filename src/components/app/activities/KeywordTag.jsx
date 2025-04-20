import style from './KeywordTag.module.css';

export default function KeywordTag({ keyword, hoverColor = false }) {
  let hslColor = "";

  if (keyword.colorAngle > 900) {
    hslColor = `hsl(0, 0%, ${keyword.colorAngle - 900}%)`;
  } else {
    hslColor = `hsl(${keyword.colorAngle}, 50%, 50%)`;
  }

  const className = `${style.keywordTag} ${hoverColor ? style.hoverable : ''}`;

  return (
    <div style={{ backgroundColor: hslColor }} className={className}>
      <p>{keyword.name}</p>
    </div>
  );
}
