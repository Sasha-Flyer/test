import './App.css';
import {TableComponent} from './components/table.js'
import {PaginationComponent} from './components/pagination.js'
import React, {useEffect, useState} from 'react';
import {FilterComponent} from "./components/filter";

const URL = 'http://localhost:2999/'
const PAGE_LIMIT = 20

function App() {
  const [currentPage, setPage] = useState({number: 1, isLast: false});
  const [rows, setRows] = useState([]);
  const [currentFilter, setFilter] = useState({name: 'name', filter: 'eq', value: ''});

  useEffect(() => {
    if (currentPage.isLast) return // не делаем лишних запросов

    const {name, filter, value} = currentFilter;
    let request = `${URL}?page=${currentPage.number}&limit=${PAGE_LIMIT}`
    if (name.length && filter.length && value.length) {
      if (name === 'name' && filter === 'eq') request += `&${name}.${filter}='${value}'`
      else request += `&${name}.${filter}=${value}`
    }

    fetch(request).then(response => {
      response.json().then(data => {
        data.rows.forEach(row => { // делаем дату в читаемом виде
          row.date = (new Date(row.date)).toDateString();
        })
        // определяем, последняя ли это страница
        if(data.rowCount < PAGE_LIMIT) {
          if(!data.rowCount) {
            setPage({number: currentPage.number-1, isLast: true})
            return
          }
          setPage({number: currentPage.number, isLast: true})
        }

        setRows(data.rows);
      })
    })

  }, [currentPage])

  useEffect(() => {
    setPage({number: 1, isLast: false})
  }, [currentFilter])

  return (
    <div className="App">
      <FilterComponent currentFilter={currentFilter} setFilter={setFilter}/>
      <TableComponent data={rows}/>
      <PaginationComponent currentPage={currentPage.number} setPages={(number) => { setPage({number, isLast: false}) }} isLast={currentPage.isLast}/>
    </div>
  );
}

export default App;
