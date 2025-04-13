import style from './KeywordTag.module.css';

export default function KeywordTag({ keyword }) {
  return (
    <div style={{ backgroundColor: `#${keyword.color}` }} className={style.keywordTag}>
      <p>{keyword.name}</p>
    </div>
  )
}