
$(document).ready(function(){
    console.log('here');
    $.ajax({
        url: 'https://canvas.ucsd.edu/api/v1/courses',
        contentType: 'application/json; charset=utf-8',
        headers: {"Authorization": "Bearer 13171~5bhrFe6Ln00IQZNqY8fGCUvkbO6yIwO6FRhADMxjHLFSEb8mw8IRt9PEg2s2QAHf"},
        dataType: 'jsonp',
        success: function(result){
            console.log(JSON.stringify(result));
        },
        error: function(err){
            console.error(err);
        }
    });
});