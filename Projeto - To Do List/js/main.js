const Main = {
    init: function () {
        this.cacheSelectors()
        this.bindEvents()
    }, // responsável por fazer o cache dos selectors, ou seja, controlar boa parte da aplicação

    cacheSelectors: function() {
        this.checkButtons = document.querySelectorAll('.check')
    }, //responsável por selecionar os elementos do html e armazenar em uma variável

    bindEvents: function() {
        const self = this

        this.checkButtons.forEach(function(button) {
            button.onclick = self.Events.checkButtons_click
                
            
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
            
            
        }
    },




    
} //Este Main vai controlar toda a aplicação, sendo um componente separado



Main.init()