$(()=>{
    

    $('#btn').click(()=>{
        let unicodem=unicode();
        $.post('/requests/getclientfromuserid',{
            username:$('#email').text()
        },(object)=>{
            console.log(object.id +" got id ")
            $.post('/requests/addcode',{
                code:unicodem,
                c_id:object.id,
                causername:$('#list').val()
            
            },(object)=>{
                
                
                    console.log("post to write mail")
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


 


