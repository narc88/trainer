Template.CalendarTemplate.helpers({
        calendarOptions: {
            // Standard fullcalendar options
            hiddenDays: [ 0 ],
            slotDuration: '00:30:00',
            minTime: '07:00:00',
            maxTime: '23:00:00',
            allDaySlot: false,
            lang: 'es',
            header:{
                left:   'agendaWeek, agendaDay',
                center: 'title',
                right:  'today prev,next'
            },
            defaultView:'agendaDay',
            // Function providing events reactive computation for fullcalendar plugin
            events: function(start, end, timezone, callback) {
                //console.log(start);
                //console.log(end);
                //console.log(timezone);
                var events1 =[], events = [];
                events1.push({
                    'id': 2151251,
                    'title': '<UserCard/>',
                    'startParam' : '2016-04-07T12:30:00.000Z',
                    'endParam' : '2016-04-07T13:30:00.000Z',
                    'editable' : true,
                    'backgroundColor': 'blue'
                },
                {
                    'id': 2151651,
                    'title': '<h3><b>Este es el titulo</b></h3>',
                    'startParam' : '2016-04-07T11:30:00.000Z',
                    'endParam' : '2016-04-07T12:30:00.000Z',
                    'editable' : true,
                    'backgroundColor': 'red'
                },
                {
                    'id': 2157251,
                    'title': '<h3><b>Este es el titulo</b></h3>',
                    'startParam' : '2016-04-07T12:30:00.000Z',
                    'endParam' : '2016-04-07T13:30:00.000Z',
                    'editable' : true,
                    'backgroundColor': 'green'
                });
                // Get only events from one document of the Calendars collection
                // events is a field of the Calendars collection document
                
                /*var calendar = Calendars.findOne(
                    { "_id":"myCalendarId" },
                    { "fields": { 'events': 1 } }
                );*/
                events1.forEach(function (event) {
                    eventDetails = {};
                    for(key in event)
                        eventDetails[key] = event[key];
                    events.push(eventDetails);
                });
                callback(events);
                
            },
            dayClick:function(date, jsEvent, view){
                alert(JSON.stringify(date));
            },
            eventAfterRender: function (event, element) {
                
                if(event){
                    element.find('.fc-title').attr('id', event.id).html('');
                    let html_element = document.getElementById(event.id);
                    Blaze.render(Template.UserCardTemplate, html_element)
                }
                
                
                //element.find('.fc-title').html(element.find('.fc-title').text());
            },
            // Optional: id of the calendar
            id: "calendar1",
            // Optional: Additional classes to apply to the calendar
            addedClasses: "col-md-12",
            // Optional: Additional functions to apply after each reactive events computation
            autoruns: [
                function () {
                    console.log("user defined autorun function executed!");
                }
            ]
        },
    });