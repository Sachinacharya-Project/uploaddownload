const $ = (id)=>{
    return document.getElementById(id)
}
let xhr;
let starttime;
/**
 * File download mechanism
 */
const toggle = ()=>{
    const btn = $("btn")
    if(btn.classList.contains("download_btn")){
        btn.textContent = "Cancle";
        btn.classList.remove("download_btn")
        btn.classList.add("cancles")
    }else{
        btn.textContent = "Download";
        btn.classList.add("download_btn")
        btn.classList.remove("cancles")
    }
}

const upload_form = $("form")
upload_form.addEventListener("submit", (e)=>{
    e.preventDefault()
    const btn = $("btn")
    starttime = new Date().getTime()
    if(btn.classList.contains("download_btn")){
        upload_handler()
        toggle()
    }else{
        cancle_download()
        toggle()
    }
})

/**
 * download handling functions
 */
const filename = "./1115643.jpg";
const bar = $("progress_fill")
const info = $("info")
const upload_handler = ()=>{
    xhr = new XMLHttpRequest()
    xhr.responseType = 'blob'
    xhr.open("GET", filename, true)
    xhr.send()
    xhr.addEventListener("readystatechange", ()=>{
        if(xhr.readyState == 4 && xhr.status == 200){
            const obj = window.URL.createObjectURL(xhr.response)
            const anchor = $("downloader")
            anchor.href = obj
            anchor.download = filename

            setTimeout(()=>{
                window.URL.revokeObjectURL(obj)
            }, 60*1000)
        }
    })

    xhr.addEventListener("progress", progress_handle, false)
    xhr.addEventListener("load", onload_handler, false)
    xhr.addEventListener("error", error_handler, false)
    xhr.addEventListener("abort", cancle_handle, false)
}

let remtime

const progress_handle = (event)=>{
    const duration = (new Date().getTime() - starttime) / 1000
    const bps = event.loaded / duration
    const remaining_time = Math.floor((event.total - event.loaded)/bps)
    const total = (event.loaded / event.total) * 100
    const kb = Math.round(event.loaded / 1024)
    bar.style.width = total+"%"
    bar.style.background = "orangered"
    remtime = total
    info.textContent = `${Math.round(total)}% (${kb} KB / ${Math.round(event.total / 1024)} KB)(${remaining_time} Sec)(${Math.round(bps / 1024)} KBPS)`;
}

const onload_handler = (event)=>{
    bar.style.width = "100%"
    info.textContent = "Completed"
    $("downloader").click()
    toggle()
}

const error_handler = (event)=>{
    info.textContent = "Error Occured"
    toggle()
}

const cancle_handle = (event)=>{
    const total = Math.round((event.loaded / event.total) * 100)
    info.textContent = `Cancled at ${Math.round(remtime)}%`
}

const cancle_download = ()=>{
    xhr.abort();
}