
let cid;
$(()=>{
    $.post('/requests/getclientfromuserid',{
        username:$('#email').text()
    },(object)=>{
        cid=object.id
        $('#form').append(
            $('<input>').attr('type','text').attr('value',cid).attr('name','clientid').attr('style','display: none').attr('id','cid')
            
        ).append(
            $('<input>').attr('type','text').attr('value','0').attr('name','caid').attr('style','display: none').attr('id','caid')
        )
        $.post('requests/getconnectedca',{
            clientid:cid
        },(data)=>{
            data.forEach((object)=>{
                $('#alist').append(
                  $('<option>').attr('value',object.caId).text(`${object.ca.firstname} ${object.ca.lastname}`)  
                )
            })


        })

    })
    
    $('#alist').change(()=>{
       
        $('#caid').val($('#alist').val());
        
    })
    
    

    $('#btn').click(()=>{
        let unicodem=unicode();
        $.post('/requests/addcode',{
            code:unicodem,
            c_id:cid,
            causername:$('#list').val()
        
        },(object)=>{
                $.post('/requests/sendmail',{
                    email:"mohankapoor621@gmail.com",
                    text:`The user with following details want to become your client
                    Name:${$('#fullname').text()}
                    Email:${$('#email').text()}
                    phone:${$('#phone').text()}
                    To add this user to your account click http://localhost:4578/requests/addclient?unicode=${unicodem}`
                },(data)=>{
                    
                })
        })
       
       
    })
    $.get('/requests/getca',
    (data)=>{
        data.forEach((object)=>{
           $('#list').append(
               $('<option>').attr('value',object.username).text(`${object.firstname} ${object.lastname}`)
           )
        })
    })

    

    
})

function unicode() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }


 


