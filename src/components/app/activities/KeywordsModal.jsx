import { useEffect, useRef, useState } from 'react';
import styles from './KeywordsModal.module.css';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createKeyword, getUserKeywords } from '../../../api/keywords';
import KeywordTag from './KeywordTag';
import { getAreasOfLife } from '../../../api/areaoflife';
import { queryClient } from '../../../api/queryClient';


export default function KeywordsModal({ isOpenModal, closeModal, selectedKeywords, keywordToggle }) {
  const [rawKeywords, setRawKeywords] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [filterArea, setFilterArea] = useState(null);
  const [newKeyword, setNewKeyword] = useState({ name: "", colorAngle: null, areaOfLifeId: null })
  const modalRef = useRef();

  const { data: fetchedKeywords } = useQuery({
    queryKey: ['keywords', localStorage.getItem('userId')],
    queryFn: ({ signal }) => getUserKeywords({ signal }),
  });

  const { data: areasOfLife } = useQuery({
    queryKey: ['areasOfLife'],
    queryFn: ({ signal }) => getAreasOfLife({ signal }),
  });

  const { mutate } = useMutation({
    mutationFn: createKeyword,
    onSuccess: () => {
      queryClient.invalidateQueries(['keywords']);
    }
  });

  function clearFilter() {
    setFilterText('');
    setFilterArea(null);
  }

  function handleChangeNewKeyword(field, value) {
    if (field === 'name' && value.length < 15) {
      setNewKeyword(prev => {
        return { ...prev, name: value }
      });
    };
    
    if (field === 'areaoflife') {
      const selectedArea = areasOfLife.find(area => area.id === Number(value));
      if (!selectedArea) return;
  
      setNewKeyword(prev => ({
        ...prev,
        colorAngle: selectedArea.colorAngle,
        areaOfLifeId: value,
      }));
    };
  };


  const displayedKeywords = rawKeywords.filter(kw => {
    const matchesText = kw.name.toLowerCase().includes(filterText.toLowerCase());
    const matchesArea = !filterArea || kw.areaOfLifeId === filterArea;
    return matchesText && matchesArea;
  });

  useEffect(() => {
    if (fetchedKeywords) {
      setRawKeywords(
        fetchedKeywords.filter(kw =>
          !selectedKeywords.some(sel => sel.id === kw.id)
        )
      );
    }
  }, [fetchedKeywords, selectedKeywords]);


  useEffect(() => {
    const handleClickOutside = e => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeModal();
      }
    };
    if (isOpenModal) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpenModal, closeModal]);

  if (!isOpenModal) return null;


  return (
    <div className={styles.overlay}>
      <div className={styles.modal} ref={modalRef}>
        <h3 className={styles.title}>Adicionar Palavra-Chave</h3>
        <div className={styles.filtermenu}>
          <input
            className={styles.input}
            type="text"
            placeholder="Filtrar por nome..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
          {areasOfLife && (
            <select
              className={styles.filterSelect}
              value={filterArea ?? ''}
              onChange={e => setFilterArea(e.target.value ? Number(e.target.value) : null)}
            >
              <option value="">Todas as áreas</option>
              {areasOfLife.map(area => (
                <option key={area.id} value={area.id}>
                  {area.name}
                </option>
              ))}
            </select>
          )}
          <button
            onClick={clearFilter}>
            Limpar Filtro
          </button>
        </div>

        <div className={styles.keywordgrid}>
          {displayedKeywords.map(keyword => (
            <a
              key={keyword.id}
              className={styles.keywordButton}
              onClick={() => keywordToggle(keyword)}
            >
              <KeywordTag keyword={keyword} hoverColor={true} />
            </a>
          ))}
          {displayedKeywords.length === 0 && (
            <p className={styles.emptyState}>Nenhuma corresponde.</p>
          )}
        </div>

        <h3 className={styles.title}>Criar Palavra-Chave</h3>
        <div className={styles.filtermenu}>
          <input
            className={styles.input}
            type="text"
            placeholder="Digite um nome..."
            value={newKeyword.name}
            onChange={(e) => handleChangeNewKeyword('name', e.target.value)}
          />
          {areasOfLife && (
            <select
              className={styles.filterSelect}
              value={areasOfLife.find(a => a.id === newKeyword.areaOfLifeId?.id)}
              onChange={e => handleChangeNewKeyword('areaoflife', e.target.value)}
            >
              <option value="">Todas as áreas</option>
              {areasOfLife.map(area => (
                <option key={area.id} value={area.id}>
                  {area.name}
                </option>
              ))}
            </select>
          )}
          <button
            onClick={() => mutate({ keyword: newKeyword })}
          >Criar</button>
        </div>
        <h3 className={styles.title}>Palavras-Chave Adicionadas</h3>
        <div className={styles.keywordgrid}>
          {selectedKeywords.length > 0 ? (
            selectedKeywords.map((keyword) => {
              return (
                <a className={styles.keywordButton} key={keyword.id} onClick={() => keywordToggle(keyword)}>
                  <KeywordTag key={keyword.id} keyword={keyword} hoverColor={true} />
                </a>
              )
            })
          ) : (
            <div className={styles.nokeywords}>
              <p>Atividade sem Palavras-Chave</p>
            </div>
          )}
        </div>
      </ div>
    </div>
  )
};