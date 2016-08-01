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
                    'title': 'Lisandro Riera',
                    'start' : '2016-08-01T12:30:00.000Z',
                    'end' : '2016-08-01T13:30:00.000Z',
                    'editable' : true,
                    'backgroundColor': 'blue'
                },
                {
                    'id': 2151651,
                    'title': 'Nicolas Ronchi',
                    'start' : '2016-08-01T11:30:00.000Z',
                    'end' : '2016-08-01T12:30:00.000Z',
                    'editable' : true,
                    'backgroundColor': 'red'
                },
                {
                    'id': 2157251,
                    'title': 'a',
                    'start' : '2016-08-01T12:30:00.000Z',
                    'end' : '2016-08-01T13:30:00.000Z',
                    'editable' : true,
                    'backgroundColor': 'green'
                },
                {
                    'id': 2151251,
                    'title': 'Lisandro Riera',
                    'start' : '2016-08-01T12:30:00.000Z',
                    'end' : '2016-08-01T13:30:00.000Z',
                    'editable' : true,
                    'backgroundColor': 'blue'
                },
                {
                    'id': 2151651,
                    'title': 'Nicolas Ronchi',
                    'start' : '2016-08-01T11:30:00.000Z',
                    'end' : '2016-08-01T12:30:00.000Z',
                    'editable' : true,
                    'backgroundColor': 'red'
                },
                {
                    'id': 2157251,
                    'title': 'AG',
                    'start' : '2016-08-01T12:30:00.000Z',
                    'end' : '2016-08-01T13:30:00.000Z',
                    'editable' : true,
                    'backgroundColor': 'green'
                });

                var events2 = [
                    {
                        title: 'All Day Event',
                        start: '2016-06-01'
                    },
                    {
                        title: 'Long Event',
                        start: '2016-06-07',
                        end: '2016-06-10'
                    },
                    {
                        id: 999,
                        title: 'Repeating Event',
                        start: '2016-06-09T16:00:00'
                    },
                    {
                        id: 999,
                        title: 'Repeating Event',
                        start: '2016-06-16T16:00:00'
                    },
                    {
                        title: 'Conference',
                        start: '2016-06-11',
                        end: '2016-06-13'
                    },
                    {
                        title: 'Meeting',
                        start: '2016-06-12T10:30:00',
                        end: '2016-06-12T12:30:00'
                    },
                    {
                        title: 'Lunch',
                        start: '2016-06-12T12:00:00'
                    },
                    {
                        title: 'Meeting',
                        start: '2016-06-12T14:30:00'
                    },
                    {
                        title: 'Happy Hour',
                        start: '2016-06-12T17:30:00'
                    },
                    {
                        title: 'Dinner',
                        start: '2016-06-12T20:00:00'
                    },
                    {
                        title: 'Birthday Party',
                        start: '2016-06-13T07:00:00'
                    },
                    {
                        title: 'Click for Google',
                        url: 'http://google.com/',
                        start: '2016-06-28'
                    }
                ];
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
                console.log(events.length)
            },
            eventClick: function(event, element) {
                
                $('.tooltip').hide();
                $(this).tooltip({trigger: 'manual', title: Blaze.toHTMLWithData(Template.UserCardTemplate, event) , html: true, container: "body"});
                $(this).tooltip().tooltip('show');
            },
            eventAfterRender: function (event, element) {   
                if(event){
                    Blaze.toHTMLWithData(Template.UserCardTemplate, event);
                }
            },
            dayClick:function(date, jsEvent, view){
                alert(JSON.stringify(date));
                
            },
            // Optional: id of the calendar
            id: "calendar1",
            // Optional: Additional classes to apply to the calendar
            addedClasses: "col-md-12",
            // Optional: Additional functions to apply after each reactive events computation
            autoruns: [
                function () {
                   
                }
            ]
        },
    });