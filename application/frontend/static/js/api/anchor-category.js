$(document).on('click', "#category-submit", function (event) {

    var minNumber = 100;
    var maxNumber = 0;

    function randomNumberFromRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    var category = $(this).siblings('input').val();

    var p_id;
    var p_html;
    if (category != null) {
        var anchor_column = [
            'last_seen',
            'first_seen',
            'strength',
            're_introductions',
            'revision_survived',
            'days_survived',
            'anchor'
        ];
        var anchor_details = {};
        var randomNumber = randomNumberFromRange(minNumber, maxNumber);


        p_id = "added-cat" + randomNumber;
        p_html = '<p   style =\'position:relative;top:15px;\' id="' + p_id + '">' + category + '</p>';


        $(this).parent().html(p_html);
        $("#" + p_id).parent().parent().prevAll().each(function (key, obj) {
            if ("" !== obj.outerText) {
                anchor_details[anchor_column[key]] = obj.outerText;
            }
        });

        var dataToPost = {
            "anchors": [],
            "title": localStorage.getItem('selected_article')
        };
        dataToPost.anchors.push(anchor_details);

        anchor_details['title'] = localStorage.getItem('selected_article');
        anchor_details['category'] = category;

        anchor_details['total_anchor_count'] = parseInt(localStorage.getItem("anchor_count"));

        var ADD_CAT_URL = 'http://0.0.0.0:8000/api/v1/stats/article/';
        $.ajax({
            url: ADD_CAT_URL,
            headers: {"X-CSRFToken": getCookie('csrftoken')},
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(dataToPost),
            statusCode: {
                201: function () {

                    //alert('Anchor with Category Created Successfully');
                },
                400: function () {
                    //  alert('Error in creating anchor!');
                },
                404: function () {
                    //alert('Invalid URL! Is server running?');
                }
            }
        });
    }

});

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}
