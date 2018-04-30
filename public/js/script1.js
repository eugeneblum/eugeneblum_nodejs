
        var schema = {
            stores: [
                {
                    name: 'skills',
                    keyPath: "timeStamp"
                }
            ]
        };


/**
 * Create and initialize the database. Depending on platform, this will
 * create IndexedDB or WebSql or even localStorage storage mechanism.
 * @type {ydn.db.Storage}
 */
        var db = new ydn.db.Storage('skills_2', schema);

        var deleteSkill = function(id) {
            db.remove('skills', id)
                .fail(function(e) {
                    console.error(e);
                });

            getAllSkillsItems();
        };

        var getAllSkillsItems = function() {
            var skills = document.getElementById("list");
            skills.innerHTML = "";

            var df = db.values('skills');

            df.done(function(items) {
                var n = items.length;
                for (var i = 0; i < n; i++) {
                    renderSkills(items[i]);
                }
            });

            df.fail(function(e) {
                console.error(e);
            });
        };

        var renderSkills = function(row) {
            var skills = document.getElementById("list");
            var li = document.createElement("li");
            var a = document.createElement("a");
            var t = document.createTextNode(row.text);

            a.addEventListener("click",
                function() {
                    deleteSkill(row.timeStamp);
                },
                false);

            a.textContent = " [Delete]";
            li.appendChild(t);
            li.appendChild(a);
            skills.appendChild(li);
        };

        function addSkills() {
            var skill = document.getElementById("skills");

            var data = {
                "text": skill.value,
                "timeStamp": new Date().getTime()
            };
            db.put('skills', data)
                .fail(function(e) {
                    console.error(e);
                });

            skill.value = "";

            getAllSkillsItems();
        };

        $(document)
            .ready(function() {
                function init() {
                    getAllSkillsItems();
                }

                db.onReady(function() {
                    init();
                });
            });
