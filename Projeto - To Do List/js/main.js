const Main = {

    tasks: [],

    init: function () {
        this.cacheSelectors()
        this.bindEvents()
        this.getStoraged()
        this.buildTasks()
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
            button.onclick = self.Events.checkButtons_click.bind(self)
                
            
        })

        this.$inputTask.onkeypress = self.Events.inputTask_keypress.bind(this)

        this.$removeButtons.forEach(function(button) {
            button.onclick = self.Events.removeButton_click.bind(self)
        })


    }, //responsável por adicionar eventos na aplicação web

    getStoraged: function() {
        const tasks = localStorage.getItem('tasks')
        if(tasks) {
            this.tasks = JSON.parse(tasks) // tasks = array // tasks = variavel// scopes diferentes
        } else {
            localStorage.setItem('tasks', JSON.stringify([]))
        }

    }, //responsável pelo get do item Task e armazená-lo em um array vazio

    getTaskHtml: function(task, isDone) {
        return `
            <li class="${isDone ? 'done' : ''}" data-task="${task}"> 
                <div class="check"></div>
                <label class="task">
                    ${task}
                </label>
                <button class="remove" data-task="${task}"></button>
            </li>
        `

    },


    buildTasks: function() {
        let html = ''

        this.tasks.forEach(item => {
            html += this.getTaskHtml(item.task)
        })

        this.$list.innerHTML = html

        this.cacheSelectors()
        this.bindEvents()
    }, // montar as tasks e jogar elas no Local Storage



    Events: {
        checkButtons_click: function(e) {
            const li = e.target.parentElement
            const value = li.dataset['task']
            const isDone = li.classList.contains('done') // verifica se existe a class .done ou não e retornando um valor boleano

            const newTasksState = this.tasks.map(item => {
                if(item.task === value) {
                    item.done = !isDone
                }
                return item
            })

            localStorage.setItem('tasks', JSON.stringify(newTasksState))



            if (!isDone) {
                return li.classList.add('done') //boa prática: verificar primeiro a negação da variável, no caso estamos retornando adição da class .done e parando a execução do código no caso se for verdadeira (return), economizando custos de armazenamento, eliminando o uso do "else"
            } 

            li.classList.remove('done')
            
            
        },

        inputTask_keypress: function(e){ // Dentro de uma função de um evento, o 'this' sempre vai ser o próprio elemento que adicionou no evento. Atenção aos comportamentos do 'this'


            const key = e.key
            const value = e.target.value
            const isDone = false

            if(key === 'Enter') {
                this.$list.innerHTML += this.getTaskHtml(value)

                e.target.value = ''

                this.cacheSelectors()
                this.bindEvents()

                const savedTasks = localStorage.getItem('tasks')
                const savedTasksObjt = JSON.parse(savedTasks)

                
                const obj = [
                    {task: value, done: isDone},
                    ...savedTasksObjt, // spread operator: ele adicionar todos os itens dentro do mesmo array
                ]
                
                this.tasks = obj
                localStorage.setItem('tasks', JSON.stringify(obj))
            }
        },

        removeButton_click: function(e) {
            const li = e.target.parentElement
            const value = e.target.dataset['task']


            const newTasksState = this.tasks.filter(item => item.task !== value)

            localStorage.setItem('tasks', JSON.stringify(newTasksState))
            this.tasks = newTasksState


            li.classList.add('removed')


            setTimeout(function() {
                li.classList.add('hidden')
            },300)
        }



    
    },

    
} //Este Main vai controlar toda a aplicação, sendo um componente separado



Main.init()