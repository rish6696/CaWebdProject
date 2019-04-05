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
                $('#body').append(
                    $('<tr>').append(
                        $('<th>').attr('scope','row').text(object.id)
                    ).append(
                        $('<td>').text(`${object.client.firstname} ${object.client.lastname}`)
                    ).append(
                        $('<td>').text(`${object.client.phone}`)
                    ).append(
                        $('<td>').text(`${object.filename}`)
                    )
                )
            })
        })
        

    })
})