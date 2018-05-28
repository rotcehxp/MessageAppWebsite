angular.module('MessageApp').controller('MyGroupsController', ['$http', '$log', '$scope', '$location',
    function($http, $log, $scope, $location) {

        var thisCtrl = this;

        this.groupList = [];
        this.counter = 2;
        this.newText = "";

        this.username = localStorage.getItem("currentLoggedUserUsername");


        this.groups = function(){
            // Get the list of groups from the servers via REST API
            //var loggedUser = angular.module('MessageApp').loggedUser;
            var loggedUser = localStorage.getItem("currentLoggedUser");

            // First set up the url for the route/

            var url = "http://localhost:5000/MessageApp/users/"+loggedUser+"/mygroups";

            // Now set up the $http object
            // It has two function call backs, one for success and one for error
            $http.get(url).then(// success call back
                function (response){
                // The is the sucess function!
                // Copy the list of parts in the data variable
                // into the list of parts in the controller.

                    console.log("response: " + JSON.stringify(response.data.My_Groups));

                    console.log(response.data.My_Groups);

                    thisCtrl.groupList = response.data.My_Groups;

                    console.log(thisCtrl.groupList);



            }, // error callback
            function (response){
                // This is the error function
                // If we get here, some error occurred.
                // Verify which was the cause and show an alert.
                var status = response.status;
                if (status == 0){
                    alert("No hay conexion a Internet");
                }
                else if (status == 401){
                    alert("Su sesion expiro. Conectese de nuevo.");
                }
                else if (status == 403){
                    alert("No esta autorizado a usar el sistema.");
                }
                else if (status == 404){
                    alert("No se encontro la informacion solicitada.");
                }
                else {
                    alert("Error interno del sistema.");
                }
            });

        };

        this.loadMessages = function(gid){
            $location.url('/groups/'+gid+'/messages');
        };

        this.showAddMemberBox = function(gid){
            document.getElementById("enterusernamebox").style.display = "block";
            localStorage.setItem("currentSelectedGroup", gid);
        };

        this.hideAddMemberBox = function(gid){
            document.getElementById("enterusernamebox").style.display = "none";
        };

        this.addMember = function(){

            var loggedUser = localStorage.getItem("currentLoggedUser");
            var gid = parseInt(localStorage.getItem("currentSelectedGroup"));
            var username = document.getElementById("textarea1").value;

            // Build the data object
            var data = {};
            data.username = username;
            data.gid = gid;

            data = JSON.stringify(data);
            console.log(data);

            //$log.error("Message Loaded: ", JSON.stringify(thisCtrl.loginform));

            console.log(loggedUser);

            // Now create the url with the route to talk with the rest API
            var reqURL = "http://localhost:5000/MessageApp/users/"+loggedUser+"/mygroups/admin";
            console.log("reqURL: " + reqURL);

            // configuration headers for HTTP request
            var config = {
                headers : {
                  'Content-Type': 'application/json;charset=utf-8;'
                  //'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }

            // Now issue the http request to the rest API
            $http.post(reqURL, data, config).then(
                // Success function
                function (response) {
                    console.log("data: " + JSON.stringify(response.data));
                    // tira un mensaje en un alert
                    alert("Has añadido al usuario exitosamente.");

                }, //Error function
                function (response) {
                    // This is the error function
                    // If we get here, some error occurred.
                    // Verify which was the cause and show an alert.
                    var status = response.status;
                    console.log("Error: " + reqURL);
                    //alert("Cristo");
                    if (status == 0) {
                        alert("No hay conexion a Internet");
                    }else if (status == 400) {
                        alert("No tienes permisos suficientes.");
                    }
                    else if (status == 401) {
                        alert("Su sesion expiro. Conectese de nuevo.");
                    }
                    else if (status == 403) {
                        alert("No esta autorizado a usar el sistema.");
                    }
                    else if (status == 404) {
                        alert("No se encontro la informacion solicitada.");
                    }
                    else {
                        alert("Error interno del sistema.");
                    }
                }
            );
        };

        /*
        this.groupsMessages = function (gid) {
            $location.url('/groups/' + gid + '/messages');
        }*/

        this.groups();

}]);