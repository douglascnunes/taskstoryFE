import { useState } from 'react';
import KeywordsModal from '../KeywordsModal';
import styles from './KeywordsPicker.module.css';
import KeywordTag from '../KeywordTag';


export default function KeywordsPicker({ keywords, keywordToggle }) {
  const [isOpenKeywordModal, setIsOpenKeywordModal] = useState(false);

  function openKeywordModal() {
    setIsOpenKeywordModal(true);
  }

  function closeKeywordModal() {
    setIsOpenKeywordModal(false);
  }

  return (
    <>
      <KeywordsModal
        isOpenModal={isOpenKeywordModal}
        closeModal={closeKeywordModal}
        selectedKeywords={keywords}
        keywordToggle={keywordToggle}
      />
      <div className={styles.container}>
        <div className={styles.label}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
          </svg>
          <label htmlFor="keywords">Palavras-Chave</label>
        </div>
        <div className={styles.keywordsContainer}>
          {keywords &&
            keywords.map((keyword) => (
              <KeywordTag key={keyword.id} keyword={keyword} />
            ))}
          {keywords.length === 0 &&
            <div className={styles.nokeywords}>
              <p>Atividade sem Palavras-Chave</p>
            </div>
          }
          <button className={styles.addKeywordButton} onClick={openKeywordModal}>+</button>
        </div>
      </div>
    </>
  )
};