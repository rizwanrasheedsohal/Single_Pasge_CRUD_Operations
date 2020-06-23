$(function () {
  load_recipies();
  $("#recipies").on("click", ".btn-danger", handleDelete);
  $("#recipies").on("click", ".btn-warning", handleUpdate);
  $("#add").click(add_recipie);
});

function handleUpdate() {
  var id = $(this).parent().parent().attr("dummy_id");
  $.get("https://usman-recipes.herokuapp.com/api/recipes/" + id, function (response) {
    $("#updatetitle").val(response.title);
    $("#updatebody").val(response.body);
    $("#model").modal("show");
  });

  $("#modalupdate").click(function () {
    // var id = $(this).parent().parent().attr("dummy_id");
    var title = $("#updatetitle").val();
    var body = $("#updatebody").val();
    console.log(id);
    $.ajax({
      url: "https://usman-recipes.herokuapp.com/api/recipes/" + id,
      data: {
        title,
        body
      },
      method: "PUT",
      success: function () {
        $("#model").modal("hide");
        load_recipies();
      },
      error: function (err) {
        console.log("Error occured")
      }
    })
  });

}

function add_recipie() {
  var title = $("#title").val();
  var body = $("#body").val();
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/recipes",
    method: "POST",
    data: {
      title,
      body
    },
    success: function () {
      $("#addmodal").modal("hide");
      load_recipies();
    },
  });

}

function handleDelete() {
  let id = $(this).parent().parent().attr("dummy_id");
  console.log(id);
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/recipes/" + id,
    method: "DELETE",
    success: function () {
      load_recipies();
    },
  });
}

function load_recipies() {
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/recipes",
    method: "GET",
    success: function (response) {
      var recipies = $("#recipies");
      recipies.empty();

      for (var i = 0; i < response.length; i++) {
        recipies.append(
          `<div class = "recipie" dummy_id = ${response[i]._id}> <h3> ${response[i].title} </h3> <p><button class="btn btn-danger float-right">Delete</button> <button class="btn btn-warning float-right">Edit</button> ${response[i].body} </p> </div>`
        );
      }
    },
    error: function () {
      $("#recipies").html("Error has occured");
    },
  });
}