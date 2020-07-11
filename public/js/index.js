$(function () {

  function submitProject(project) {
    $.post("/api/projects", project, function() {
      window.location.href = "/";
    });
  }

  function submit(event){

    event.preventDefault();

    let title = $("#project-title").val().trim();
    let details = $("#project-details").val().trim();
    let link = $("#project-link").val().trim();
    let username = $("#github-username").val().trim();
    let currentTime;

    let project = {
      projectTitle: title,
      projectDetails: details,
      projectLink: link,
      ghUsername: username,
      createdAt: currentTime,
      //image: image,
      ghLink: link,
      UserId:1
    };
    console.log(project);

    submitProject(project)

  }



  
  $("#post-project").on("click", function (event) {
    event.preventDefault();
    
    submit(event);

    

  });
});
