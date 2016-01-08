(function (window, document, $, undefined) {
5	
6	    var possibleCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
7	
8	    var defaults = {
9	
10	        selector: "#captcha",
11	        text: null,
12	        randomText: true,
13	        randomColours: true,
14	        width: 100,
15	        height: 50,
16	        colour1: null,
17	        colour2: null,
18	        font: 'bold 48px "Comic Sans MS", cursive, sans-serif',
19	        onSuccess: function () { alert('Correct!'); }
20	    };
21	
22	    var CAPTCHA = function (config) {
23	
24	        var that = this;
25	
26	        this._settings = $.extend({}, defaults, config || {});
27	
28	        this._container = $(this._settings.selector);
29	
30	        var canvasWrapper = $('<div>').appendTo(this._container);
31	
32	        this._canvas = $('<canvas>').appendTo(canvasWrapper).width(this._settings.width).height(this._settings.height);
33	
34	        var controlWrapper = $('<div>').appendTo(this._container);
35	
36	        this._input = $('<input>').addClass('user-text')
37	            .on('keypress', function (e) {
38	                if (e.which == 13) {
39	                    that.validate(that._input.val());
40	                }
41	            })
42	            .appendTo(controlWrapper);
43	         $('<br/>').appendTo(controlWrapper);
44	         $('<br/>').appendTo(controlWrapper);
45	        this._button =$('<button>').text('save')
46	            .addClass('validate').addClass('btn btn-primary pull-left')
47	            .on('click', function () { that.validate(that._input.val()); })
48	            .appendTo(controlWrapper);
49	
50	        this._context = this._canvas.get(0).getContext("2d");
51	
52	    };
53	
54	    CAPTCHA.prototype = {
55	
56	        generate: function () {
57	
58	            var context = this._context;
59	
60	            // if there's no text, set the flag to randomly generate some
61	            if (this._settings.text == null || this._settings.text == '') {
62	                this._settings.randomText = true;
63	            }
64	
65	            if (this._settings.randomText) {
66	                this._generateRandomText();
67	            }
68	
69	            if (this._settings.randomColours) {
70	                this._settings.colour1 = this._generateRandomColour();
71	                this._settings.colour2 = this._generateRandomColour();
72	            }
73	
74	            var gradient1 = context.createLinearGradient(0, 0, this._settings.width, 0);
75	            gradient1.addColorStop(0, this._settings.colour1);
76	            gradient1.addColorStop(1, this._settings.colour2);
77	
78	            context.fillStyle = gradient1;
79	            context.fillRect(0, 0, this._settings.width, this._settings.height);
80	
81	            var gradient2 = context.createLinearGradient(0, 0, this._settings.width, 0);
82	            gradient2.addColorStop(0, this._settings.colour2);
83	            gradient2.addColorStop(1, this._settings.colour1);
84	
85	            context.font = this._settings.font;
86	            context.fillStyle = gradient2;
87	
88	            context.setTransform((Math.random() / 10) + 0.9,    // scalex
89	                0.1 - (Math.random() / 5),      // skewx
90	                0.1 - (Math.random() / 5),      // skewy
91	                (Math.random() / 10) + 0.9,     // scaley
92	                (Math.random() * 20) + 10,      // transx
93	                100);                           // transy
94	
95	            context.fillText(this._settings.text, 0, 0);
96	
97	            context.setTransform(1, 0, 0, 1, 0, 0);
98	
99	            var numRandomCurves = Math.floor((Math.random() * 6) + 5);
100	
101	            for (var i = 0; i < numRandomCurves; i++) {
102	                this._drawRandomCurve();
103	            }
104	        },
105	
106	        validate: function (userText) {
107	            if (userText === this._settings.text) {
108	                this._settings.onSuccess();
109	            } else {
110	                this.generate();
111	            }
112	        },
113	
114	        _drawRandomCurve: function () {
115	
116	            var ctx = this._context;
117	
118	            var gradient1 = ctx.createLinearGradient(0, 0, this._settings.width, 0);
119	            gradient1.addColorStop(0, Math.random() < 0.5 ? this._settings.colour1 : this._settings.colour2);
120	            gradient1.addColorStop(1, Math.random() < 0.5 ? this._settings.colour1 : this._settings.colour2);
121	
122	            ctx.lineWidth = Math.floor((Math.random() * 4) + 2);
123	            ctx.strokeStyle = gradient1;
124	            ctx.beginPath();
125	            ctx.moveTo(Math.floor((Math.random() * this._settings.width)), Math.floor((Math.random() * this._settings.height)));
126	            ctx.bezierCurveTo(Math.floor((Math.random() * this._settings.width)), Math.floor((Math.random() * this._settings.height)),
127	                Math.floor((Math.random() * this._settings.width)), Math.floor((Math.random() * this._settings.height)),
128	                Math.floor((Math.random() * this._settings.width)), Math.floor((Math.random() * this._settings.height)));
129	            ctx.stroke();
130	        },
131	
132	        _generateRandomText: function () {
133	            this._settings.text = '';
134	            var length = Math.floor((Math.random() * 3) + 3);
135	            for (var i = 0; i < length; i++) {
136	                this._settings.text += possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
137	            }
138	        },
139	
140	        _generateRandomColour: function () {
141	            return "rgb(" + Math.floor((Math.random() * 100)) + ", " + Math.floor((Math.random() * 100)) + ", " + Math.floor((Math.random() * 100)) + ")";
142	        }
143	    };
144	
145	    window.CAPTCHA = CAPTCHA || {};
146	
147	}(window, document, jQuery));