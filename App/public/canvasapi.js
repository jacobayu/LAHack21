//console.log("bye");
$(document).ready(function(){
    console.log('here');
    $.ajax({
        url: 'https://canvas.ucsd.edu/api/v1/courses',
        contentType: 'application/json',
        headers: {"Authorization": "Bearer 13171~5bhrFe6Ln00IQZNqY8fGCUvkbO6yIwO6FRhADMxjHLFSEb8mw8IRt9PEg2s2QAHf"},
        dataType: 'jsonp',
    })
    .done(alert);
});