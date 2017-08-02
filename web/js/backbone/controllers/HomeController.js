app.controller('homeController', function ($scope, $http, $rootScope) {
    $rootScope.page.title = "Dashboard";
    $rootScope.page.menu={
        items:[
            {label:"Inicio",link:"",icon:"fa fa-home"},
            {label:"Eventos",link:"event",icon:"fa fa-calendar"},
            {label:"Compañias",link:"company",icon:"fa fa-building"},
        ]
    };
    $("#loader-root").animate({"opacity": 0}, 500, function () {
        $("#loader-root").css({"display": "none"});
    });
    $rootScope.selected.detailRealy = true;
    $rootScope.view.loadReady = true;

    $rootScope.loadingHidden();

    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
});
