let filename;
$(()=>{
    let caid;
    $.post('/requests/getcafromuserid',{
        username:$('#email').text()
    },(object)=>{
        caid=object.id;
        $.post('requests/getuploadsforca',{
            caid
        },(data)=>{
            data.forEach((object)=>{
                filename=object.filename;
                $('#body').append(
                    $('<tr>').append(
                        $('<th>').attr('scope','row').text(object.id)
                    ).append(
                        $('<td>').text(`${object.client.firstname} ${object.client.lastname}`)
                    ).append(
                        $('<td>').text(`${object.client.phone}`)
                    ).append(
                        $('<td>').text(`${object.filename}`)
                    ).append(
                        $('<td>').append(
                            $('<button>').text('Get file').attr('class','downbuttons').attr('value',object.filename)
                            )
                    )
                )
            })
        })
        

    })
    
    
   
})
$(document).on('click','.downbuttons',function(){
    window.location=`https://yourdocman.herokuapp.com/requests/getfile?filename=${filename}`
});


