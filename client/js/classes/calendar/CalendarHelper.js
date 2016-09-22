Template.CalendarTemplate.helpers({
        calendarOptions: {
            // Standard fullcalendar options
            hiddenDays: [ 0 ],
            height:(document.documentElement.clientHeight/2)+'px',
            slotDuration: '00:30:00',
            minTime: '07:00:00',
            maxTime: '23:00:00',
            allDaySlot: false,
            lang: 'es',
            header:{
                left:   'prev',
                center: 'agendaWeek, today, agendaDay',
                right:  'next'
            },
            defaultView:'agendaDay',
            // Function providing events reactive computation for fullcalendar plugin
            events: function (start, end, timezone, callback) {

                function getAcronym(str){
                    var matches = str.match(/\b(\w)/g);             
                    return matches.join('');    
                }

                function getDayOfWeek(d, dayOfWeek) {
                    d = new Date(d);
                    var day = d.getDay(),
                    diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
                    diff = diff + dayOfWeek -1;
                    return new Date(d.setDate(diff));
                }
                var dayStart = start._d.getDay();
                var dayEnd = end._d.getDay();
                var d = new Date();
                
                console.log('Day Start'+dayStart);
                console.log('Day End'+dayEnd);

                //Not called when switching between days, advised to request the whole week.
                var turns = Turns.find({'frequency' : 'weekly'}).fetch();

                var events = [];
                
                turns.forEach(function (turn) {
                    turn.start = getDayOfWeek(d, turn.day);
                    turn.start.setHours(turn.hour);
                    turn.start.setMinutes(turn.minute);
                    turn.title = getAcronym(turn.username  || 'JOHN DOE');
                    eventDetails = {};
                    for(key in turn)
                        eventDetails[key] = turn[key];
                    events.push(eventDetails);
                });
                console.log(events.length)
                callback(events);
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

