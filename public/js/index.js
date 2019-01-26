// Get references to page elements
var $projectName = $("#project-name");
var $projectDescription = $("#project-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");



//calendar
var $calendarBtn = $("#calendarbtn");

// The API object contains methods for each kind of request we'll make
var API = {
  saveProject: function(project) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/projects",
      data: JSON.stringify(project)
    });
  },
  getProjects: function() {
    return $.ajax({
      url: "api/projects",
      type: "GET"
    });
  },
  deleteProject: function(id) {
    return $.ajax({
      url: "api/projects/" + id,
      type: "DELETE"
    });
  }
};

// redirect to list of tasks
// var toTasks = function() {
//   API.getTasks();
// }

// refreshProjects gets new examples from the db and repopulates the list
// var refreshProjects = function() {
//   API.getProjects().then(function(data) {
//     var $projects = data.map(function(project) {
//       var $a = $("<a>")
//         .text(project.text)
//         .attr("href", "/project/" + project.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": project.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $exampleList.empty();
//     $exampleList.append($projects);
//   });
// };

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var project = {
    text: $projectName.val().trim(),
    description: $projectDescription.val().trim()
  };

  if (!(project.text && project.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveProject(project).then(function() {
    submitPost();
  });

  $projectName.val("");
  $projectDescription.val("");
}

// Submits a new post and brings user to blog page upon completion
function submitPost() {
  $.ajax({
    url: "api/posts",
    type: "GET"
  }).then( function() {
    window.location.href = "/view";
  });
}

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteProject(idToDelete).then(function() {
    refreshProjects();
  });
};



// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);

// stages
var games = [];

/*
* display buttons
*/
function renderButtons(){
  $("#btns-view").empty();

  games.forEach( topic => {
      var a = $("<button>")
      
      a.addClass("game");
      a.attr("data-name", topic);
      a.text(topic);
      $("#btns-view").append(a);
  });
}

/*
*   add button
*/
$("#add-game").on("click", function(e){
  e.preventDefault();

  var game = $("#game-input").val().trim();

  games.push(game);

  renderButtons();

});
