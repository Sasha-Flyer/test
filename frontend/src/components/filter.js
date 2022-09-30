export const FilterComponent = ({currentFilter, setFilter}) => {
  const {name, filter, value} = currentFilter;
  console.log(currentFilter);
  return (
    <div className={"filter"}>
      <div>
        <select value={name} onChange={(e) => { setFilter({name: e.target.value, filter, value}) }}>
          <option value="name">name</option>
          <option value="amount">amount</option>
          <option value="distance">distance</option>
        </select>
      </div>
      <div>
        <select value={filter} onChange={(e) => { setFilter({name, filter: e.target.value, value}) }}>
          <option value="eq">equals</option>
          <option disabled={name === "name"} value="gt">greater than</option>
          <option disabled={name === "name"} value="lt">less than</option>
          <option disabled={name !== "name"} value="like">like</option>
        </select>
      </div>

      <div>
        <input type="text" name="value" onChange={(e) => { setFilter({name, filter, value: e.target.value}) }}/>
      </div>
    </div>
  )
}
