
export const TableComponent = ({
                          data, className
                        }) => {
  if (data.length) {
    let headings = Object.keys(data[0]);
    return (
      <div key={className}>
      <table className={'table table-bordered ' + className}>
        <thead>
        <tr>
          {
            headings.map((heading, i) => <th key={i}>{heading}</th>)
          }
        </tr>
        </thead>
        <tbody>
        {
          data.map((item, j) =>
            <tr key={j}>
              {
                headings.map((heading, i) => <td key={i}>{item[heading]}</td>)
              }
            </tr>
          )
        }
        </tbody>
      </table>
      </div>
    );
  }
  return  ""
}
