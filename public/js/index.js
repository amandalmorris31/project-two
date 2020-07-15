$(function () {
  console.log("landingpage")
  function submitProject(project) {
    $.post("/api/projects", project, function () {
      window.location.href = "/";
    });
  }

  function submit(event) {
    event.preventDefault();

    let title = $("#project-title").val().trim();
    let details = $("#project-details").val().trim();
    let link = $("#project-link").val().trim();
    let currentTime;

    let project = {
      projectTitle: title,
      projectDetails: details,
      projectLink: link,
      createdAt: currentTime,
      UserId: 1,
    };
    console.log(project);

    submitProject(project);
  }

  function deletePost(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/projects/" + id,
    }).then(function () {
      window.location.href = "/";
    });
  }

  $("#post-project").on("click", function (event) {
    event.preventDefault();
    submit(event);
  });

  $(".delete-btn").on("click", function (event) {
    event.preventDefault();
    var currentPost = $(this).parent().parent().parent().parent().data("id");
    console.log(currentPost);

    deletePost(currentPost);
  });

  //1.create the onclick btn
  $(".interested-btn").on("click", function (event) {
    event.preventDefault();
    //2.grab the value projectId and userId
    //projectId
   // console.log( $(this).parent().parent().parent().parent().data("id"))

    //****userId******
    var interestedObj={
      projectId:$(this).parent().parent().parent().parent().data("id"),
      //this is hardcoded.  WILL need to grab the userId
      userId:1
    }
    console.log(interestedObj);
     //2.2 create a get route to get interests (inside api routes)
  //done

  //2.3 create post route for interests model

    //3. store into db     
    $.post("/api/interests", interestedObj, function () {
     // window.location.href = "/";
     //do something to tell user data is added ****IMPLEMENT a MODAL and not ALERT*****, 


     alert("added");
    });
  });
  //2.1 create interestsModel
  //done

  $(".edit-btn").on("click", function(event){
      

     

      $(this).parent().parent().children().find(".description").empty();
      $(this).parent().parent().find(".interested-btn").remove();

      var input = $("<input>").attr("type", "text").addClass("input");
      var inputLocation = $(this).parent().parent().find(".project-details").append(input);
      

      var button = $("<button>").addClass("submit-btn").addClass("float-right").text("Submit Edit");
      button.css("background-color", "#1ac671","border-style", "none", "color", "white");
      var buttonLocation = $(this).parent().parent().find(".project-details").append(button);
      console.log(buttonLocation);
      submitEdit();

  
  });

  function submitEdit() {
    $(document).on("click", ".submit-btn", function (event) {
      event.preventDefault();
      var id = $(this).parent().parent().parent().parent().data("id");
      var newDescription = $(".input").val().trim();
      //console.log(newDescription);
      //console.log(id);
      var project = {
        projectDetails: newDescription,
      };
      $.ajax({
        method: "PUT",
        url: "/api/projects/" + id,
        data: project,
      }).then(function () {
        window.location.href = "/";
      }); //update(id);
    });
  }

});
