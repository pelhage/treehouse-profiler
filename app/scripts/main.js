var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function () {

    if (xhr.readyState === 4) {
        var data = JSON.parse(xhr.responseText);

        // This is a list of colors to be associated with skills in Chart
        var colorsObj = {
            'Ruby' : '#E15258',
            'iOS' : '#53BBB4',
            'CSS' : '#3079AB',
            'JavaScript' : '#C25975',
            'Android' : '#5CB860',
            'WordPress' : '#838CC7',
            'Business' : '#F9845B',
            'PHP' : '#7D669E',
            'Design' : '#E59A13',
            'HTML' : '#39ADD1',
            'Python' : '#F092B0',
            'Development Tools' : '#637A91',
            'Java' : '#2C9676',
            'Digital Literacy' : '#D4D9DD'
        };

        // This is an array containing each skill's name, point total, and color
        var pointsList = [];

        // Go through my points and add any skills I have
        for (var key in data.points) {
            if (data.points[key] > 0) {
                pointsList.push([key, data.points[key], colorsObj[key]]);
                        // i.e. ['Javascript', 2430, '#C25975']
            }
        }

        // Sort array in order of highest to lowest
        pointsList.sort(function (a, b) {
            return b[1] - a[1];
        });

        // Sort the colors to be used in the Chart
        var chartColors = [];
        for (var i = 1, j = pointsList.length; i < j; i++) {
            chartColors.push(pointsList[i][2]);
        }
		
		var pointsHTML = '<ul>';
        // Generate the list items containing the skill points and values
        for (var i = 1, j = pointsList.length; i < j; i++) {
            var className = pointsList[i][0].replace(/\s+/g, '');
            pointsHTML += '<li><span class="skill__color--' + className + '"></span>' + '<h3 class="skill__points">' + pointsList[i][1].toLocaleString() + '</h3>' + '<p class="skill__name">' + pointsList[i][0] + '</p></li>';
        }

        var profileHTML = '<h1><a href="'+data.profile_url+'">' + data.name + '</a></h1><span> : '+ pointsList[0][1].toLocaleString() + ' Total Points, '+ data.badges.length + ' Achievements</span>';

        var badgeHTML = '<ul class="badges">';
        for (var i = 0, j = data.badges.length - 1; i < j; j--) {
            badgeHTML += '<li class="badge">';
            badgeHTML += '<p class="badge--name"><a href="'+data.badges[j].url + '">' + data.badges[j].name + '</a></p>';
            badgeHTML += '<p class="badge--course">' + data.badges[j].courses[0].title + '</p>';
            badgeHTML += '<img src="' + data.badges[j].icon_url + '">';
            badgeHTML += '</li>';
        }

        // Add closing list tags for skill list and achievements
        badgeHTML += '</ul>';
        pointsHTML += '</ul>';

        // Add HTML to DOM
        document.getElementById('achievements').innerHTML = badgeHTML;
        document.getElementById('skills__list').innerHTML = pointsHTML;
        document.getElementById('profile').innerHTML = '<img src="' + data.gravatar_url + '">' + profileHTML;


        // HIGH-CHARTS OPTIONS & CONSTRUCTER
        Highcharts.setOptions({
			lang: {
				thousandsSep: ','
			}
		});
        // Chart options
        var options = {
            chart: {
                renderTo: 'skills__chart',
                type: 'pie',
		        spacingTop: 0,
		        spacingRight: 0,
		        spacingBottom: 0,
		        spacingLeft: 0,
		        marginTop: 0
            },
            title: {
                text: ''
            },
          
            series: [{
                name: 'Points: ',
                innerSize: '50%',
                data: pointsList.slice(1)
            }],
            plotOptions: {
                pie: {
                    borderWidth: 0,
                    colors: chartColors,
                    dataLabels: {
                    	enabled: false
                    }
                }
            }
        };
        // Construct the chart with the given options
        var chart = new Highcharts.Chart(options);
    }

};
var name = prompt('Hello, what is your name?');

alert('Hi' + name + ', you are a FAT NERD');

xhr.open('GET', 'http://teamtreehouse.com/patrickelhage.json');
xhr.send();



