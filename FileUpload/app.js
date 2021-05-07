const $ = (id)=>{
    return document.getElementById(id)
}

/**
 * Adding eventlistener to show choosed file name only(excluding file path)
 */
let xhr, loaded_per, startTime, f_type, f_name;
const input_file = $("files")
input_file.addEventListener("change", (event)=>{
    $("filename").textContent = event.target.files[0].name
})

/**
 * File Upload mechanism
 */
const toggle = ()=>{
    const btn = $("btn")
    if(btn.classList.contains("upload_btn")){
        btn.textContent = "Cancle";
        btn.classList.remove("upload_btn")
        btn.classList.add("cancles")
    }else{
        btn.textContent = "Upload";
        btn.classList.add("upload_btn")
        btn.classList.remove("cancles")
    }
}

const upload_form = $("form")
upload_form.addEventListener("submit", (e)=>{
    e.preventDefault()
    startTime = new Date().getTime()
    if(btn.classList.contains("upload_btn")){
        upload_handler()
        toggle()
    }else{
        cancle_request()
        toggle()
    }
})

/**
 * Upload handling functions
 */
const bar = $("progress_fill")
const info = $("info")
const upload_handler = ()=>{
    const formdata = new FormData()
    const file = input_file.files[0]
    if(file.type.includes("image")){
        f_type = 'img'
    }else if(file.type.includes("video")){
        f_type = "video";
    }else{
        f_type = "random";
    }
    f_name = file.name
    formdata.append("files", file)
    xhr = new XMLHttpRequest()
    xhr.open("POST", "./upload_handle.php")
    xhr.upload.addEventListener("progress", progress_handle, false)
    xhr.addEventListener("load", onload_handler, false)
    xhr.addEventListener("error", error_handler, false)
    xhr.addEventListener("abort", cancle_handle, false)
    xhr.send(formdata)
}

const progress_handle = (event)=>{
    const duration = (new Date().getTime() - startTime) / 1000
    const bps = event.loaded / duration
    const remaining_time = Math.floor((event.total - event.loaded)/bps)
    const kb = Math.round(event.loaded / 1024)
    const total = (event.loaded / event.total) * 100
    loaded_per = total
    bar.style.width = total+"%"
    bar.style.background = "orangered"
    info.textContent = `${Math.round(total)}% (${kb} KB/${Math.round(event.total / 1024)} KB)(${remaining_time} Sec)`;
}

const onload_handler = (event)=>{
    upload_form.reset()
    $("filename").textContent = "Filename will be here"
    bar.style.width = "0%"
    info.textContent = "Completed"
    toggle()
    display()
}

const error_handler = (event)=>{
    info.textContent = "Not Quite"
}

const cancle_handle = (event)=>{
    info.textContent = `Cancled at ${Math.round(loaded_per)}%`
}
const cancle_request = ()=>{
    xhr.abort()
}

const display = ()=>{
    const img_box = $("imagebox")
    img_box.innerHTML = "";
    if(f_type == 'img'){
        $("form").classList.remove("active")
        const img_tag = document.createElement("img")
        img_tag.src = `./uploads/${f_name}`
        img_box.appendChild(img_tag)
        img_box.classList.add("active")
    }else if(f_type == 'video'){
        $("form").classList.remove("active")
        const video_tag = document.createElement("video")
        video_tag.src = `./uploads/${f_name}`
        video_tag.controls = true
        img_box.appendChild(video_tag)
        img_box.classList.add("active")
    }
}

$("imagebox").addEventListener("dblclick", (w)=>{
    $("imagebox").classList.remove("active")
    $("form").classList.add("active")
})