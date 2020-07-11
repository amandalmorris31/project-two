
$(function(){

   
    $("#post-project").on("click", function (event){
        event.preventDefault();
       

        let title = $("#project-title").val().trim();
        let details = $("#project-details").val().trim();
        let link = $("#project-link").val().trim();
        let username = $("#github-username").val().trim();
        let currentTime;
        

        const queryUrl = "https://api.github.com/users/" + username;
        $.ajax({
            url:queryUrl,
            method: "GET"
        }).then(function(response){

            console.log(response);
            let image = response.avatar_url
            
            
            let project = {
    
                projectTitle: title, 
                projectDetails: details,
                projectLink: link, 
                ghUsername: username,
                createdAt: currentTime,
                image: image,
                ghLink: link, 

            };
            console.log(project);
        })
          

    })

});