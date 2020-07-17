$(function () {
  // retrieves user id from localstorage to be used for posting projects
  let user = localStorage.getItem("codeConnectId");

  // after project submit button is clicked
  function submit(event) {
    event.preventDefault();

    // grabs info from form input fields
    let title = $("#project-title").val().trim();
    let details = $("#project-details").val().trim();
    let link = $("#project-link").val().trim();
    // need to format time using moments
    let currentTime;

    // store in project object to be passed in handlebars and db
    let project = {
      projectTitle: title,
      projectDetails: details,
      projectLink: link,
      createdAt: currentTime,
      UserId: user,
    };
    // redirect to page with id in it in the url
    submitProject(project);
  }

  // post request for project
  function submitProject(project) {
    $.post("/api/projects", project, function () {
      window.location.href = "/" + user;
    });
  }

  // delete request for project
  function deletePost(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/projects/" + id,
    }).then(function () {
      window.location.href = "/" + user;
    });
  }

  // when edit is submitted
  function submitEdit() {
    $(document).on("click", ".submit-btn", function (event) {
      event.preventDefault();
      // grab id of project
      var id = $(this).parent().parent().parent().parent().data("id");
      // add the entered input to the description
      var newDescription = $(".input").val().trim();
      // create obj for new description
      var project = {
        projectDetails: newDescription,
      };
      // send put request to update project details in db
      $.ajax({
        method: "PUT",
        url: "/api/projects/" + id,
        data: project,
      }).then(function () {
        window.location.href = "/" + user;
      });
    });
  }

  // EVENT LISTENERS

  // submitting project
  $("#post-project").on("click", function (event) {
    event.preventDefault();
    submit(event);
  });

  // when delete button is clicked, grab id of project and delete
  $(".delete-btn").on("click", function (event) {
    event.preventDefault();
    var currentPost = $(this).parent().parent().parent().parent().data("id");
    deletePost(currentPost);
  });

  // when edit button is clicked
  $(".edit-btn").on("click", function (event) {
    // empty the description field
    $(this).parent().parent().children().find(".description").empty();
    // remove the interested button to be replaced
    $(this).parent().parent().find(".interested-btn").remove();
    // create input field
    var input = $("<input>").attr("type", "text").addClass("input");
    // replace project description with input field
    var inputLocation = $(this)
      .parent()
      .parent()
      .find(".project-details")
      .append(input);
    // create submit edit button
    var button = $("<button>")
      .addClass("btn btn-success submit-btn float-right")
      .text("Submit Edit");
    // replace button where interested button was
    var buttonLocation = $(this)
      .parent()
      .parent()
      .find(".project-details")
      .append(button);
    // submit the edit
    submitEdit();
  });

  // when interested button is clicked
  $(".interested-btn").on("click", function (event) {
    event.preventDefault();
    //grabs project id and user id
    var interestedObj = {
      projectId: $(this).parent().parent().parent().parent().data("id"),
      userId: user,
    };
    //2.2 create a get route to get interests (inside api routes)
    //done
    //2.3 create post route for interests model
    //3. store into db
    $.post("/api/interests", interestedObj, function () {
      // window.location.href = "/";
      //do something to tell user data is added ****IMPLEMENT a MODAL and not ALERT*****,
    });
  });
});
