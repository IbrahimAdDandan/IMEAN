var mongoose = require('mongoose');
var Pages = mongoose.model('Pages');

// get pages
module.exports.getPages = function (req, res) {
    Pages
        .find()
        .select("-childs")
        .exec(function (err, pages) {
            if (err) {
                console.log("Error: " + err);
                res
                    .status(400)
                    .json(err);
            } else {
                console.log("num of fuond pages: " + pages.length);
                res
                    .status(200)
                    .json(pages);
            }
        });
};

// get one page
module.exports.getOne = function (req, res) {
    var pageId = req.params.pageId;
    Pages
        .findById(pageId)
        .exec(function (err, page) {
            if (err) {
                console.log('Error: ' + err);
                res
                    .status(400)
                    .json(err);
            } else {
                console.log('page found');
                res
                    .status(200)
                    .json(page);
            }
        });
};

//get all sub-pages of a specific page
module.exports.getSubpages = function (req, res) {
    var pageId = req.params.pageId;
    Pages
        .findById(pageId)
        .select('childs')
        .exec(function (err, page) {
            if (err) {
                console.log('Error: ' + err);
                res
                    .status(400)
                    .json(err);
            } else {
                console.log('page found');
                res
                    .status(200)
                    .json(page.childs);
            }
        });
};

//get sub-page
module.exports.getOneSubpage = function (req, res) {
    var pageId = req.params.pageId;
    var spId = req.params.spId;
    Pages
        .findById(pageId)
        .select('childs')
        .exec(function (err, page) {
            var subpage = page.childs.id(spId);
            res
                .status(200)
                .json(subpage);
        });
};

// add page
module.exports.addPage = function (req, res) {
    Pages
        .create({
            title: req.body.title,
            description: req.body.description,
            order: req.body.order,
            body: req.body.body || ' '
        }, function (err, page) {
            if (err) {
                console.log('Error: ' + err);
                res
                    .status(400)
                    .json(err);
            } else {
                console.log('page created: ' + page);
                res
                    .status(201)
                    .json(page);
            }
        });
};

// add sub-page as a child to a page
module.exports.addChild = function (req, res) {
    var pageId = req.params.pageId;
    Pages
        .findById(pageId)
        .exec(function (err, page) {
            if (err) {
                console.log('Error: ' + err);
                res
                    .status(400)
                    .json(err);
            } else if(!page) {
                console.log('page not found!');
                res
                    .status(404)
                    .json({"meassage": "page not found!"});
            } else {
                console.log('page found');
                page.childs.push({
                    title: req.body.title,
                    description: req.body.description,
                    order: req.body.order,
                    body: req.body.body || ' '
                });
                page.save(function(err, pageUpdated){
                    if(err) {
                        res
                            .status(500)
                            .json(err);
                    } else {
                        res
                            .status(201)
                            .json(pageUpdated.childs[pageUpdated.childs.length - 1]);
                    }
                });
            }
        });
};

// delete page
module.exports.deletePage = function (req, res) {
    var pageId = req.params.pageId;
    Pages
        .findOneAndRemove({_id: pageId}, function(err, deletedPage){
            if(err) {
                res
                    .status(404)
                    .json(err);
            } else {
                console.log("page deleted");
                res
                    .status(204)
                    .json();
            }
        });
};

// update page
module.exports.updatePage = function (req, res) {
    var pageId = req.params.pageId;
    Pages
        .findOneAndUpdate({_id: pageId}, {
            title: req.body.title,
            description: req.body.description,
            order: req.body.order,
            body: req.body.body || ' '
        }, function(err, doc){
            if(err) {
                res
                    .status(500)
                    .json(err);
            } else if (!doc) {
                res
                    .status(404)
                    .json({"message": "page not found"});
            } else {
                console.log("page found and will be updated");
                //console.log("doc: " + doc);
                res
                    .status(204)
                    .json();
            }
        });
};

// update subpage
module.exports.updateSubPage = function(req, res) {
    var pageId = req.params.pageId;
    var spId = req.params.spId;
    Pages
    .findById(pageId)
    .exec(function (err, page) {
        if (err) {
            console.log('Error: ' + err);
            res
                .status(400)
                .json(err);
        } else if(!page) {
            console.log('page not found!');
            res
                .status(404)
                .json({"meassage": "page not found!"});
        } else {
            console.log('page found');
            thisSubpage = page.childs.id(spId);
            thisSubpage.title = req.body.title;
            thisSubpage.description = req.body.description;
            thisSubpage.order = req.body.order;
            thisSubpage.body = req.body.body || ' ';
            page.save(function(err, pageUpdated){
                if(err) {
                    res
                        .status(500)
                        .json(err);
                } else {
                    res
                        .status(204)
                        .json();
                }
            });
        }
    });
};

// delete sub-page
module.exports.deleteSubPage = function(req, res) {
    var pageId = req.params.pageId;
    var spId = req.params.spId;
    Pages
    .findById(pageId)
    .exec(function (err, page) {
        if (err) {
            console.log('Error: ' + err);
            res
                .status(400)
                .json(err);
        } else if(!page) {
            console.log('page not found!');
            res
                .status(404)
                .json({"meassage": "page not found!"});
        } else {
            console.log('page found');
            page.childs.id(spId).remove();
            page.save(function(err, pageUpdated){
                if(err) {
                    res
                        .status(500)
                        .json(err);
                } else {
                    res
                        .status(204)
                        .json();
                }
            });
        }
    });
};