const Main = {
    init: function () {
        this.cacheSelectors()
        this.bindEvents()
    }, // responsável por fazer o cache dos selectors, ou seja, controlar boa parte da aplicação

    cacheSelectors: function() {
        this.checkButtons = document.querySelectorAll('.check')
        this.$inputTask = document.querySelector('#inputTask')
        this.$list = document.querySelector('#list')
        this.$removeButtons = document.querySelectorAll('.remove')
    }, //responsável por selecionar os elementos do html e armazenar em uma variável

    bindEvents: function() {
        const self = this

        this.checkButtons.forEach(function(button) {
            button.onclick = self.Events.checkButtons_click
                
            
        })

        this.$inputTask.onkeypress = self.Events.inputTask_keypress.bind(this)

        this.$removeButtons.forEach(function(button) {
            button.onclick = self.Events.removeButton_click
        })


    }, //responsável por adicionar eventos na aplicação web



    Events: {
        checkButtons_click: function(e) {
            const li = e.target.parentElement
            const isDone = li.classList.contains('done') // verifica se existe a class .done ou não e retornando um valor boleano

            if (isDone) {
                return li.classList.remove('done') //boa prática: verificar primeiro a negação da variável, no caso estamos retornando adição da class .done e parando a execução do código no caso se for verdadeira (return), economizando custos de armazenamento, eliminando o uso do "else"
            } 

            li.classList.add('done')
            
            
        },

        inputTask_keypress: function(e){ // Dentro de uma função de um evento, o 'this' sempre vai ser o próprio elemento que adicionou no evento. Atenção aos comportamentos do 'this'


            const key = e.key
            const value = e.target.value

            if(key === 'Enter') {
                this.$list.innerHTML += `
                    <li>
                        <div class="check"></div>
                        <label class="task">
                            ${value}
                        </label>
                        
                        <button class="remove"></button>
                    </li>
                `

                e.target.value = ''

                this.cacheSelectors()
                this.bindEvents()
            }
        },

        removeButton_click: function(e) {
            let li = e.target.parentElement

            li.classList.add('removed')


            setTimeout(function() {
                li.classList.add('hidden')
            },300)
        }



    
    },




    
} //Este Main vai controlar toda a aplicação, sendo um componente separado



Main.init()