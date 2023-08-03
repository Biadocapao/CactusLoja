import React, { useState } from "react";
import axios from "axios";
import classes from "./CountTags.module.css";

const CountTags = () => {
  const [recentTagsCount, setRecentTagsCount] = useState([]);
  const [savedTagsCount, setSavedTagsCount] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [showSavedTable, setShowSavedTable] = useState(false);

  const countTags = () => {
    // Lógica para contar as tags aqui
    const tags = {}; // Objeto para armazenar a contagem de tags
    const elements = document.getElementsByTagName("*");

    for (let i = 0; i < elements.length; i++) {
      const tag = elements[i].tagName.toLowerCase();
      if (tags[tag]) {
        tags[tag] += 1;
      } else {
        tags[tag] = 1;
      }
    }

    const tagsArray = Object.entries(tags); // Converte o objeto em um array de arrays
    setRecentTagsCount(tagsArray);
    setShowTable(true); // Mostra a tabela após contar as tags
    setShowSavedTable(false); // Esconde a tabela com as contagens salvas
  };

  const clearFilter = () => {
    setShowTable(false); // Esconde a tabela ao limpar o filtro
    setRecentTagsCount([]); // Limpa as contagens de tags recentes
    setShowSavedTable(false); // Esconde a tabela com as contagens salvas
  };

  const saveTagsCount = async () => {
    try {
      // Envia as contagens de tags para o backend para salvar
      const response = await axios.post("http://localhost:5000/api/countTags", {
        tagsCount: recentTagsCount,
      });
      console.log(response.data.message);
    } catch (error) {
      console.error("Erro ao enviar as contagens de tags:", error);
    }
  };

  const fetchSavedTagsCount = async () => {
    if (!showSavedTable && savedTagsCount.length === 0) {
      try {
        // Chama o endpoint do backend para obter as contagens de tags salvas
        const response = await axios.get("http://localhost:5000/api/countTags");
        const formattedTagsCount = response.data.map(({ tag, count }) => [tag, count]);
        setSavedTagsCount(formattedTagsCount);
        setShowTable(false); // Esconde a tabela de contagens recém-contadas
        setShowSavedTable(true); // Mostra a tabela com as contagens salvas
      } catch (error) {
        console.error("Erro ao obter as contagens de tags:", error);
      }
    }
  };

  return (
    <div className={classes.countTagsContainer}>
      <button className={classes.btnCountTags} onClick={countTags}>
        Contar Tags
      </button>
      {showTable && (
        <div className={classes.tableContainer}>
          <h3>Contagens Recentes</h3>
          <table className={classes.tagsTable}>
            <thead>
              <tr>
                <th>Tag</th>
                <th>Quantidade</th>
              </tr>
            </thead>
            <tbody>
              {recentTagsCount.map(([tag, count]) => (
                <tr key={tag}>
                  <td>{tag}</td>
                  <td>{count}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className={classes.btnSaveTags} onClick={saveTagsCount}>
            Salvar Contagens
          </button>
        </div>
      )}
      {showSavedTable && (
        <div className={classes.tableContainer}>
          <h3>Contagens Salvas</h3>
          <table className={classes.savedTagsTable}>
            <thead>
              <tr>
                <th>Tag</th>
                <th>Quantidade</th>
              </tr>
            </thead>
            <tbody>
              {savedTagsCount.map(([tag, count]) => (
                <tr key={`${tag}-${count}`}>
                  <td>{tag}</td>
                  <td>{count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <button className={classes.btnFetchTags} onClick={fetchSavedTagsCount}>
        Consultar
      </button>
      <button className={classes.btnClearFilter} onClick={clearFilter}>
        Limpar Contagens
      </button>
    </div>
  );
};

export default CountTags;
