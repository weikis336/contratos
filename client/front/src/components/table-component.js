class TableData extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.data = [] // Placeholder for table data
    this.columns = []
  }

  async connectedCallback () {
    await this.fetchData()
    await this.fetchColumns() // Fetch data when the component is connected
    await this.render()
  }

  async fetchColumns () {
    // Simulate fetching column definitions (replace with actual logic)
    this.columns = [
      // { key: 'id', label: 'ID' },
      // { key: 'name', label: 'Name' },
      // { key: 'age', label: 'Age' }
    ]
  }

  async fetchData () {
    // Simulate fetching data (replace with actual data fetching logic)
    this.data = [
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 }
    ]
  }

  async render () {
    const theadContent = this.columns.map(col => `<th>${col.label}</th>`).join('')
    const tbodyContent = this.data.map(item =>
      `<tr>${this.columns.map(col => `<td>${item[col.key]}</td>`).join('')}</tr>`
    ).join('')

    this.shadow.innerHTML = /* html */`
      <style>
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          border: 1px solid #ccc;
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #f4f4f4;
        }
      </style>
      <h1>Datos de la Base de Datos</h1>
      <table id="data-table">
        <thead>
          <tr>${theadContent}</tr>
        </thead>
        <tbody>
          ${tbodyContent}
        </tbody>
      </table>
    `
  }
}

customElements.define('table-data', TableData)
