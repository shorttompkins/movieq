$(function(){
    console.log('Ready!');

    $('#title').autocomplete({
        source: function(req, response){
            $.get('http://api.themoviedb.org/3/search/movie?query=' + req.term + '&api_key=1a6f86ad423cc5544304a6fe19960bd3', function(data){
                response($.map(data.results, function (item) {
                    return {
                        label: item.title,
                        value: item.id
                    };
                }));
            });
        },
        minLength: 3,
        select: function(e, ui) {
            $('#title').val(ui.item.label);
            $('input[name=movieid]').val(ui.item.value);
            return false;
        }
    });

    $('a.watched').on('click', function(e){
        e.preventDefault();
        var movie = $(this).parents('.movie');
        $.post('/movie/' + $(this).data('id') + '/watched', function(data){
            movie.fadeOut();
        });
    });

});
