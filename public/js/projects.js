$(document).ready(function() {
  
    /* global moment */

    // Click events for the edit and delete buttons
    $(document).on("click", "button.edit", handlePostEdit);
    $(document).on("click", "button.delete", handlePostDelete);

    // projectContainer holds all of our posts
    var projectContainer = $(".view-container");
    var projects;

    // This function grabs projects from the database and updates the list view
    function getProjects(category) {
        var categoryString = category || "";
        if (categoryString) {
            categoryString = "/category/" + categoryString;
        }
        $.get("/api/projects" + categoryString, function(data) {
            console.log("Projects", data);
            projects = data;
            if (!projects || !projects.length) {
            displayEmpty();
            }
            else {
            initializeRows();
            }
        });
    }

      // This function does an API call to delete posts
    function deletePost(id) {
        $.ajax({
        method: "DELETE",
        url: "/api/posts/" + id
        })
        .then(function() {
            getProjects();
        });
    }

    // InitializeRows handles appending all of our constructed post HTML inside
    // projectContainer
    function initializeRows() {
        projectContainer.empty();
        var postsToAdd = [];
        for (var i = 0; i < projects.length; i++) {
            postsToAdd.push(createNewRow(projects[i]));
        }
        projectContainer.append(postsToAdd);
    }

    // This function constructs a post's HTML
    function createNewRow(project) {
        var newPostCard = $("<div>");
        newPostCard.addClass("project-container");
        var newPostCardHeading = $("<h3>")
        newPostCardHeading.addClass("project-title");
        newPostCardHeading.text(project.text);
        var ul = $("<ul>");
        ul.addClass("project-status");
        // li to-do;
        for(var i = 0; i < 6; i++){
            var li = $("<li>");
            li.text(i);
            ul.append(li);
        }
        var deleteBtn = $("<button>");
        deleteBtn.text("DELETE");
        deleteBtn.addClass("project-task delete");
        var deleteBtnI = $("<i>");
        deleteBtnI.addClass("fas fa-trash-alt");
        deleteBtn.append(deleteBtnI);

        var editBtn = $("<button>");
        editBtn.text("EDIT");
        editBtn.addClass("edit project-task");
        var editBtnI = $("<i>");
        editBtnI.addClass("fas fa-user-edit");
        editBtn.append(editBtnI);

        var printBtn = $("<button>");
        printBtn.text("PRINT");
        printBtn.addClass("project-task print");
        var printBtnI = $("<i>");
        printBtnI.addClass("fas fa-print");
        printBtn.append(printBtnI);
        
        newPostCard.append(newPostCardHeading);
        newPostCard.append(ul);
        newPostCard.append(printBtn);
        newPostCard.append(editBtn);
        newPostCard.append(deleteBtn);
        
        newPostCard.data("project", project);
        return newPostCard;
    }

    // This function displays a message when there are no posts
    function displayEmpty() {
        projectContainer.empty();
        var messageH2 = $("<h2>");
        messageH2.css({ "text-align": "center", "margin-top": "50px" });
        messageH2.html("New Project +");
        projectContainer.append(messageH2);
    }
    
    // Getting the initial list of posts
    getProjects();

    // This function figures out which post we want to edit and takes it to the
    // Appropriate url
    function handlePostEdit() {
        
        var currentPost = $(this)
            .parent()
            .data("project");
        window.location.href = "/edit?post_id=" + currentPost.id;
    }

      // This function figures out which post we want to delete and then calls
    // deletePost
    function handlePostDelete() {
        var currentPost = $(this)
        .parent()
        .data("project");
        deletePost(currentPost.id);
    }

});

