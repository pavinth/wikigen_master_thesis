var ArticleIndex = {
    renderArticles: function () {
        $.getJSON("http://0.0.0.0:8000/api/v1/stats/article/", function (data) {
            localStorage.removeItem("allStoredArticles");
            localStorage.setItem("allStoredArticles", JSON.stringify(data));
            ArticleIndex.renderArticlesList(data.results);
        });
    },

    triggerArticleLinkClick: function () {
        $('.article-menu-link').click(function () {
            ArticleIndex.renderArticlesList(JSON.parse(localStorage.getItem("allStoredArticles")).results);
        });
    },

    renderArticlesList: function (results) {
        $('#content-holder').html(
            Table.render(
                ArticleIndex.createArticleTableData(results),
                '<ol class="breadcrumb"><li class="breadcrumb-item active"> Articles</li></ol>',
                "article-dashboard"
            )
        );

        $('.view-anchors').click(function () {
            ArticleIndex.createAnchorDetailTable($(this).attr('data'));
        });

        $('.view-categories').click(function () {
            ArticleCategory.createCategoryDetailTable($(this).attr('data'));
        });
    },

    createAnchorDetailTable: function (articleTitle) {
        var contentHolderSelector =  $('#content-holder');
        var allAnchors = JSON.parse(localStorage.getItem('allStoredArticles'));
        var filteredArticle = allAnchors.results.filter(article => article.title === articleTitle);

        contentHolderSelector.html(
            Table.render(
                ArticleIndex.createAnchorsTableData(filteredArticle[0].anchors),
                '<ol class="breadcrumb"><li class="breadcrumb-item"><a href="#" class="article-menu-link"> Articles </a></li><li class="breadcrumb-item active" >' + articleTitle + '</li></ol>',
                "article-anchors-table"
            )
        );

        contentHolderSelector.append(ConfirmBox.createMarkup());
        ConfirmBox.handleModel();

        ArticleIndex.triggerArticleLinkClick();
    },

    createAnchorsTableData(anchors) {
        return {
            "headers": [
                "Anchor",
                "Category",
                "Days Survived",
                "Revision Survived",
                "Re-Introductions",
                "Anchor Strength",
                "Action"
            ],
            "data": anchors.map(anchor => {
                console.log(anchor);
                return {
                    dataColumns: [
                        anchor.anchor,
                        anchor.category,
                        anchor.days_survived,
                        anchor.revision_survived,
                        anchor.re_introductions,
                        anchor.strength
                    ],
                    actionColumn: [
                        {
                            data: anchor.article + '/anchor/' + anchor.id,
                            class: 'delete-anchor',
                            identifier: anchor.anchor,
                            content: '<i class="fas fa-trash"></i>',
                            title: 'Delete Anchor'
                        }
                    ]
                }
            })
        };
    },

    createArticleTableData: function (results) {
        return {
            "headers": ["Name", "Anchors", "Categories", "Action"],
            "data": results.map(article => {
                return {
                    dataColumns: [article.title, article.total_anchor_count, article.category_count],
                    actionColumn:
                        [
                            {
                                data: article.title,
                                class: 'view-anchors',
                                identifier: article.id,
                                content: '<i class="fas fa-anchor">&nbsp;&nbsp;</i>',
                                title: 'View Anchors'
                            },
                            {
                                data: article.title,
                                class: 'view-categories',
                                identifier: article.id,
                                content: '<i class="fas fa-tags">&nbsp;&nbsp;</i>',
                                title: 'View Categories'
                            }
                        ]
                }
            })
        };
    }
};