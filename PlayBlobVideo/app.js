const $ = (id)=>{
    return document.getElementById(id)
}
let xhr;
let starttime;

/**
 * download handling functions
 */
const filename = "../PlayBlobVideo/downloads/ACDC - Highway to Hell (Official Video).mp4";
const upload_handler = ()=>{
    console.log("Y");
    xhr = new XMLHttpRequest()
    xhr.responseType = 'blob'
    xhr.open("GET", filename, true)
    xhr.send()
    xhr.addEventListener("readystatechange", ()=>{
        if(xhr.readyState == 4 && xhr.status == 200){
            const obj = window.URL.createObjectURL(xhr.response)
            $("vi").src = obj
            setTimeout(()=>{
                window.URL.revokeObjectURL(obj)
            }, 60*1000)
        }
    })

    xhr.addEventListener("progress", progress_handle, false)
}

const progress_handle = (event)=>{
    const duration = (new Date().getTime() - starttime) / 1000
    const bps = event.loaded / duration
    const remaining_time = Math.floor((event.total - event.loaded)/bps)
    const total = (event.loaded / event.total) * 100
    const kb = Math.round(event.loaded / 1024)
    // const obj = window.URL.createObjectURL()
    $("vi").src = event.target.response
    console.log(event);
}

$("vi").addEventListener("play", upload_handler)