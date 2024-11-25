function shareMsg() {

    const canvas = document.getElementById('img_AI_with_Txt')
    const img    = canvas.toDataURL('image/png')

    liff
    .shareTargetPicker(
        [
        {
            type: "image",
            "originalContentUrl": "https://example.com/original.jpg",
            "previewImageUrl": "https://example.com/preview.jpg"
        },
        ],
        {
        isMultiple: true,
        }
    )
    .then(function (res) {
        if (res) {
        // succeeded in sending a message through TargetPicker
        console.log(`[${res.status}] Message sent!`);
        } else {
        // sending message canceled
        console.log("TargetPicker was closed!");
        }
    })
    .catch(function (error) {
        // something went wrong before sending a message
        console.log("something wrong happen");
    });
}

$(document).ready(function(){
    $("p").click(function(){
        $(this).hide();
    });
});