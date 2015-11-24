module.exports = {
	port : 4000,
	development : false,
	api: {
		basePath: 'http://ec2-52-8-130-205.us-west-1.compute.amazonaws.com:4000/api'
	},
	twitter: {
		consumerKey: "v5WEMV5usVXTTRIc2EwofbHp4",
		consumerSecret: "vHdQmCQHJLUXw28yaXL710EXxiM2KpaW19qpUIRcpXz5L5ccAa",
		basePath: "https://api.twitter.com"
	},
	assets : {
		js      : "/statics/js",
		css     : "/statics/css",
		images  : "/statics/images"
	}
};