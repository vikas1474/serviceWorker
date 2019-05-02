if('serviceWorker' in navigator){
    navigator.serviceWorker
    .register('./sw.js',{scope:'./'})
    .then((registeration)=>{
        console.log(registeration + 'successfull')
    })
    .catch((err)=>{
        console.log(err + 'not successfull');
    })
}


fetch('https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500').then((data)=>{
    document.querySelector('img').setAttribute('src',data.url);
})