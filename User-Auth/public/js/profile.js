let socket=io()
    console.log("socket id",socket)
$('#btnSendMsg').click(()=>{
    socket.emit('msg_send',{
        to:$('#inpToUser').val(),
        msg:$('#inpNewMsg').val()
    })
})

socket.on('msg_rcvd',(data)=>{
    $('#ulMsgs').append($('<li>').text(
        ` [${data.from}]:${data.msg}`
    ))
})