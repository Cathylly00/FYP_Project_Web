/* ---------- call_Gemini ---------- */

function call_Gemini()
{

    document.getElementById("input_area").style.display = "none";
    document.getElementById("AI_img_area").style.display = "block";
    document.getElementById("AI_img_box").style.display = "block";

    var  prompt = document.getElementById("input_prompt").value;

    const key = "AIzaSyBxR8Aq1Q_fk5K1xCSxJSRR4zKz_PGDQyg"
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${key}`

    let headers = {
        "Content-Type": "application/json",
    }


    let body = {
        "contents": [
            {
                "parts": [
                    {
                        "text": `直接用一句英文句子描述一幅主題為'${prompt}',含意正向的,背景的插畫構圖, 不含對白`
                    }
                ]
            }
        ]
    }

    fetch(url, {
        method: "POST",
        headers: headers,
        
        body: JSON.stringify(body)
    })
                //成功結果處理
        .then(response => response.json())
        .then((json) => {
            console.log(json.candidates[0].content.parts[0].text)
            call_SdWebUi(json.candidates[0].content.parts[0].text);
        })

        .catch((error) => {
            //錯誤結果處理
            console.log(`Error: ${error}`);
        })
}

/* ---------- call_SdWebUi ---------- */

function call_SdWebUi(img_prompt) {

    const url = `http://127.0.0.1:7860/sdapi/v1/txt2img`

    let headers = {
        "Content-Type": "application/json; charset=utf-8",
        "Accept": "application/json",
    }


    let body = {
        "prompt": img_prompt,
        "seed": 1,
        "steps": 20,
        "width": 512,
        "height": 512,
        "cfg_scale": 7,
        "sampler_name": "Karras",
        "negative_prompt": "clock"
    }

    fetch(url, {
        method: "POST",
        headers: headers,
        
        body: JSON.stringify(body)
    })
        //成功結果處理
        .then(response => response.json())
        .then(json => {
            console.log(json.images[0]);

            document.getElementById("AI_img_box").style.display = "none";
            document.getElementById("img_AI_with_Txt").style.display = "block";

            var img_src = `data:image/jpg;base64,${json.images[0]}`;

            document.getElementById("img_AI").src = `data:image/jpg;base64,${json.images[0]}`;

            drawTxt(img_src);
            
        })

        .catch((error) => {
            //錯誤結果處理
            console.log(`Error: ${error}`);
        })

}

function drawTxt(img_src) {

    console.log("Draw Text");

    const text = document.getElementById("input_prompt").value;
    const canvas = document.getElementById("img_AI_with_Txt");

    const ctx = canvas.getContext('2d');
    let img = document.getElementById("img_AI");

    img.addEventListener("load", ()=>{

        ctx.drawImage(img,0,0, 300, 300);
        ctx.font = "bold 25pt Times New Roman";

        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 8;
        ctx.strokeText(text,125,250);

        ctx.fillStyle = "#ff0000";
        ctx.fillText(text, 125, 250);

    });

    console.log("END");
}