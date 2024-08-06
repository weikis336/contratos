class ButtonData extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  async connectedCallback () {
    await this.render()
  }

  async render () {
    this.shadow.innerHTML =
      /* html */`
      

      <style>
      .container{
        display: flex;
        justify-content: center;
        gap: 2rem;
        align-items: row;


      }
      .container, h1, h2, h3, p{
        padding: 0;
        margin: 0;
        color: #fff;
        font-size: 2rem;

      }
      .button_box{
        display: flex;
        justify-content: center;


      }
      .send-button {
        display: inline-block;
        padding: 15px 25px;
        font-size: 24px;
        cursor: pointer;
        text-align: center;
        text-decoration: none;
        outline: none;
        color: #fff;
        background-color: #04AA6D;
        border: none;
        border-radius: 15px;
        box-shadow: 0 9px #999;
      }

      .send-button:hover {background-color: #3e8e41}

      .send-button:active {
        background-color: #3e8e41;
        box-shadow: 0 5px #666;
        transform: translateY(4px);
      }

      </style>
        <div class="container">        
          <div class="button_box">
            <button class="send-button">Cargar Datos</button>
          </div>
          <div class="statusText_Box"> 
            <p class="statusText">Estado</p>
          </div>
      </div>
  
      `

    const button = this.shadow.querySelector('.send-button')
    const status = this.shadow.querySelector('.statusText')
    button.addEventListener('click', async () => {
      try {
        let response = await fetch('https://catalegdades.caib.cat/resource/anss-9wx4.json')

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        let responseData = await response.json()

        responseData = responseData.map(element => {
          const newElement = {}

          Object.entries(element).forEach(([key, value]) => {
            if (typeof value === 'string' && value.includes(',')) { newElement[key] = value.replace(',', '.') }
          })

          return newElement
        })

        response = await fetch(`${import.meta.env.VITE_API_URL}/api/front/contracts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(responseData)
        })

        if (!response.ok) {
          throw new Error(`Error posting data! Status: ${response.status}`)
        }

        console.log('Data posted successfully:')
        status.textContent = 'Datos enviados exitosamente'
      } catch (error) {
        console.error('Fetch error:', error)
        status.textContent = 'Error en el envío de datos'
      }
    })
  }
}
customElements.define('button-component', ButtonData)
