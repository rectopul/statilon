const login =(() => {
    //private var/functions
    async function submit(target){
        const form = document.querySelector(target);

        if(!form) return

        

        form.addEventListener('submit', async function (e) {
            e.preventDefault()

            try {
                const { user, password } = form.elements


                const options = {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify({user: user.value, password: password.value})
                }

                console.log(`formulario submetido`)

                const response = await (await (fetch(`/session`, options))).json()

                window.location.href = `/admin/dashboard`
            } catch (error) {
                console.log(error)
            }

            
        });
    }
    
    return {
        //public var/functions
        submit
    }
})()

//login.submit(`.formLogin`)