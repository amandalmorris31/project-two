$(function () {
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
      UserId: 2,
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
});
