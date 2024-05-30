$(".second-cards .card-div").click(function (e) {
    const get_recipe_p = $(this).find("p");
    const get_recipe_name = $(get_recipe_p).text();
    const result = get_recipe_name.replace(/^\s+|\s+$/gm,'');
    window.location.assign(`/one-recipe/${result}`)
});